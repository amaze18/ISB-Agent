import os
from dotenv import load_dotenv # type: ignore
load_dotenv()
from supabase import Client, create_client #type: ignore
# Supabase connection details
SUPABASE_URL = os.getenv("SUPABASE_URL")  # Supabase project URL from environment variable
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # Supabase API key from environment variable

db_extender = "_isb_dlabs"

# Create a Supabase client using project URL and API key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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

# Function to check if an entry exists in the last_cat_message table
async def check_entry_exists(email, bot_id):
    # Query the last_cat_message table
    response = supabase.table(f"last_cat_message{db_extender}").select("message_id").eq("email", email).eq("bot_id", bot_id).execute()
    # Check if the response is empty
    if response.data == []:
        created = supabase.table(f"last_cat_message{db_extender}").insert({"email" : email,"bot_id" : bot_id,"message_id" : ""}).execute()
        return "Created"
    # Return the response
    return response

# Function to get messages from the messages table
async def get_messages(email, bot_id, message_id):
    # Query the messages table
    query = supabase.table(f"messages{db_extender}").select("*").eq("email", email).eq("bot_id", bot_id)
    
    # Only add the gt filter if message_id is not empty
    if message_id:
        query = query.gt("id", message_id)
        
    # Limit the number of messages to 20
    response = query.limit(20).order("created_at").execute()
    return response

async def log_to_supabase(message,email,bot_id,bot_response,relative_data,extracted_data):
    data = {
        "message" : message,
        "email" : email,
        "bot_id" : bot_id,
        "bot_response" : bot_response,
        "vector_retrieved_data" : relative_data,
        "extracted_data" : extracted_data,   
    }

    response = supabase.table(f"message_logs{db_extender}").insert(data).execute()

    return response

async def log_retrieve_memory_data(previous_conversations,extracted_data,email,bot_id):
    data = {
        "previous_conversations" : previous_conversations,
        "extracted_data" : extracted_data,
        "email" : email,
        "bot_id" : bot_id,
    }
    response = supabase.table(f"retrieve_memory_data{db_extender}").insert(data).execute()

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

    res = supabase.table(f"log_messages_with_like_dislike{db_extender}").insert(data).execute()
    return res

def log_notes_memory(notes,extracted_data,email,bot_id):
    data = {
        "notes": notes,
        "extracted_data": extracted_data,
        "email": email,
        "bot_id": bot_id
    }

    res = supabase.table(f"notes{db_extender}").insert(data).execute()

    return res

def like_dislike(message_id,like_or_dislike):
    return supabase.table(f"log_messages_with_like_dislike{db_extender}").update({"feedback" : like_or_dislike}).eq("id", message_id).execute()

def set_last_cat_message(message_id,email,bot_id):
    return supabase.table(f"last_cat_message{db_extender}").update({"message_id": message_id}).eq("email", email).eq("bot_id", bot_id).execute()

def get_all_last_cat_messages():
    return supabase.table(f"last_cat_message{db_extender}").select("*").execute()