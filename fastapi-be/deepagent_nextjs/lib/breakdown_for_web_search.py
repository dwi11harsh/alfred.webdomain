import os
import json
from openai import OpenAI
from dotenv import load_dotenv
import logging


load_dotenv()
logger = logging.getLogger()


def prompt_breakdown_for_web_search(query: str) -> list[str] | None:
    """breaks down the search query into a series of prompts for better search results"""
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai_api_key:
        logger.error("OPENAI_API_KEY not found")
        raise ValueError("Error getting OPENAI_API_KEY")
    
    print("generating client")
    client = OpenAI(api_key=openai_api_key)
    
    try:
      print("fetching response")
      raw_response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert prompt engineer. You will be given a single string that might be too complex to search on the web. Generate a series of simple queries which will be searched on the internet. These queries should generate concrete, precise & actionable answers for the topic given."},
                {"role": "user", "content": f"QUERY: {query}"}
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "search_queries",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "queries": {
                                "type": "array",
                                "items": {"type": "string"}
                            }
                        },
                        "required": ["queries"],
                        "additionalProperties": False
                    }
                }
            },
            temperature=0.0,
            max_tokens=500,
            timeout=10.0
        )
      json_response = json.loads(raw_response.choices[0].message.content)
      return json_response['queries']
        
    except Exception as e:
        print(f"error generating the subqueries: {e}")
        return None