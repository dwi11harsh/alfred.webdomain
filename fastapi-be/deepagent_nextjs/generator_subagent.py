from model.main import gpt_4
from langgraph.graph import StateGraph, START, END

def generate(state: dict) -> dict:
    question = state['question']
    llm = gpt_4()

    response = llm.invoke(f"Answer the following: {question}")

    return {"answer": response.content}

