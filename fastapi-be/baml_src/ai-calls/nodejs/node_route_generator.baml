function NodeRouteGenerator (generated_prompt: NodeJSProjectComponent ) -> NodeJSRouteGeneratorOutput {
    client Gpt4omini

    prompt #"
        {{_.role("system")}}
        You are going to be provided with a user's prompt with will describe an Express/TypeScript route component
        Your job is to generate the component as described without making any changes to the description


        ---
        {{_.role("user")}}
        ---

        {{generated_prompt}}

        ---
        
        {{ctx.output_format}}

        Response
    "#
}