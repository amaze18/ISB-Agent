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

from notes_processing import extract_notes_memory
from pre_processing import retrieve_memory,reminder_response
from post_processing import extract_memory

from cartesia import Cartesia # type: ignore

dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)

from utils import bot_response,checker,insert_entry,restrict_to_last_20_messages,log_messages_with_like_dislike,like_dislike,log_notes_memory,check_for_origin_question,reminder_response_to_user

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

# Configure logging for the application
import logging
logging.basicConfig(
    filename="app.log",  # Log file name
    filemode='a',  # Append to log file
    format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',  # Log format
    datefmt='%H:%M:%S',  # Time format in logs
    level=logging.INFO  # Log level: INFO
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
@app.post("/cv/chat")
async def cv_chat(request: QuestionRequest, background_tasks: BackgroundTasks):
    try:
        # Validate if the question is provided and not empty
        if not request.message or request.message.strip() == "":
            return {"error": str("Please provide a message")}  # Return error if invalid
        
        reminder = False

        previous_conversation = restrict_to_last_20_messages(request.previous_conversation)

        check = await check_for_origin_question(request.message,request.previous_conversation)

        if check == "Yes":
            log = log_messages_with_like_dislike(request.email,request.bot_id,request.message,"I was developed by the Desis Dev team!","",previous_conversation[-5:],"")
            return {
                "response": "I was developed by a team of Desi Developers, but you brought me to life!!",
                "message_id": log.data[0]["id"]
            }

        # Get relative information from the question
        memory,rephrased_user_message,category = await retrieve_memory(request.message,request.email,request.bot_id,previous_conversation)
        if category == "Reminder":
            print("REMINDER")
            reminder = await reminder_response(request.message, previous_conversation, request.request_time)
            # Directly access the dictionary without converting to a JSON string
            response = reminder['response']
        else:
            # Generate bot response using the provided information and user question
            response = await bot_response(request.bot_prompt,request.message,rephrased_user_message,previous_conversation,memory,request.request_time)

        # def log_messages_with_like_dislike(user_email,bot_id,user_message,bot_response,feedback,last_5_messages,memory_extracted):
        log = log_messages_with_like_dislike(request.email,request.bot_id,request.message,response,"",previous_conversation[-5:],memory)

        background_tasks.add_task(
            insert_entry,request.email,request.message,response,request.bot_id
        )

        return {
            "response": response,
            "message_id": log.data[0]["id"],
            "reminder": reminder
        }
    
    # Handle any exceptions that occur during execution
    except Exception as e:
        logging.info(f"Error: {e}")  # Log the error for debugging
        print(e)
        return {"error": str("Error occurred while generating!!")}  # Return error message
    
class ReminderResponse(BaseModel):
    message: Union[str, None] = None  # Question from the user
    bot_id: str = "delhi"  # Personality type
    # bot_prompt: str = ""  # Personality prompt 
    previous_conversation: list = [] # previous conversation
    email: str = ""  # Email address
    request_time : str = "" # Time of request
    remind_time: str = "" # Time of reminder set for

@app.post("/cv/response/reminder")
async def reminder_response_generate(request: ReminderResponse, background_tasks: BackgroundTasks):
    try: 
        reminder = False
        previous_conversation = restrict_to_last_20_messages(request.previous_conversation)

        response = await reminder_response_to_user(request.message, previous_conversation, request.request_time,request.remind_time)

        log = log_messages_with_like_dislike(request.email,request.bot_id,request.message,response,"",previous_conversation[-5:],"")

        background_tasks.add_task(
            insert_entry,request.email,request.message,response,request.bot_id
        )

        return {
            "response": response,
            "message_id": log.data[0]["id"],
            "reminder": reminder
        }
    
    # Handle any exceptions that occur during execution
    except Exception as e:
        print(e)
        return {"error": str("Error occurred while generating reminder response!!")}  # Return error message


@app.post("/cv/message/feedback/{message_id}/{feedback}")
async def like_message(message_id: int,feedback: str):
    try:
        res = like_dislike(message_id,feedback)
        return res
    except Exception as e:  
        print(e)
        return {"error": str("Error occurred while processing!!")}  # Return error message
    
class NotesRequest(BaseModel):
    text : str = ""
    email : str = ""
    bot_id : str = ""
    
@app.post("/cv/notes")
async def cv_notes(request: NotesRequest,background_tasks: BackgroundTasks):
    try:
        # Validate if the question is provided and not empty
        if not request.text or request.text.strip() == "":
            return {"error": str("Please provide a text")}  # Return error if invalid
        
        res = await extract_notes_memory(request.text,request.email,request.bot_id)

        background_tasks.add_task(
            log_notes_memory,request.text,res,request.email,request.bot_id
        )
        return True
    except Exception as e:  
        print(e)    
        return {"error": str(f"Error occurred while processing!!")}  # Return error message

class TTSRequest(BaseModel):
    transcript: str
    voice_id: str = "a0e99841-438c-4a64-b679-ae501e7d6091"  # Default to Barbershop Man
    output_format: Optional[dict] = {
        "container": "wav",
        "encoding": "pcm_f32le",
        "sample_rate": 44100,
    }

# Initialize Cartesia client
client = Cartesia(api_key=os.environ.get("CARTESIA_API_KEY"))

class TTSRequest(BaseModel):
    transcript: str
    voice_id: str = "a0e99841-438c-4a64-b679-ae501e7d6091"  # Default to Barbershop Man
    output_format: Optional[dict] = {
        "container": "wav",
        "encoding": "pcm_f32le",
        "sample_rate": 44100,
    }

def cleanup_file(path: str):
    """Background task to remove the temporary file"""
    try:
        os.unlink(path)
    except Exception as e:
        print(f"Error cleaning up file {path}: {e}")

@app.post("/generate-audio")
async def generate_audio(request: TTSRequest, background_tasks: BackgroundTasks):
    try:
        # Generate audio bytes using Cartesia
        audio_data = client.tts.bytes(
            model_id="sonic",
            transcript=request.transcript,
            voice_id=request.voice_id,
            output_format=request.output_format
        )
        
        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            temp_file.write(audio_data)
            temp_path = temp_file.name
        
        # Add cleanup task to background tasks
        background_tasks.add_task(cleanup_file, temp_path)
        
        # Return the audio file
        return FileResponse(
            temp_path,
            media_type="audio/wav",
            filename="generated_audio.wav"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.on_event("startup")
@repeat_every(seconds=60 * 5) 
async def check_memory_extraction():
    print("Checking Memory Extraction")
    await checker()