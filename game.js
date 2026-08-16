const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cat = { x: 150, y: 450, vx: 0, vy: 0, radius: 22, isFlying: false };
let isDragging = false;
let startX = 0, startY = 0;
let cameraX = 0;
let score = 0;

// Tạo danh sách các bệ đỡ (Map trên cao)
let platforms = [
    { x: 50, y: 500, w: 250, h: 30 },
    { x: 350, y: 420, w: 180, h: 25 },
    { x: 600, y: 340, w: 160, h: 25 },
    { x: 850, y: 260, w: 150, h: 25 },
    { x: 1100, y: 200, w: 140, h: 25 },
    { x: 1350, y: 280, w: 160, h: 25 },
    { x: 1650, y: 200, w: 150, h: 25 }
];

// Tạo các chướng ngại vật bay lơ lửng (Mây sấm sét / Chim)
let obstacles = [
    { x: 450, y: 300, w: 40, h: 40, speed: 2, dir: 1 },
    { x: 950, y: 150, w: 40, h: 40, speed: 2.5, dir: -1 },
    { x: 1450, y: 180, w: 40, h: 40, speed: 3, dir: 1 }
];

canvas.addEventListener("mousedown", (e) => {
    if (!cat.isFlying) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
        let dx = startX - e.clientX;
        let dy = startY - e.clientY;
        cat.vx = dx * 0.12;
        cat.vy = dy * 0.12;
        cat.isFlying = true;
        isDragging = false;
    }
});

function update() {
    if (cat.isFlying) {
        cat.vy += 0.35; // Trọng lực
        cat.x += cat.vx;
        cat.y += cat.vy;

        // Camera dịch chuyển mượt theo chú mèo
        cameraX = cat.x - 200;

        // Tính điểm theo khoảng cách tiến về phía trước
        score = Math.floor(cat.x / 10);
        document.getElementById("score").innerText = score;

        // Kiểm tra va chạm với các bệ đỡ (Platform)
        platforms.forEach(p => {
            if (cat.x > p.x && cat.x < p.x + p.w &&
                cat.y + cat.radius >= p.y && cat.y - cat.radius <= p.y + p.h && cat.vy > 0) {
                cat.y = p.y - cat.radius;
                cat.vy = -cat.vy * 0.4; // Độ nẩy nhẹ khi rơi xuống bệ
                cat.vx *= 0.8; // Ma sát
            }
        });

        // Kiểm tra va chạm với chướng ngại vật
        obstacles.forEach(o => {
            o.y += o.speed * o.dir;
            if (o.y < 80 || o.y > 400) o.dir *= -1; // Bay lên xuống

            let distX = cat.x - (o.x + o.w / 2);
            let distY = cat.y - (o.y + o.h / 2);
            let distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < cat.radius + 20) {
                // Đâm phải chướng ngại vật sẽ bị đẩy văng
                cat.vx = -5;
                cat.vy = -8;
            }
        });

        // Rơi xuống vực sâu thì thua
        if (cat.y > 600) {
            triggerGameOver();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Di chuyển màn hình theo camera
    ctx.translate(-cameraX, 0);

    // Vẽ mây nền trang trí phía xa
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(300 + cameraX * 0.2, 150, 60, 0, Math.PI * 2);
    ctx.arc(800 + cameraX * 0.2, 100, 80, 0, Math.PI * 2);
    ctx.arc(1400 + cameraX * 0.2, 130, 70, 0, Math.PI * 2);
    ctx.fill();

    // Vẽ các bệ đỡ (Platform) trên cao
    platforms.forEach(p => {
        let grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
        grad.addColorStop(0, "#34d399");
        grad.addColorStop(1, "#059669");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, [8]);
        ctx.fill();
    });

    // Vẽ chướng ngại vật (Đám mây sấm sét màu hồng/đỏ)
    obstacles.forEach(o => {
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath();
        ctx.roundRect(o.x, o.y, o.w, o.h, [12]);
        ctx.fill();
    });

    // Vẽ chú mèo cam
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.arc(cat.x, cat.y, cat.radius, 0, Math.PI * 2);
    ctx.fill();

    // Mắt mèo ngộ nghĩnh
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cat.x + 6, cat.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(cat.x + 7, cat.y - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function triggerGameOver() {
    cat.isFlying = false;
    document.getElementById("final-score").innerText = score;
    document.getElementById("game-over-screen").classList.remove("hidden");
}

function restartGame() {
    cat.x = 150;
    cat.y = 450;
    cat.vx = 0;
    cat.vy = 0;
    cameraX = 0;
    score = 0;
    document.getElementById("game-over-screen").classList.add("hidden");
}
