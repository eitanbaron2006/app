#!/usr/bin/env python3
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parents[1]
parts=sorted((root/"game_chunks").glob("part-*.txt"))
assert len(parts)==12, f"expected 12 game source chunks, found {len(parts)}"
game="".join(p.read_text(encoding="utf-8") for p in parts)
assert len(game)>5_000_000
assert "WORLD_BACKGROUND_VARIANTS" in game and "getNatureBuffers()" in game
raw=game.encode("utf-8")
digest=hashlib.sha256(raw).hexdigest()
expected="45e3585138eff1724bd38ff8459abc0a85421a4f7a43684ec2002e83c90c3032"
assert digest==expected, f"Source archive SHA-256 mismatch: {digest}"
output=root/"app/src/main/assets/index.html"
output.parent.mkdir(parents=True,exist_ok=True)
output.write_bytes(raw)
print(f"Verified and embedded playable offline HTML5 game, {len(raw)} bytes SHA-256 {digest}")
