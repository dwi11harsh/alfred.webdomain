import os
import json
import time
from openai import OpenAI, RateLimitError
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
    client = OpenAI(api_key=openai_api_key, max_retries=6)
    
    max_retries = 6
    retry_delay = 1  # Start with 1 second
    
    for attempt in range(max_retries):
        try:
            print("fetching response")
            # Optimized: Use gpt-4o-mini instead of gpt-4o, reduce max_tokens to 250
            raw_response = client.beta.chat.completions.parse(
                model="gpt-4o-mini",  # Changed from gpt-4o to gpt-4o-mini (much cheaper)
                messages=[
                    {"role": "system", "content": "Expert prompt engineer. Break complex queries into simple web search queries. Generate concrete, actionable queries."},
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
                max_tokens=250,  # Reduced from 500 to 250
                timeout=30.0  # Increased timeout
            )
            try:
                json_response = json.loads(raw_response.choices[0].message.content)
                return json_response['queries']
            except Exception as e:
                logger.error("Error occured while parsing broken down prompts")
                return None
        
        except RateLimitError as e:
            if attempt < max_retries - 1:
                # Extract wait time from error message if available
                wait_time = retry_delay * (2 ** attempt)  # Exponential backoff
                error_msg = str(e)
                if "try again in" in error_msg:
                    # Try to extract the wait time from the error message
                    try:
                        import re
                        wait_match = re.search(r"try again in ([\d.]+)s", error_msg)
                        if wait_match:
                            wait_time = float(wait_match.group(1)) + 1  # Add 1 second buffer
                    except:
                        pass
                
                logger.warning(f"Rate limit hit, waiting {wait_time:.2f} seconds before retry {attempt + 1}/{max_retries}")
                time.sleep(wait_time)
            else:
                logger.error(f"Rate limit error after {max_retries} attempts: {e}")
                return None
        
        except Exception as e:
            logger.error(f"error generating the subqueries: {e}")
            return None
    
    return None