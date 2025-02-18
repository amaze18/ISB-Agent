from fastapi import FastAPI,File,UploadFile,Form,BackgroundTasks,HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from typing_extensions import Annotated # type: ignore
from typing import Union
import json
import os
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from fastapi.encoders import jsonable_encoder # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from dotenv import load_dotenv  # type: ignore
from pathlib import Path
from supabase import create_client, Client # type: ignore
from typing import Optional
from fastapi.responses import FileResponse # type: ignore
import tempfile
from fastapi_utils.tasks import repeat_every # type: ignore
import uuid

from cartesia import Cartesia # type: ignore

from memory_service.utils import restrict_to_last_20_messages,check_for_origin_question,bot_response,reminder_response_to_user,reminder_response,get_memory
from memory_service.Retriever.retriever import retrieve_memory
from memory_service.db_fun import log_messages_with_like_dislike,insert_entry

from memory_service.Extractor.extractor import checker

dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)

# Initialize FastAPI application
app = FastAPI()

# Add CORS middleware to allow requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,  # Allow credentials (e.g., cookies, headers)
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all HTTP headers
)

# Define a Pydantic model for the incoming request body
class QuestionRequest(BaseModel):
    message: Union[str, None] = None  # Question from the user
    bot_id: str = "delhi"  # Personality type
    bot_prompt: str = ""  # Personality prompt 
    previous_conversation: list = [] # previous conversation
    email: str = ""  # Email address
    request_time : str = "" # IP address

# Define the endpoint for chat functionality
# http://54.196.173.34/cv/chat
@app.post("/cv/chat")
async def cv_chat(request: QuestionRequest, background_tasks: BackgroundTasks):
    try:
        # Validate if the question is provided and not empty
        if not request.message or request.message.strip() == "":
            return {"error": str("Please provide a message")}  # Return error if invalid
        # default message is flagged as reminder false
        reminder = False

        # Get the previous conversation - last 20 messages
        previous_conversation = restrict_to_last_20_messages(request.previous_conversation)

        # Check if the question is an origin question - like related to the model development or any question related to the model
        # Guardrail
        check = await check_for_origin_question(request.message,request.previous_conversation)

        # If the question is an origin question, log it and return a response
        if check == "Yes":
            log = log_messages_with_like_dislike(request.email,request.bot_id,request.message,"I was developed by a team of Desi Developers, but you brought me to life!!","",previous_conversation[-5:],"")
            return {
                "response": "I was developed by a team of Desi Developers, but you brought me to life!!",
                "message_id": log.data[0]["id"]
            }

        # Get relative information from the question
        memory,rephrased_user_message,category = await retrieve_memory(request.message,request.email,request.bot_id,previous_conversation)
        print(memory)
        if category == "Reminder":
            print("REMINDER")
            reminder = await reminder_response(request.message, previous_conversation, request.request_time)

            # Set response to the reminder response
            response = reminder['response']
        else:
            # Generate bot response using the provided information and user question
            response = await bot_response(request.bot_prompt,request.message,rephrased_user_message,previous_conversation,memory,request.request_time)
            print("Response",response)

        # def log_messages_with_like_dislike(user_email,bot_id,user_message,bot_response,feedback,last_5_messages,memory_extracted):
        log = log_messages_with_like_dislike(request.email,request.bot_id,request.message,response,"",previous_conversation[-5:],memory)

        # Insert the entry into the database
        background_tasks.add_task(
            insert_entry,request.email,request.message,response,request.bot_id
        )

        # Return the response
        return {
            "response": response,
            "message_id": log.data[0]["id"],
            "reminder": reminder
        }
        
    # Handle any exceptions that occur during execution
    except Exception as e:
        print(e)
        return {"error": str("Error occurred while generating!!")}  # Return error message
    
@app.on_event("startup")
@repeat_every(seconds=60 * 5) 
async def check_memory_extraction():
    print("Checking Memory Extraction")
    await checker()