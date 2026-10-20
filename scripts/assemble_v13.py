#!/usr/bin/env python3
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parents[1]
parts=sorted((root/"game_v13_chunks").glob("part-*.txt"))
assert len(parts)==12,f"Expected 12 chunks: {len(parts)}"
game="".join(p.read_text(encoding="utf-8") for p in parts)
expected="4808f4b3f6502a75292cc62c51ca39e6e2212c6eecc6e1cd05f0e802ad4eea7c"
actual=hashlib.sha256(game.encode("utf-8")).hexdigest()
assert actual==expected,f"v13 source SHA mismatch: {actual}"
assert "function renderStageMap()" in game and "const WORLD_MUSIC_AUDIO={};" in game
out=root/"app/src/main/assets/index.html"
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(game,encoding="utf-8")
print("Assembled",len(game),"chars, SHA",actual)
