# Anime Stick Clash V7.1 FIXED

GitHub-ready static web game. Important: upload the CONTENTS of this folder to the repository root so index.html, assets/ and src/ are at the same level.

Run locally: `python -m http.server 8000` then open `http://localhost:8000`.

V7.1 fixes the white-screen crash caused by the old saved `kai` fighter ID after the concept roster was renamed. It now safely migrates to `void`.


## GitHub Pages
Upload the CONTENTS of this folder to the repository root (not the outer ZIP/folder).
Required:
- index.html
- assets/splash.png
- src/...

Then enable Settings -> Pages -> Deploy from branch -> main -> / (root).
