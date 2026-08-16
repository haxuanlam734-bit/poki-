const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 400, vy: 0, grounded: false, width: 30, height: 30 };
let cameraX = 0;
let platforms = [];
let score = 0;

// Khởi tạo Map dài (Địa hình siêu hẹp & thử thách)
function generateMap() {
    for (let i = 0; i < 50; i++) {
        platforms.push({ x: i * 300 + 100, y: 500 - (Math.random() * 200), w: 100, h: 20 });
        if (i % 3 === 0) platforms.push({ x: i * 300 + 250, y: 300, w: 50, h: 20 }); // Tường chắn
    }
}
generateMap();

window.addEventListener("keydown", (e) => { if (e.code === "Space" && player.grounded) { player.vy = -12; player.grounded = false; } });

function update() {
    player.vy += 0.6; // Trọng lực
    player.y += player.vy;
    player.x += 5; // Xe tự chạy

    // Va chạm
    player.grounded = false;
    platforms.forEach(p => {
        if (player.x + player.width > p.x && player.x < p.x + p.w &&
            player.y + player.height > p.y && player.y + player.height < p.y + p.h + 10 && player.vy > 0) {
            player.y = p.y - player.height;
            player.vy = 0;
            player.grounded = true;
        }
    });

    cameraX = player.x - 200;
    score = Math.floor(player.x / 10);
    document.getElementById("score").innerText = score;

    if (player.y > 600) { player.x = 50; player.y = 400; score = 0; } // Reset nếu rơi
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-cameraX, 0);

    // Vẽ nhân vật phong cách Roblox
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = "#000"; ctx.strokeRect(player.x, player.y, player.width, player.height);

    // Vẽ Map
    platforms.forEach(p => {
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(p.x, p.y + p.h - 5, p.w, 5);
    });

    ctx.restore();
    requestAnimationFrame(() => { update(); draw(); });
}
draw();
