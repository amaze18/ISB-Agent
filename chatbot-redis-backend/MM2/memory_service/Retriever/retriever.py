# All Function Imports 
import json
import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv # type: ignore
load_dotenv()

from memory_service.utils import connect_pinecone,extract_json_from_text,call_openai_api,format_client_conversation
from memory_service.prompt import CATEGORY_IDENTIFIER_SYSTEM_PROMPT

import datetime

pc,index = connect_pinecone()

# Retrieve Memory
async def retrieve_memory(query,email,bot_id,previous_conversation):
    if query == "":
        return "","",""
    
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

    # Rephrased the user query and categorized it
    res = await call_openai_api(messages)

    # Extract the JSON from the response - It will accept the text in between { and } and drop the rest
    json_str = extract_json_from_text(res)

    # Parse the JSON string
    extracted = json.loads(json_str)

    # Get the relevant information from the JSON
    rephrased = str(extracted['rephrased_user_message'])

    # Get the category from the extracted data
    category = str(extracted['category'])

    # Convert the query into a numerical vector that Pinecone can search
    query_embedding = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=[rephrased], 
        parameters={
            "input_type": "query"
        }
    )

    # Query the index with the query_embedding
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

    # Format the matches_string 
    matches_string = ""
    for e in sorted_matches:
        matches_string += f"""{e["metadata"]["text"]}\nCreated at: {e["metadata"]["created_at"]}\n--------------------\n"""
        
    # print(matches_string)
    return matches_string,rephrased,category
