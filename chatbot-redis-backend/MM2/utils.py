#helping functions related to read, write and publish model metrics
#utils
import requests # type: ignore
import os

from dotenv import load_dotenv # type: ignore
load_dotenv()
from openai import AsyncOpenAI # type: ignore

import re
import time
import json

from datetime import datetime, timedelta, timezone
from create_infra import table_create, select_model
from pinecone.grpc import PineconeGRPC as Pinecone # type: ignore
from pinecone import ServerlessSpec # type: ignore

# from supabase import create_client, Client #type: ignore
from supabase import Client, create_client #type: ignore

from prompt import ORIGIN_IDENTIFICATION_SYSTEM_PROMPT,REMINDER_BLEND_RESPONSE_SYSTEM_PROMPT

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

# Supabase connection details
SUPABASE_URL = os.getenv("SUPABASE_URL")  # Supabase project URL from environment variable
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # Supabase API key from environment variable

# Create a Supabase client using project URL and API key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def log_to_supabase(message,email,bot_id,bot_response,relative_data,extracted_data):
    data = {
        "message" : message,
        "email" : email,
        "bot_id" : bot_id,
        "bot_response" : bot_response,
        "vector_retrieved_data" : relative_data,
        "extracted_data" : extracted_data,   
    }
    username= "ISB-Dlabs"
    table_name=table_create("new_message_logs", username)
    response = supabase.table(table_name).insert(data).execute()

    return response

async def log_retrieve_memory_data(previous_conversations,extracted_data,email,bot_id):
    data = {
        "previous_conversations" : previous_conversations,
        "extracted_data" : extracted_data,
        "email" : email,
        "bot_id" : bot_id,
    }
    username= "ISB-Dlabs"
    table_name=table_create("retrieve_memory_data", username)
    response = supabase.table(table_name).insert(data).execute()

    return response

def log_messages_with_like_dislike(user_email,bot_id,user_message,bot_response,feedback,last_5_messages,memory_extracted):
    data = {
        "user_email": user_email,
        "bot_id": bot_id,
        "user_message": user_message,
        "bot_response": bot_response,
        "feedback": feedback,
        "last_5_messages": last_5_messages,
        "memory_retrieved": memory_extracted,
        "memory_extracted": ""
    }

    username= "ISB-Dlabs"
    table_name=table_create("log_messages_with_like_dislike", username)
    res = supabase.table(table_name).insert(data).execute()
    return res

def log_notes_memory(notes,extracted_data,email,bot_id):
    data = {
        "notes": notes,
        "extracted_data": extracted_data,
        "email": email,
        "bot_id": bot_id
    }

    username= "ISB-Dlabs"
    table_name=table_create("notes", username)
    res = supabase.table(table_name).insert(data).execute()

    return res

def like_dislike(message_id,like_or_dislike):
    username= "ISB-Dlabs"
    table_name=table_create("log_messages_with_like_dislike", username)
    return supabase.table(table_name).update({"feedback" : like_or_dislike}).eq("id", message_id).execute()

# last 20 messages 
def restrict_to_last_20_messages(messages):
    return messages[-20:]

# model name to be parameterized for mm as service

model="gpt-4o"
model_name= select_model(model)
async def call_openai_api(messages,model=model_name):
    print(f"Calling to OpenAI API with model: {model}")
    client = AsyncOpenAI(
        api_key= os.getenv("OPENAI_API_KEY"),
    )

    # Selecting the default model
    # model = "meta-llama/llama-3.1-70b-instruct"

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


def connect_pinecone():
    return pc,index

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


def format_client_conversation(conversation):
    formatted_text = ""
    
    for message in conversation:
        role = message['role']
        content = message['content']
        
        # Capitalize first letter of role
        formatted_role = role.capitalize()
        formatted_text += f"{formatted_role}: {content}\n\n"
    
    return formatted_text.strip()

def convert_to_clean_number(request_time):
    # First convert to datetime
    time_data = datetime.strptime(request_time.split(" (")[0], "%a %b %d %Y %H:%M:%S GMT%z")
    
    # Convert to string and remove timezone part
    time_str = str(time_data).split("+")[0]
    
    # Remove all spaces, hyphens, and colons
    clean_number = time_str.replace(" ", "").replace("-", "").replace(":", "")
    
    return clean_number

def get_before_after_dates(date_number, days_before=1, days_after=1):
    # Convert the number string back to datetime
    # Format: YYYYMMDDHHMMSS
    date_str = f"{date_number[:4]}-{date_number[4:6]}-{date_number[6:8]} {date_number[8:10]}:{date_number[10:12]}:{date_number[12:]}"
    current_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    
    # Calculate before and after dates
    before_date = current_date - timedelta(days=days_before)
    after_date = current_date + timedelta(days=days_after)
    
    # Convert back to clean number format
    before_number = before_date.strftime("%Y%m%d%H%M%S")
    after_number = after_date.strftime("%Y%m%d%H%M%S")
    
    return before_number, after_number

