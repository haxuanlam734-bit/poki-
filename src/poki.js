// Poki integration point.
// Keep the game playable on GitHub Pages without the SDK.
// When Poki supplies the official SDK for publishing, replace the adapter
// calls with the SDK integration required by their publishing dashboard.
export const Poki={
  async init(){return true},
  gameplayStart(){},
  gameplayStop(){},
  commercialBreak(){return Promise.resolve()},
  happyTime(){}
};
