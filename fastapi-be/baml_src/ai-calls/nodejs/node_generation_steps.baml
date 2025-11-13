enum DefinitionType {
    Route
    HelperFunction
    Middleware
}

class File {
    route string @description(#"
        name of route. this may or may not include parameters depending upon the need
    "#)
    input string @description(#"
        the input that the defined route
    "#)
    output string @description(#"
        output of defined route
    "#)
    process string @description(#"
        how will this function convert the input into required output
    "#)
}


function PlanNodeProject (prompt:string) -> File[] {
    client Gpt5

    prompt #"
        {{_.role("system")}}

        Return an array of {{File}} that contains prompts to create an ExpressJS backend for the user's prompt
        These prompts will then be fed to a smaller model to create a fully fledged, production ready backend server
        Don't add the support for any external library, databases, middlewares, auth etc. until and unless specified by the user
        The final output from these prompts needs to be a single index.ts file that contains all the logics for the database
        Add support for multiple files only if user explicitely asks for it

        ---
        {{_.role("user")}}

        {{prompt}}

        ---

        {{ctx.output_format}}

        Response:
    "#
}