## Example usage:
# date_number = "20250121013137"
# before, after = get_before_after_dates(date_number)
# print(f"Day before: {before}")  # Output: 20250120013137
# print(f"Day after: {after}")    # Output: 20250122013137

# # You can also specify different number of days:
# before, after = get_before_after_dates(date_number, days_before=2, days_after=3)
# print(f"Two days before: {before}")  # Output: 20250119013137
# print(f"Three days after: {after}")  # Output: 20250124013137

def extract_json_from_text(text):
    try:
        start = text.find('{')
        end = text.rfind('}') + 1
        if start != -1 and end != 0:
            return text[start:end]
        return text
    except:
        return text
    
#________________________________________________________________________________________________________________________________________________________________________________

# Function to check if an entry exists in the last_cat_message table
async def check_entry_exists(email, bot_id):
    # Query the last_cat_message table
    response = supabase.table("last_cat_message").select("message_id").eq("email", email).eq("bot_id", bot_id).execute()
    # Check if the response is empty
    if response.data == []:
        created = supabase.table("last_cat_message").insert({"email" : email,"bot_id" : bot_id,"message_id" : ""}).execute()
        return "Created"
    # Return the response
    return response


# Function to get messages from the messages table
async def get_messages(email, bot_id, message_id):
    # Query the messages table
    query = supabase.table("messages").select("*").eq("email", email).eq("bot_id", bot_id)
    
    # Only add the gt filter if message_id is not empty
    if message_id:
        query = query.gt("id", message_id)
        
    # Limit the number of messages to 20
    response = query.limit(20).order("created_at").execute()
    return response

import post_processing

# Function to extract memory from the messages
async def extractor(email, bot_id, message_id):
    try:
        # Get the messages for the given email, bot_id, and message_id
        messages = await get_messages(email, bot_id, message_id)

        # Check if the messages are empty
        if messages.data == []:
            return
            
        # Get the number of messages
        msg_count = len(messages.data)
        print("message Length:", msg_count)
        
        # Process if more than 5 messages
        if msg_count >= 5:
            # Extract memory from the messages
            await post_processing.extract_memory(messages.data, email, bot_id)

            # Update the last message id in the last_cat_message table
            # !Sensitive table - If it fails then all the data extraction will start from the beginning
            supabase.table("last_cat_message").update({"message_id": messages.data[-1]['id']}).eq("email", email).eq("bot_id", bot_id).execute()
            print("Data Extraction after 5 messages")
            
        # Only check time-based condition for 1-4 messages
        elif msg_count > 0:
            try:
                # Get the last message time
                last_message_time = datetime.fromisoformat(messages.data[0]['created_at'])
                # Calculate the time difference between now and the last message time
                time_diff = datetime.now(timezone.utc) - last_message_time
                
                # If the time difference is greater than 5 minutes, extract memory
                if time_diff > timedelta(minutes=5):
                    print("Data Extraction after 5 minutes")

                    # Extract memory from the messages
                    await post_processing.extract_memory(messages.data, email, bot_id)

                    # Update the last message id in the last_cat_message table
                    # !Sensitive table - If it fails then all the data extraction will start from the beginning
                    supabase.table("last_cat_message").update({"message_id": messages.data[-1]['id']}).eq("email", email).eq("bot_id", bot_id).execute()

            except (IndexError, AttributeError) as e:
                print(f"Error processing messages: {e}")
                
    except Exception as e:
        print(f"Error in extract_memory: {e}")

import asyncio
async def checker():
    # last_cat_message table is used to store the last message id for each email and bot_id combination
    response = supabase.table("last_cat_message").select("*").execute() 
    # Check if the table is empty
    if response.data == []:
        print("No data found in last_cat_message table")
        return
    # Process the data
    else:
        print(f"Found {len(response.data)} records to process")
        # Iterate over the data
        for data in response.data:
            try:
                # Call the extractor function
                await extractor(data['email'], data['bot_id'], data['message_id'])
            except Exception as e:
                print(f"Error in extractor: {e}")

# Function to insert a new entry into the messages table
async def insert_entry(email, user_message, bot_response, bot_id):
    response = supabase.table("messages").insert({
        "email": email,
        "user_message": user_message,
        "bot_response": bot_response,
        "bot_id": bot_id
    }).execute()
    await check_entry_exists(email, bot_id)
    return response
