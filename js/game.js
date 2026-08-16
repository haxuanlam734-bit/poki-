// Gọi quảng cáo giữa các màn (Interstitial Ad)
function showAd() {
    PokiSDK.commercialBreak().then(() => {
        console.log("Ad finished");
        // Tiếp tục game ở đây
    });
}

function triggerGameOver() {
    // Hiện bảng Game Over
    showAd(); // Gọi quảng cáo khi thua
}
