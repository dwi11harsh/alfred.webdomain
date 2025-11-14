import os
from e2b import Template, default_build_logger
from dotenv import load_dotenv

load_dotenv()

e2b_api_key = os.getenv("E2B_API_KEY")

if not e2b_api_key | e2b_api_key == "":
    print("❗️ E2B api key not found")

async def build_custom_nodejs_e2b_template():
    template_name = "webdomain-nodejs-starter"
    template = (
        Template()
        .from_node_image("lts")
        .apt_install(["git", "curl", "npm"])
        .set_workdir("/app")
        .git_clone("https://github.com/dwi11harsh/e2b-nodejs-starter-template", "/app/repo")
        .npm_install(["pm2", "nodemon"], g=True)
    )
    info = Template.build(
        template,
        api_key = e2b_api_key,
        alias = template_name,
        cpu_count = 2,
        memory_mb = 2048,
        on_build_logs = default_build_logger()
    )
    print("✅ template created successfully")
    print("template name: ", template_name)
    print("template id: ", info.template_id)
    print("template build id: ", info.build_id)