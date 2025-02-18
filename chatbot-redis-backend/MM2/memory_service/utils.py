#helping functions related to read, write and publish model metrics
#utils
import os
import json

from dotenv import load_dotenv # type: ignore
load_dotenv()
from openai import AsyncOpenAI # type: ignore

import time

from datetime import datetime, timedelta, timezone
from pinecone.grpc import PineconeGRPC as Pinecone # type: ignore
from pinecone import ServerlessSpec # type: ignore

from memory_service.prompt import ORIGIN_IDENTIFICATION_SYSTEM_PROMPT,REMINDER_BLEND_RESPONSE_SYSTEM_PROMPT,REMINDER_SYSTEM_PROMPT

# Initialize a Pinecone client with your API key
pc = Pinecone(api_key=os.getenv("PINECONE_API"))

# Create a serverless index
index_name = "noviai-mm-service-isb"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=1024,
        metric="cosine",
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )

# Wait for the index to be ready
while not pc.describe_index(index_name).status['ready']:
    time.sleep(1)

index = pc.Index(index_name) #Index name will be constant

def connect_pinecone():
    return pc,index

# last 20 messages 
def restrict_to_last_20_messages(messages):
    return messages[-20:]

async def call_openai_api(messages,model="gpt-4o"):
    print(f"Calling to OpenAI API with model: {model}")
    client = AsyncOpenAI(
        api_key= os.getenv("OPENAI_API_KEY"),
    )

    # Chat completion API call
    if model == "gpt-4o":
        chat_completion_res = await client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.1
        )

    else:
        chat_completion_res = await client.chat.completions.create(
            model=model,
            messages=messages,
    )

    # Return the response
    return chat_completion_res.choices[0].message.content

async def call_novita_ai_api(messages,model = "meta-llama/llama-3.3-70b-instruct"):
    client = AsyncOpenAI(
        # base_url="https://api.novita.ai/v3/openai",
        # Get the Novita AI API Key by referring to: https://novita.ai/docs/get-started/quickstart.html#_2-manage-api-key.
        base_url="https://api.novita.ai/v3/openai",
        api_key= os.getenv("NOVITA_API_KEY"),
    )

    # Chat completion API call
    chat_completion_res = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.1
    )

    # Return the response
    return chat_completion_res.choices[0].message.content

def extract_json_from_text(text):
    try:
        start = text.find('{')
        end = text.rfind('}') + 1
        if start != -1 and end != 0:
            return text[start:end]
        return text
    except:
        return text

def format_client_conversation(conversation):
    formatted_text = ""
    
    for message in conversation:
        role = message['role']
        content = message['content']
        
        # Capitalize first letter of role
        formatted_role = role.capitalize()
        formatted_text += f"{formatted_role}: {content}\n\n"
    
    return formatted_text.strip()


# Common Function for Server
# call_openai_api(request.bot_prompt,request.message,request.previous_conversation,memory)
async def bot_response(bot_prompt,user_message,rephrased_user_message,previous_conversation,memory,request_time):

    if previous_conversation and previous_conversation[-1].get('feedback', ""):
        bot_prompt = f"""
        {bot_prompt}

        ## Current time:
        {request_time}

        ## Related memory:
        {memory}

        ## Important notes for memory reference:
        - Only reference information from the Related Memory if it is relevant to the user's query. 
        - If the information is not relevant, do not reference it.
        - Make use of the current time to provide in Related memory and Current time to respond to the user query

        ## User Feedback on the last message:
        - User has given feedback on the last message. Try to incorporate it into the conversation.
        - The user {previous_conversation[-1]['feedback']} your response: "{previous_conversation[-1]['content']}".
        
        ## Additional information:
        - You have the ability to remember things that the user asks or to do something. Provide a positive response and be proactive. Ask more details about something if needed.
        """
    else:
        bot_prompt = f"""
        {bot_prompt}

        ## Current time:
        {request_time}

        ## Related memory:
        {memory}

        ## Important notes for memory reference:
        - Only reference information from the Related Memory if it is relevant to the user's query. 
        - If the information is not relevant, do not reference it.
        - Make use of the current time to provide in Related memory and Current time to respond to the user query
        
        ## Additional information:
        - You have the ability to remember things that the user asks or to do something. Provide a positive response and be proactive. Ask more details about something if needed.
        """

    messages = [
        {
            "role": "system", 
            "content": bot_prompt
        }
    ]
    messages.extend(previous_conversation)

    messages.append(
        {
            "role": "user",
            "content": user_message
        }
    )

    response = await call_openai_api(messages)

    return response

async def reminder_response_to_user(message, previous_conversation,request_time,remind_time):
    messages = [
        {
            "role" : "system",
            "content" : REMINDER_BLEND_RESPONSE_SYSTEM_PROMPT
        }
    ]

    messages.extend(previous_conversation)

    messages.append({
        "role": "user",
        "content": f""" 
        Reminder: {message} 
        Current Time: {request_time}
        Reminder Time: {remind_time}

        ## Using both the reminder details and the conversation history, craft a response that effectively blends the two. Be sure to check the current time against the reminder time:
        - If they align, proceed as if consent has been given.
        - If there's a discrepancy or if the user appears to have forgotten, address that accordingly in your response.
        """
    })
    # return await call_openai_api(message,model="o3-mini")
    return await call_openai_api(messages,model="gpt-4o-mini")

async def check_for_origin_question(user_message,previous_conversation):
   prompt = ORIGIN_IDENTIFICATION_SYSTEM_PROMPT

   messages = [
        {
            "role": "system", 
            "content": prompt
        }
    ]
   
   messages.extend(previous_conversation[-5:])
   
   messages.append(
        {
            "role": "user",
            "content": user_message
        }
    )

#    res = await call_novita_ai_api(messages,model="mistralai/mistral-nemo")
#    res = await call_novita_ai_api(messages,model="meta-llama/llama-3.3-70b-instruct")
   res = await call_openai_api(messages,model="o3-mini")

   if res.strip() == "Yes":
       return "Yes"
   
   return "No"

async def reminder_response(user_message,previous_conversation,request_time):
    messages = [
        {
            "role": "system",
            "content": REMINDER_SYSTEM_PROMPT
        }
    ]

    messages.extend(previous_conversation)

    messages.append({
        "role": "user",
        "content": f"""    
        User Message: {user_message} 
        Current Time: {request_time}
        """
    })

    # Call the OpenAI API to identify the reminder time and generate the response 
    res = await call_openai_api(messages,model="o3-mini")

    # Extract the JSON from the response - It will accept the text in between { and } and drop the rest
    json_str = extract_json_from_text(res)

    # Parse the JSON string
    extracted = json.loads(json_str)

    return extracted




