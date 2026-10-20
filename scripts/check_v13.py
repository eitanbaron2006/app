#!/usr/bin/env python3
from pathlib import Path
import re,subprocess
s=Path("app/src/main/assets/index.html").read_text(encoding="utf-8")
for marker in ("function renderStageMap()","function collect(id)","function finishGesture(e,cancel=false)","data:audio/mpeg;base64,","data:audio/ogg;base64,","function startWorldMusic()"):assert marker in s,marker
m=re.search(r'<script>(.*)</script>\s*</body>',s,re.S)
assert m,"Game JS script missing"
Path("/tmp/emerald-v13.js").write_text(m.group(1),encoding="utf-8")
subprocess.run(["node","--check","/tmp/emerald-v13.js"],check=True)
print("Offline HTML and JS syntax verified")
