#!/usr/bin/env python3
from pathlib import Path
import urllib.request,base64,json,time
root=Path(__file__).resolve().parents[1]
parts=sorted((root/'journey_chunks').glob('part-*.txt'))
assert len(parts)==21
html=''.join(p.read_text(encoding='utf-8') for p in parts)
assert len(html)>5_130_000 and html.count('const WORLD_MUSIC_AUDIO={};')==1
urls={'egypt':('audio/ogg',['https://opengameart.org/sites/default/files/v312.ogg','https://lpc.opengameart.org/sites/default/files/v312.ogg']),'japan':('audio/mpeg',['https://opengameart.org/sites/default/files/hot_spring_town.mp3','https://lpc.opengameart.org/sites/default/files/hot_spring_town.mp3'])}
music={}
for name,(mime,options) in urls.items():
 raw=None
 for url in options:
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Referer':'https://opengameart.org/'})
   with urllib.request.urlopen(req,timeout=55) as resp:raw=resp.read()
   if len(raw)<60000 or raw[:30].lstrip().startswith(b'<'):raise ValueError('Unexpected response size/type')
   print(name,'downloaded bytes',len(raw),flush=True);break
  except Exception as ex:
   print('Sound fetch failed',name,url,str(ex),flush=True);raw=None
 if not raw:raise RuntimeError('Unable to download CC0 soundtrack for '+name)
 music[name]='data:'+mime+';base64,'+base64.b64encode(raw).decode('ascii')
html=html.replace('const WORLD_MUSIC_AUDIO={};','const WORLD_MUSIC_AUDIO='+json.dumps(music,separators=(',',':'))+';')
assert 'const WORLD_MUSIC_AUDIO={};' not in html
out=root/'app/src/main/assets/index.html'
out.parent.mkdir(parents=True,exist_ok=True);out.write_text(html,encoding='utf-8')
print('OFFLINE GAME AUDIO PACK',out.stat().st_size,flush=True)
