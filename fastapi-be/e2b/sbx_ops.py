from e2b_code_interpreter import Sandbox
from datetime import datetime
from typing import Optional, Dict, Any

template_alias = "webdomain-nodejs-starter"
timeout = 3600
allow_internet_access = True
host_port = 3000

class E2BSandbox:
  
  def __init__(self) -> None:
    self.sbx: Optional[Sandbox] = None
    self.sbx_info: Optional[Dict[str, Any]] = None

  def create_sandbox(self, api_key: str) -> Optional[str]:
    try:
      if not api_key or api_key == "":
        print("❗️ E2B api key not found")
        return None

      if self.sbx:
          # kill if self has an existing sandbox
          try:
            self.sbx.kill()

          except Exception as e:
            print("🛑 error occured while shutting down existing sandbox: ", e)
            self.sbx = None

      sbx = Sandbox.create(template_alias, api_key=api_key, timeout=timeout, allow_internet_access=allow_internet_access)

      self.sbx = sbx
      info = sbx.get_info()

      host = sbx.get_host(host_port)

      url = f"https://{host}"

      self.sbx_info = {
          "id": info.sandbox_id,
          "host_url": url,
          "created_at": datetime.now()
      }
      print("✅ E2B sandbox started: ", self.sbx_info)

      return info.sandbox_id
    except Exception as e:
      print("🛑 Error occured during sandbox creation: ", e)
      return None

  def terminate_sandbox(self) -> None:
    try:
      if self.sbx:
        self.sbx.kill()
        if self.sbx_info:
          print(f"✅ sandbox termination successful: {self.sbx_info['id']}")
        self.sbx = None
        self.sbx_info = None
      else:
        print("⚠️ No sandbox to terminate")
    except Exception as e:
      sandbox_id = self.sbx_info['id'] if self.sbx_info else "unknown"
      print(f"🛑 error killing sandbox: {sandbox_id}")
      self.sbx = None
      self.sbx_info = None


  