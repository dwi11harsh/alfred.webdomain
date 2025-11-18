import os
from langchain_openai import OpenAI, ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

def gpt_4o_small():
    """
        gpt ai model with max token limit of 1000
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return OpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=1000,
        api_key=api_key,
    )


def gpt_4o_mid():
    """
        gpt ai model with max token limit of 5000
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return OpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=5000,
        api_key=api_key,
        
    )

def gpt_4o_large():
    """
        gpt ai model with max token limit of 8000
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return OpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=8000,
        api_key=api_key,
        
    )

def gpt_4():
    """
        gpt 4 modle with no token limit
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")

    return ChatOpenAI(name="gpt-4", api_key=api_key)
