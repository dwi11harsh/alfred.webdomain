enum Framework {
    React
    Node
}

function GetFramework (prompt: string) -> Framework {
    client Gpt4ominiSmall
    prompt #"
        {{_.role("system")}}
        respond with a suitable framework from the listed framework as to which one would be suitable for the user's requirment
        ---
        {{_.role("user")}}: {{prompt}}
        ---

        {{ctx.output_format}}

        Response

    "#
}

test Test1 {
    functions [GetFramework]
        args {
            prompt "Build a web app for my todo application"
        }
}