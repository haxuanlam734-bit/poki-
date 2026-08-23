STICK WARRIOR: ENERGY CLASH

This is an original browser prototype inspired by fast stick-fighter gameplay.
It intentionally uses original stick characters, animation logic, effects and UI rather than copying the source game's assets or frame-by-frame animation.

Run locally:
  python -m http.server 8000
Then open:
  http://localhost:8000

Controls:
  A/D = move
  W = jump
  J = punch
  K = kick
  L = energy blast
  Space = dash
  R = restart after round
  Q = rewarded-ad test on game-over

Poki:
The HTML includes Poki's official HTML5 SDK script and calls init, gameLoadingFinished, gameplayStart/Stop, commercialBreak and rewardedBreak. Poki controls whether an ad actually appears. Test the build in Poki Inspector before submitting.
