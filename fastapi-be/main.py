import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from baml_client import b
from baml_client.types import Framework

load_dotenv()

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"hello": "world"}


@app.post("/get-framework")
async def getFramework(request: PromptRequest):
    prompt = request.prompt

    framework = b.GetFramework(prompt = prompt)
    
    return {"framework": framework}


@app.post("/get-nodejs-steps")
async def getNodejsSteps(request: PromptRequest):
    prompt = request.prompt

    steps = await b.PlanExpressServer(user_prompt=prompt)

    return {"prompt-steps":steps}