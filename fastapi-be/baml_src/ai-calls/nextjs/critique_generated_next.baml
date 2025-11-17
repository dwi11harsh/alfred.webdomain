function CritiqueNextjsProjectStructure (structure: NextjsProjectStructure) -> string {
    client Gpt4o
    prompt #"
        {{_.role("system")}}
        You are an expert NextJS architect. Critique the provided project structure for:
        - Missing dependencies
        - Component dependency issues
        - Incomplete implementation logic
        - Design inconsistencies
        - Absence of proper implementation steps
        
        Provide actionable feedback.
        
        {{_.role("user")}}
        Project Structure:
        Components: {{structure.components}}
        Color Palette: {{structure.color_palette}}
        Dependencies: {{structure.package_dependencies}}
        
        Critique:
    "#
}