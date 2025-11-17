import os
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()

def get_tavily_client():
    tavily_api_key = os.getenv("TAVILY_API_KEY")

    if not tavily_api_key:
        raise ValueError("❗️ Tavily API key not found")

    return TavilyClient(api_key=tavily_api_key)


    

    