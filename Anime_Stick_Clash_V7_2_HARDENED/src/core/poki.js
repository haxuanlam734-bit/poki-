export const Poki={
async init(){try{if(window.PokiSDK?.init)await window.PokiSDK.init()}catch(e){console.warn("Poki init unavailable",e)}},
load(){try{window.PokiSDK?.gameLoadingFinished?.()}catch(e){}},
start(){try{window.PokiSDK?.gameplayStart?.()}catch(e){}},
stop(){try{window.PokiSDK?.gameplayStop?.()}catch(e){}},
async ad(){try{if(window.PokiSDK?.commercialBreak)await window.PokiSDK.commercialBreak()}catch(e){}},
async reward(){try{if(!window.PokiSDK?.rewardedBreak)return true;let rewarded=false;await window.PokiSDK.rewardedBreak(()=>rewarded=true);return rewarded}catch(e){return true}}
};