// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview

client<llm> Gpt4omini {
  provider openai
  options {
    model "gpt-4o-mini"
    api_key env.OPENAI_API_KEY
    base_url env.OPENAI_API_BASE
    temperature 0.1
    max_tokens 50
  }
}

client<llm> Gpt5mini {
  provider openai
  options {
    model "gpt-5-mini"
    api_key env.OPENAI_API_KEY
    base_url env.OPENAI_API_BASE
    temperature 0.1
    max_tokens 1000
  }
}

client<llm> Gpt5 {
  provider openai
  options {
    model "gpt-5"
    api_key env.OPENAI_API_KEY
    base_url env.OPENAI_API_BASE
  }
}