// js/ui.js
function updateUI(score) {
    // Tạo một thẻ div trên màn hình để hiển thị điểm
    let ui = document.getElementById('score-display');
    if (!ui) {
        ui = document.createElement('div');
        ui.id = 'score-display';
        ui.style.position = 'absolute';
        ui.style.top = '20px';
        ui.style.left = '20px';
        ui.style.color = 'white';
        ui.style.fontSize = '24px';
        ui.style.fontFamily = 'Arial';
        document.body.appendChild(ui);
    }
    ui.innerText = "Tiêu diệt: " + score;
}
