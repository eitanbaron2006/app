# Emerald Mahjong v8 — Authentic Nature Edition

v8 uses four 30-second **real CC0 field recordings** (Gentle Rain, Flowing Stream, Forest Morning and Ocean Waves) from the open-source Ambiently demo. All generated ambient loops and Classic Melody have been removed. Fixed Android WebView fonts, fitted four-slot collection tray, big 6x7 mahjong tiles, original game logic and interactive match effects are preserved.

Build APK and self-contained HTML with GitHub Actions on branch artifact/emerald-mahjong-v8-real-recordings; the action downloads verified audio directly from the pinned Ambiently GitHub revision, embeds those files into a single offline HTML file, and then builds, signs and checks the APK.

The background ambience defaults to 35%, with a quiet overall multiplier, and can be separately muted or adjusted. The independent game-action SFX remain available.

Project package ID `com.emerald.mahjongv8` installs separately from v7 because debug signing keys differ between hosted runners.

See AUDIO_CREDITS.md for original recording authors and URLs. Recording license CC0 1.0; source application's code under MIT.
