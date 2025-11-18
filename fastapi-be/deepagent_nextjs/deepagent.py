from deepagents import create_deep_agent
from deepagent_nextjs.tavily_client import get_tavily_client
from model.main import gpt_4o_mid, gpt_4o_large, gpt_4o_small
from langchain_core.tools import tool
from baml_client import b
from baml_client.types import (NextjsProjectStructure)

research_instructions = """
You are an expert researcher. Your job is to conduct thorough research, and then write a polished report.
You have access to an internet search tool as your primary means of gathering information.
You need to prefer official docs, github repos, medium articles & bolgs as your primary source and if that doesn't work then you can go for something else
"""

class NextJSDeepagent():

    def __init__(self, user_prompt:str):
        self.user_prompt = user_prompt
        self.broken_down_user_prompt: str
        self.generated_proj_structure: NextjsProjectStructure

    def get_research_subagent(self):
        """
        Returns the research subagent configuration.
        Defined as a method to ensure search_web tool is available.
        """
        return {
            "name": "research subagent",
            "description": "searches the web and returns top 5 results",
            "system_prompt": research_instructions,
            "tools": [self.search_web],
            "model": "openai:gpt-4o"
        }


    @tool
    def nextjs_generation_critique(self):
        """
            Takes in currently generated project structure and critiques the problems
        """
        return b.CritiqueNextjsProjectStructure(self.generated_proj_structure)

    @tool
    def plan_nextjs_steps(self):
        """
            generates executionable steps from broken down prompt to create the required project
        """
        return b.PlanNextjsProjectGenerationSteps(self.broken_down_user_prompt)

    @tool
    def prompt_engineer(self):
        """
            breaks down prompts into guidelines for llm
        """
        return b.PreprocessUserPrompt(self.user_prompt)
    
    @tool
    def search_web(self, query: str):
        """
            run's web search and returns top 5 results
        """
        tavily_client = get_tavily_client()

        return tavily_client.search(
            query=query,
            search_depth="basic",
            max_results=5,
            include_raw_content=False,
        )

