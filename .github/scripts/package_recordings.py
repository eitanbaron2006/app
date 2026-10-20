#!/usr/bin/env python3
"""Bundle licensed real Mixkit field recordings into Emerald Mahjong HTML.

Uses downloaded sounds, never synthesized audio. Mixkit SFX Free License permits
incorporation in video games. The raw sound files are NOT placed in the source
repository or published separately from the finished game.
https://mixkit.co/license/modal/sfxFree/
"""
from pathlib import Path
import base64
import json
import re
import subprocess
import tempfile

GAME = Path("app/src/main/assets/index.html")
TRACKS = {
    "stream": (3126, "Water flowing ambience loop"),
    "rain": (1253, "Light rain loop"),
    "forest": (1213, "European forest ambience"),
    "night": (1789, "Summer night crickets loop"),
}

def run(*args):
    print("$", " ".join(args), flush=True)
    subprocess.run(args, check=True)

def duration(path):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True, capture_output=True, text=True,
    )
    return float(result.stdout.strip())

sounds = {}
meta = {}
with tempfile.TemporaryDirectory() as temp:
    for name, (asset_id, title) in TRACKS.items():
        url = f"https://assets.mixkit.co/active_storage/sfx/{asset_id}/{asset_id}-preview.mp3"
        original = Path(temp) / f"{name}-original.mp3"
        compact = Path(temp) / f"{name}-game.mp3"
        run("curl", "--fail", "--location", "--retry", "3", "--retry-delay", "2",
            "--connect-timeout", "20", "--max-time", "180", "--user-agent",
            "Mozilla/5.0 (compatible; EmeraldMahjongAudioBuild/1.0)",
            "--output", str(original), url)
        seconds = duration(original)
        if seconds < 20:
            raise ValueError(f"{name} duration is too short ({seconds}s)")
        # Equalize ambience gently without creating/replacing any sounds.
        # The rain channel is intentionally softer and less bright.
        tone = "highpass=f=60,lowpass=f=6600,volume=0.67" if name == "rain" else "highpass=f=55,lowpass=f=9500,volume=0.78"
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(original),
            "-af", tone, "-ar", "32000", "-ac", "2", "-c:a", "libmp3lame",
            "-b:a", "96k", str(compact))
        compact_duration = duration(compact)
        if abs(compact_duration - seconds) > 2:
            raise ValueError(f"Duration changed unexpectedly for {name}")
        sound = compact.read_bytes()
        if not sound.startswith(b"ID3") and sound[:2] not in (b"\\xff\\xfb", b"\\xff\\xf3"):
            raise ValueError(f"Audio file does not appear to be MP3 for {name}")
        sounds[name] = base64.b64encode(sound).decode("ascii")
        meta[name] = {"title": title, "asset_id": asset_id, "seconds": round(seconds, 1),
                      "original_bytes": original.stat().st_size, "game_bytes": len(sound),
                      "source": url}
        print(name, meta[name], flush=True)

html = GAME.read_text(encoding="utf-8")
old = re.compile(r"const AMBIENT_AUDIO=\{[^\n]*\};")
new = "const AMBIENT_AUDIO=" + json.dumps(sounds, separators=(",", ":")) + ";"
html, count = old.subn(lambda _: new, html, count=1)
if count != 1:
    raise RuntimeError("Failed to locate the prior synthesized soundtrack")
html = html.replace("Nature Edition", "Recorded Nature Edition")
html = html.replace("v7 · Nature", "v8 · Real Nature")
html = html.replace('<option value="melody">Classic Melody</option>', "")
html = html.replace(",'melody']", "]")
html = html.replace("ambientGainTarget(){return .28*", "ambientGainTarget(){return .18*")
html = html.replace("Water, rain, breeze and night ambience work offline.",
    "Real nature recordings from Mixkit. All sounds work offline.")
html = html.replace("Classic Melody remains available", "")
# Optional original musical synthesizer is no longer accessible via the Settings menu.
# Game action SFX remain unchanged, as requested.
html = html.replace("</head>", "<!-- Recorded nature ambience licensed from Mixkit Sound Effects Free License: "
    "https://mixkit.co/license/modal/sfxFree/ ; real audio IDs: "
    "3126 stream, 1253 rain, 1213 forest, 1789 night. --></head>", 1)
GAME.write_text(html, encoding="utf-8")
Path("Emerald-Mahjong-v8-Real-Nature.html").write_text(html, encoding="utf-8")
Path("AUDIO_SOURCES.json").write_text(json.dumps(
    {"license": "Mixkit Sound Effects Free License",
     "license_url": "https://mixkit.co/license/modal/sfxFree/",
     "terms": "Bundled only as part of the game, not redistributed as isolated sounds",
     "tracks": meta}, indent=2), encoding="utf-8")
print(f"Final game HTML bytes: {GAME.stat().st_size}", flush=True)
