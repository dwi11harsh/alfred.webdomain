function PreprocessUserPrompt (user_prompt: string) -> string {
    client Gpt4o
    prompt #"
        {{_.role("system")}}
        You are an expert prompt engineer. Break down the user's raw prompt into a structured, detailed prompt that:
        - Clarifies ambiguous requirements
        - Extracts explicit features and functionality
        - Identifies design preferences (if mentioned)
        - Separates frontend and backend requirements
        - Highlights any constraints or preferences
        - Formats it for use by a NextJS project planning system
        
        Return a refined, comprehensive prompt that maintains all original requirements but is more structured and clear.
        
        {{_.role("user")}}
        Original prompt: {{user_prompt}}
        
        Refined prompt:
    "#
}