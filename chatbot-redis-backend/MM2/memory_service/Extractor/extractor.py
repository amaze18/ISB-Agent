
from datetime import datetime, timedelta, timezone
import json
import uuid

from memory_service.db_fun import get_messages,set_last_cat_message,get_all_last_cat_messages,log_retrieve_memory_data
from memory_service.utils import format_client_conversation,call_openai_api,extract_json_from_text,connect_pinecone

from memory_service.Extractor.support_fun import convert_to_clean_number

from memory_service.prompt import MEMORY_EXTRACTOR_SYSTEM_PROMPT

pc,index = connect_pinecone()

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
            await extract_memory(messages.data, email, bot_id)

            # Update the last message id in the last_cat_message table
            # !Sensitive table - If it fails then all the data extraction will start from the beginning
            set_last_cat_message(messages.data[-1]['id'],email,bot_id)
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
                    await extract_memory(messages.data, email, bot_id)

                    # Update the last message id in the last_cat_message table
                    # !Sensitive table - If it fails then all the data extraction will start from the beginning
                    set_last_cat_message(messages.data[-1]['id'],email,bot_id)

            except (IndexError, AttributeError) as e:
                print(f"Error processing messages: {e}")
                
    except Exception as e:
        print(f"Error in extract_memory: {e}")

async def extract_memory(previous_conversation,email,bot_id):
    previous_conversation = format_client_conversation(previous_conversation)

    messages = [{
        "role": "system",
        "content": MEMORY_EXTRACTOR_SYSTEM_PROMPT
    }]

    messages.append({
        "role": "user",
        "content": f""" 
            Conversation:
            {previous_conversation}
            """
    })

    res = await call_openai_api(messages)
    
    json_str = extract_json_from_text(res)
    res = json.loads(json_str)

    if(res['extracted_memories'] == []):
        await log_retrieve_memory_data(previous_conversation,res['extracted_memories'],email,bot_id)
        return False

    res = res['extracted_memories']

    formatted_data = []

    current_time = datetime.now(timezone.utc)
    formatted_time = current_time.strftime("%a %b %d %Y %H:%M:%S GMT%z")

    created_at = convert_to_clean_number(formatted_time)
    
    def process_section(section_data):
        for memory_item in section_data:
            formatted_item = {
                "id": f"mem_{uuid.uuid7()}",
                "text": memory_item["memory"],
                "metadata": {
                    "categories": memory_item["category"],
                    "created_at": created_at
                }
            }
            formatted_data.append(formatted_item)
    process_section(res)

    # Convert the messages embeddings and store them in pinecone
    # Convert the text into numerical vectors that Pinecone can index
    embeddings = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=[d['text'] for d in formatted_data],
        parameters={"input_type": "passage", "truncate": "END"}
    )
    records = []

    # Example usage for Pinecone:
    for d, e in zip(formatted_data, embeddings):
        records.append({
            "id": d["id"],
            "values": e["values"],
            "metadata": {
                "text": d["text"],
                "categories": d["metadata"]["categories"],
                "created_at": d["metadata"]["created_at"]
            }
        })

    # Upsert the records into the index
    index.upsert(
        vectors=records,
        namespace=f"{email}-{bot_id}-conversation" # User ID - email - delhi
    )

    await log_retrieve_memory_data(previous_conversation,res,email,bot_id)
    return True

async def checker():
    # last_cat_message table is used to store the last message id for each email and bot_id combination
    response = get_all_last_cat_messages()
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