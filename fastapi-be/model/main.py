import os
from langchain_openai import OpenAI, ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

def gpt_4o_small():
    """
        gpt ai model with max token limit of 750 (optimized from 1000)
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return ChatOpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=750,  # Reduced from 1000 to 750
        api_key=api_key,
        max_retries=6,  # Increased retries for rate limit handling with exponential backoff
        timeout=60.0,  # Increased timeout
    )


def gpt_4o_mid():
    """
        gpt ai model with max token limit of 4000 (optimized from 5000)
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return ChatOpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=4000,  # Reduced from 5000 to 4000
        api_key=api_key,
        max_retries=6,  # Increased retries for rate limit handling with exponential backoff
        timeout=60.0,  # Increased timeout
    )

def gpt_4o_large():
    """
        gpt ai model with max token limit of 8000
    """
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    
    return ChatOpenAI(
        model="gpt-4o",
        temperature=0.0,
        max_tokens=8000,
        api_key=api_key,
        max_retries=6,  # Increased retries for rate limit handling with exponential backoff
        timeout=60.0,  # Increased timeout
    )

def gpt_4o():
    """
        gpt 4 modle with no token limit
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")

    return ChatOpenAI(name="gpt-4o", api_key=api_key)
