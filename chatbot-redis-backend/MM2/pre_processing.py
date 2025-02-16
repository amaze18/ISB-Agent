# Categorize the user message and rephrase it 
# Dynamic category retrieval
import json

from fastapi import FastAPI,File,UploadFile,Form,BackgroundTasks # type: ignore
from utils import call_novita_ai_api,format_client_conversation,extract_json_from_text,call_openai_api

from prompt import CATEGORY_IDENTIFIER_SYSTEM_PROMPT,REMINDER_SYSTEM_PROMPT

import datetime

from utils import connect_pinecone
pc,index = connect_pinecone()

async def retrieve_memory(query,email,bot_id,previous_conversation):
    
    if query == "":
        return "",""
    
    messages = [
        {
            "role": "system",
            "content": CATEGORY_IDENTIFIER_SYSTEM_PROMPT
        }
    ]

    previous_conversation = format_client_conversation(previous_conversation)

    messages.append({
        "role": "user",
        "content": f"""    
        Previous Conversations: [{previous_conversation}]  
        User Message: {query}  
        """
    })

    # res = call_novita_ai_api(messages,model="deepseek/deepseek_v3")
    res = await call_openai_api(messages)

    json_str = extract_json_from_text(res)
    extracted = json.loads(json_str)

    rephrased = str(extracted['rephrased_user_message'])
    category = str(extracted['category'])
    memory_required = extracted['memory_required']


    # if memory_required == False:
    #     return "",rephrased,category

    # Convert the query into a numerical vector that Pinecone can search with
    query_embedding = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=[rephrased], 
        parameters={
            "input_type": "query"
        }
    )

    results = index.query(
        namespace=f"{email}-{bot_id}-conversation",
        vector=query_embedding[0].values,
        top_k=5,
        # filter = {
        #     "categories": {"$eq": category}, 
        # },
        include_values=False,
        include_metadata=True
    )

    # Sort matches by created_at timestamp (newest first)
    sorted_matches = sorted(
        results['matches'],
        key=lambda x: datetime.datetime.strptime(
            # Insert formatting characters into the clean number string
            f"{x['metadata']['created_at'][:4]}-{x['metadata']['created_at'][4:6]}-{x['metadata']['created_at'][6:8]} "
            f"{x['metadata']['created_at'][8:10]}:{x['metadata']['created_at'][10:12]}:{x['metadata']['created_at'][12:]}",
            "%Y-%m-%d %H:%M:%S"
        ),
        reverse=True  # newest first
    )

    # Update results with sorted matches
    results['matches'] = sorted_matches
    # print(sorted_matches)

    # Convert created_at timestamp to datetime object
    for match in sorted_matches:
        match['metadata']['created_at'] = datetime.datetime.strptime(
            # Insert formatting characters into the clean number string
            f"{match['metadata']['created_at'][:4]}-{match['metadata']['created_at'][4:6]}-{match['metadata']['created_at'][6:8]} "
            f"{match['metadata']['created_at'][8:10]}:{match['metadata']['created_at'][10:12]}:{match['metadata']['created_at'][12:]}",
            "%Y-%m-%d %H:%M:%S"
        )

    matches_string = ""
    for e in sorted_matches:
        matches_string += f"""{e["metadata"]["text"]}\nCreated at: {e["metadata"]["created_at"]}\n--------------------\n"""
        
    print(matches_string)
    return matches_string,rephrased,category


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

    res = await call_openai_api(messages,model="o3-mini")

    json_str = extract_json_from_text(res)
    extracted = json.loads(json_str)

    return extracted

async def get_stats():
    return( await index.describe_index_stats())
