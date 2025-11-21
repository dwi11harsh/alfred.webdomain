import logging
from deepagents import create_deep_agent
from model.main import gpt_4o_small
from search_agent_prompt import system_prompt_for_search_agent
from breakdown_for_web_search import prompt_breakdown_for_web_search
from search_queries import search_query_on_web
from langchain.tools import tool

logger = logging.getLogger()

@tool
def search_agent():
  model = gpt_4o_small()

  try:
    agent = create_deep_agent(
        name="Search Agent",
        model=model,
        tools=[prompt_breakdown_for_web_search, search_query_on_web ],
        system_prompt=system_prompt_for_search_agent,
        middleware=None,
        subagents=None,
        response_format=None,
        context_schema=None,
        checkpointer=None,
        store=None,
        backend=None,
        interrupt_on=None,
        debug=False,
        cache=None
        )

    return agent
  except Exception as e:
    logger.log("Error creating search agent")
    return None