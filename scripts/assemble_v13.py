#!/usr/bin/env python3
from pathlib import Path
from urllib.request import Request,urlopen
import base64,time
root=Path(__file__).resolve().parents[1]
parts=sorted(x for x in (root/"game_chunks").glob("part-*.txt") if x.name!="part-00.txt")
assert len(parts)==12, f"Expected 12 HTML chunks; found {len(parts)}"
game="".join(x.read_text("utf-8") for x in parts)
assert len(game)>5_000_000 and game.count("const WORLD_MUSIC_AUDIO={};")==1
tracks={
 "egypt":("https://opengameart.org/sites/default/files/v312.ogg","Egyptian meditation music — brandon75689 (CC0)"),
 "japan":("https://opengameart.org/sites/default/files/Jaoan_0.ogg","Jaoan — Tozan (CC0)"),
}
music={}
for key,(url,credit) in tracks.items():
 for attempt in range(4):
  try:
   with urlopen(Request(url,headers={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36","Referer":"https://opengameart.org/"}),timeout=45) as f: raw=f.read()
   if not raw.startswith(b"OggS") or len(raw)<40000:raise ValueError("Invalid/truncated OGG")
   music[key]="data:audio/ogg;base64,"+base64.b64encode(raw).decode()
   print("Downloaded existing CC0 music",key,len(raw),credit,flush=True)
   break
  except Exception as e:
   print("Retry",key,attempt+1,str(e),flush=True)
   if attempt==3:raise
   time.sleep(2**attempt)
game=game.replace("const WORLD_MUSIC_AUDIO={};", "const WORLD_MUSIC_AUDIO={"+",".join(repr(k)+":"+repr(v) for k,v in music.items())+"};")
assert "const WORLD_MUSIC_AUDIO={};" not in game
p=root/"app/src/main/assets/index.html";p.parent.mkdir(parents=True,exist_ok=True);p.write_text(game,encoding="utf-8")
print("Fully offline HTML with existing nature tracks + two CC0 world music recordings:",p.stat().st_size,flush=True)
