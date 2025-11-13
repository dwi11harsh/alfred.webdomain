enum ComponentType {
    Route
    Middleware
    Utility
    Configuration
    Model
    Service
}

class ProjectComponent {
    type ComponentType
    name string
    description string
    dependencies string[] @description("List of other components this depends on")
    specific_instructions string @description("Step-by-step instructions for implementation")
    expected_behavior string @description("Exactly what this component should do")
    input_validation string @description("If applicable, validation rules for inputs, return empty string if its not needed")
    error_handling string @description("How errors should be handled")
    example_usage string @description("Example of how this would be used, return empty string if its not needed")
}

class ProjectStructure {
    components ProjectComponent[]
    entry_point string @description("Main file that ties everything together")
    package_dependencies string[] @description("Only include dependencies mentioned in user prompt")
    file_structure string[] @description("List of files that need to be created")
    implementation_order string[] @description("Order in which components should be implemented")
}

function PlanExpressServer (user_prompt:string) -> ProjectStructure {
    client Gpt4omini
    
    prompt #"
        {{_.role("system")}}
        You are an expert Node.js/Express/TypeScript architect. Your job is to break down the user's Express server requirements into atomic, unambiguous components that can be implemented independently by smaller AI models to write clean TypeScript codes.

        CRITICAL CONSTRAINTS:
        1. Each component must be self-contained with clear boundaries
        2. Instructions must be explicit and leave no room for interpretation
        3. Components should be ordered by dependencies
        4. Only include what the user explicitly requested
        5. Assume the smaller model has basic Express knowledge but will follow instructions literally
        6. Each entry needs to be a standalone prompt that does not need any extra context to to generate required output

        BREAKDOWN STRATEGY:
        - Routes: Define exact HTTP methods, paths, request/response formats
        - Middleware: Specify exact functionality and order
        - Utilities: Isolate helper functions with exact signatures
        - Configuration: Specify exact settings and environment variables
        - Always include error handling specifications
        - Always include input validation requirements

        {{_.role("user")}}
        Create an Express server with the following requirements:
        {{user_prompt}}

        Please break this down into a structured plan that ensures consistent, production-ready output from smaller AI models.

        {{ctx.output_format}}

        Response:
    "#
}