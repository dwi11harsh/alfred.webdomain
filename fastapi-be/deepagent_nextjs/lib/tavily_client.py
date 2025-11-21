import os
from langchain_core.tools import tool
from tavily import TavilyClient
from dotenv import load_dotenv
import logging
logger = logging.getLogger()

load_dotenv()

tavily_api_key = os.getenv("TAVILY_API_KEY")

def get_tavily_client() -> TavilyClient | None:
    """Searches the web for provided query"""
    if not tavily_api_key or tavily_api_key == "":
        raise ValueError("TAVILY_API_KEY not found")
    else:
        print("🚀 tavily api key is present for development")
    
    try:
        tavily_client = TavilyClient(api_key=tavily_api_key)
        return tavily_client
    except Exception as e:
        logger.warning(f"Could not create tavily_client: {e}")
        return None