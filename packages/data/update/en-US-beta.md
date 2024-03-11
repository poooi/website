## POI v11.0.0 changelog

### Breaking

- Windows 7 is no longer supported due to Electron updates
- Resource Hacking now supports limited resource types, including image and javascript files that related to KanColle login
- Proxy relay mode is removed
- Network retry feature is removed

### Features

- Brand new data fetcher which supports HTTPS protocol
- Add new Equipment icon
- Update game data to match latest game version, including AACI / OASW / Special Attack / Fighter Power Formula / Task type
- Add support of showing detailed fleet info tile on main panel (Thanks to [liu-ziyang](https://github.com/liu-ziyang))
- Add support of new special attack
- [Windows] Supports Windows 11 Arcylic style window (Experimental)

### Changes

- Update to Electron@27(Chromium@118)

### Fixes

- Fix network error page is rendered unexpectly when sub iframe fail to load
- Fix LBAC aircraft banner not displaying correctly
