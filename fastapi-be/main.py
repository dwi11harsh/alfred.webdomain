import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from baml_client import b
from baml_client.types import ProjectStructure, RouteGeneratorOutput
from e2b_code_interpreter import Sandbox

load_dotenv()

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

class ComponentRequest(BaseModel):
    prompt_steps: ProjectStructure

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

    steps: ProjectStructure = await b.PlanExpressServer(user_prompt=prompt)

    return {"prompt-steps":steps}

@app.post("/nodejs-component")
async def GenerateNodejsComponents (request: ComponentRequest):
    req_arr = request.prompt_steps
    codes = []

    for entry in req_arr.components:
        res: RouteGeneratorOutput = await b.NodeRouteGenerator(entry)
        codes.append(res)
    
    return {"codes": codes}

@app.post("/container")
async def CreateE2bContainer ():

    print("creating sandbox")
    sbx = Sandbox.create() # for 5 mins by def
    print("sandbox created")
    execution = sbx.run_code("print('hello-world')")
    print("code executed")
    print(execution.logs)
    sbx.kill()
    await sbx.kill()
    return {"all":"good"}
