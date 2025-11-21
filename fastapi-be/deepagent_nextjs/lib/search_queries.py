import logging
from typing import Literal
from tavily_client import get_tavily_client

logger = logging.getLogger()


def search_query_on_web(
    queries: list[str], 
    search_depth: Literal["basic", "advanced"] = "basic", 
    max_results: int = 5, 
    include_domains: list[str] | None = None, 
    exclude_domains: list[str] | None = None, 
    include_answer: bool = False, 
    include_raw_content: bool = False
) -> list | None:
    """
    Executes web searches using the Tavily API for each query in the provided list.
    
    This function performs multiple web searches in sequence, one for each query string
    provided. It uses the Tavily search client to retrieve search results with customizable
    parameters for depth, result count, domain filtering, and content inclusion.
    
    Args:
        queries: A list of search query strings to be executed. Each query will be
            searched independently and results will be collected in the returned list.
            Example: ["python async programming", "fastapi best practices"]
        
        search_depth: Determines the depth and comprehensiveness of the search.
            - "basic": Performs a standard search with faster response times
            - "advanced": Conducts a more thorough search with potentially more
              comprehensive results, may take longer
            Defaults to "basic".
        
        max_results: The maximum number of search results to return for each query.
            Must be a positive integer. Defaults to 5.
        
        include_domains: Optional list of domain names to exclusively include in
            search results. Only results from these domains will be returned.
            If None, no domain filtering is applied.
            Example: ["github.com", "stackoverflow.com"]
            Defaults to None.
        
        exclude_domains: Optional list of domain names to exclude from search results.
            Results from these domains will be filtered out.
            If None, no domain exclusion is applied.
            Example: ["example.com", "test.com"]
            Defaults to None.
        
        include_answer: If True, includes direct answers in the search results when
            available. Direct answers provide concise responses extracted from sources.
            Defaults to False.
        
        include_raw_content: If True, includes the raw HTML/content of the search
            results. This can significantly increase response size but provides
            full content for analysis. Defaults to False.
    
    Returns:
        A list containing the search results for each query. Each element in the list
        corresponds to the results of a single query from the input queries list.
        Returns an empty list if the Tavily client cannot be initialized.
        Each result object typically contains:
        - url: The URL of the search result
        - title: The title of the page
        - content: The content/snippet from the page
        - score: Relevance score (if available)
        - Additional fields based on include_answer and include_raw_content flags
    
    Raises:
        ValueError: If TAVILY_API_KEY is not found in environment variables
            (raised by get_tavily_client).
    
    Example:
        >>> results = search_queries(
        ...     queries=["python async", "fastapi tutorial"],
        ...     search_depth="basic",
        ...     max_results=3,
        ...     include_domains=["github.com", "docs.python.org"]
        ... )
        >>> len(results)
        2
        >>> results[0]  # Results for "python async"
        {...}
    """
    tavily_client = get_tavily_client()

    if tavily_client:
        tavily_responses = []
        logger.info("Successfully generated tavily client")

        for query in queries:
            response = tavily_client.search(
                query=query,
                search_depth=search_depth,
                max_results=max_results,
                include_domains=include_domains,
                exclude_domains=exclude_domains,
                include_answer=include_answer,
                include_raw_content=include_raw_content
            )
            tavily_responses.append(response)
        
        return tavily_responses
    else:
        logger.warning("Tavily client is None, cannot perform search")
        return None