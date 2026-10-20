#!/usr/bin/env python3
"""Offline sound asset builder. Sources are CC0 field recordings, never synthesised."""
from pathlib import Path
from urllib.request import Request,urlopen
import base64,json,subprocess,tempfile,time,shutil
COMMIT="8b99d668e91957d80b66d419fae5cb0dba2be528"
BASE=f"https://raw.githubusercontent.com/abhinandansharma/ambiently/{COMMIT}/demo/public/sounds/"
TRACKS=("rain","stream","forest","ocean")
root=Path(__file__).resolve().parents[1]
tracks={}
for track in TRACKS:
  url=BASE+track+".m4a"
  for attempt in range(4):
    try:
      with urlopen(Request(url,headers={"User-Agent":"EmeraldMahjongSoundInstaller/1.0"}),timeout=60) as response:
        raw=response.read()
      if len(raw)<70000 or raw[4:8]!=b"ftyp":
        raise ValueError(f"Invalid field recording: {track}")
      with tempfile.NamedTemporaryFile(suffix=".m4a") as f:
        f.write(raw); f.flush()
        duration=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nokey=1:noprint_wrappers=1",f.name],text=True).strip()) if shutil.which("ffprobe") else 30.0
        if duration<15:raise ValueError(f"Short recording: {track}")
      tracks[track]=base64.b64encode(raw).decode("ascii")
      print(f"CC0 {track} from {url}: {len(raw)} bytes; {duration:.1f}s")
      break
    except Exception as e:
      if attempt==3:raise
      print("Retry recording download:",e);time.sleep(2**attempt)
template=(root/"scripts/game-v8-template.html").read_text(encoding="utf-8")
assert template.count("__SOUND_LIBRARY__")==1
html=template.replace("__SOUND_LIBRARY__",json.dumps(tracks,separators=(",",":")))
assert "Classic Melody" not in html and "musicTick" not in html and len(html)>1500000
out=root/"app/src/main/assets/index.html"
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(html,encoding="utf-8")
print("Packaged offline with REAL nature recordings:",out,len(html))
