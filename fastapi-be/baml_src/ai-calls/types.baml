enum ComponentType {
    Route
    Middleware
    Utility
    Configuration
    Model
    Service
    Component
    Page
    Layout
    Admin
}

enum DesignSystem {
    Custom
    NoDesignSystem @alias("none")
}


enum TestType {
    Unit
    Integration
    E2e
}

enum AnalyticsProvider {
    Posthog
    Custom
    NoAnalytics @alias("none")
}

enum CommandType {
    CreateFile
    UpdateFile
    DeleteFile
    ReadFile
}

class NextJSProjectComponent {
    type ComponentType
    command CommandType @description("which command needs to be run for this particular component")
    filePath string @description("the path where this command needs to be run. example of filepath would look like 'app/components/Button.tsx', the current project is not using src directory ")
    dependencies string[] @description("List of other components this depends on (if any)")
    specific_instructions string[] @description("Step-by-step instructions for implementation (5-7 numbered steps, very explicit)")
    input_validation string @description("If applicable, validation rules for inputs, return empty string if its not needed")
    error_handling string @description("How errors should be handled")
    design_guidelines string @description("Design system guidelines, Tailwind classes, responsive breakpoints, accessibility requirements. Colors to be preferred.  Return empty string if not applicable.")
    test_requirements TestType[] @description("Types of tests required for this component, return empty array in none, Prefer not to have this until explicitly asked for")
    analytics_events string[] @description("Analytics events to track for this component (e.g., ['button_clicked', 'form_submitted']). Prefer not to have this until explicitly asked for, Return empty array if not applicable.")
}

class NextjsProjectStructure {
    components NextJSProjectComponent[]
    color_palette string @description("color palette/theme for this project")
    package_dependencies string[] @description("Only include dependencies mentioned in user prompt or required by feature templates")
}

class NodeProjectStructure {
    components NextJSProjectComponent[]
    package_dependencies string[] @description("Only include dependencies mentioned in user prompt or required by feature templates")
}

class NodeJSRouteGeneratorOutput {
    componentType ComponentType
    routeName string
    dependencies string[] @description("list of dependency that might be required for the creation of this route")
    final_code string
}

class NodeJSProjectComponent {
    type ComponentType
    command CommandType @description("which command needs to be run for this particular component")
    filePath string @description(`the path where this command needs to be run. example of filepath would look like "src/middleware.ts"`)
    current_code string @description("gives back the current code which was already present in this file and returns empty string when there was none")
    name string
    description string
    dependencies string[] @description("List of other components this depends on")
    specific_instructions string @description("Step-by-step instructions for implementation")
    expected_behavior string @description("Exactly what this component should do")
    input_validation string @description("If applicable, validation rules for inputs, return empty string if its not needed")
    error_handling string @description("How errors should be handled")
    example_usage string @description("Example of how this would be used, return empty string if its not needed")
}