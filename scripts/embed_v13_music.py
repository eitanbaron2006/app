#!/usr/bin/env python3
"""Package two already-composed CC0 musical tracks for offline playback."""
from pathlib import Path
from urllib.request import Request,urlopen
import base64,json,time
GAME=Path(__file__).resolve().parents[1]/"app/src/main/assets/index.html"
TRACKS={
  "egypt":("https://opengameart.org/sites/default/files/v312.ogg","audio/ogg"),
  "japan":("https://opengameart.org/sites/default/files/hot_spring_town.mp3","audio/mpeg")
}
data={}
for world,(url,mime) in TRACKS.items():
  body=None
  for attempt in range(4):
    try:
      request=Request(url,headers={"User-Agent":"Mozilla/5.0","Referer":"https://opengameart.org/"})
      with urlopen(request,timeout=90) as response: body=response.read()
      if not 80000 < len(body) < 25000000:raise ValueError("Unexpected audio size")
      if world=="egypt" and not body.startswith(b"OggS"):raise ValueError("Bad OGG magic")
      if world=="japan" and not(body.startswith(b"ID3") or body[0]==255):raise ValueError("Bad MP3 magic")
      break
    except Exception as e:
      print(f"Retry {world} {attempt}: {e}",flush=True)
      if attempt==3:raise
      time.sleep(2+attempt*2)
  data[world]="data:"+mime+";base64,"+base64.b64encode(body).decode("ascii")
  print("Downloaded real CC0",world,len(body),flush=True)
text=GAME.read_text(encoding="utf-8")
anchor="const WORLD_MUSIC_AUDIO={};"
assert text.count(anchor)==1
text=text.replace(anchor,"const WORLD_MUSIC_AUDIO="+json.dumps(data,separators=(",",":"))+";",1)
assert text.count("data:audio/ogg;base64,")==1 and text.count("data:audio/mpeg;base64,")==1
GAME.write_text(text,encoding="utf-8")
print("Music embedded; offline HTML size",GAME.stat().st_size,flush=True)
