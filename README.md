# Emerald Mahjong v6 – stable Android font sizes

The v6 APK fixes system font-size settings increasing text inside the game: WebView explicitly calls setTextZoom(100), uses fixed browser defaults, and disables automatic text adjustments in the HTML stylesheet. The 6-column/7-row board and four-slot collection tray remain intact.

Build: GitHub Actions on branch artifact/emerald-mahjong-v6-fixed-ui, Android SDK 35, Gradle 8.11.1. Package com.emerald.mahjongv6 installs alongside the older v5 because the previous debug signing key was not retained. The installed game must still be tested on a real Android device.
