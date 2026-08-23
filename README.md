# Anime Stick Clash V12 — Concept Match

A complete dependency-free HTML5 Canvas game package.

## Important
The generated VFX concept image is included at `assets/vfx_concept_preview.png` as a reference. The game recreates the *visual language* of that image in realtime with Canvas: dark neon arena, five background orbs, perspective grid, glowing stickman, slash trails, beams, impact rings, particles, damage popups and camera shake.

It is not a literal frame-by-frame bitmap animation. A still image cannot be mathematically identical to a realtime animation on every frame.

## Run
Open `index.html` through a static server. For example:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`

## GitHub Pages
Upload the CONTENTS of this folder to the repository root, not the parent folder.

Root must contain:
- index.html
- style.css
- assets/
- src/

Enable GitHub Pages from Settings > Pages > Deploy from branch > main > /(root).

## Controls
WASD = move
Space = basic attack
Q = Void Cut
E = Phantom Dash
R = Domain
Pause button = pause

## Poki
`src/poki.js` is an adapter placeholder. Do not fake a Poki ad network. When the game is accepted/published, integrate the official Poki SDK according to the publishing instructions and supplied SDK.
