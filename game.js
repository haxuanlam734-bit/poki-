// Khởi tạo Poki SDK
PokiSDK.init().then(() => {
    console.log("Poki SDK initialized");
    // Báo cáo game đã tải xong
    PokiSDK.gameLoadingFinished();
}).catch(() => {
    console.log("Poki SDK failed to load. Running game anyway.");
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class StickmanFighter {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 100;
        this.color = color;
        this.isTransformed = false;
        this.isAttacking = false;
        this.hp = 100;
        this.velocity = { x: 0, y: 0 };
    }

    draw(ctx) {
        // Vẽ Aura nếu biến hình
        if (this.isTransformed) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x + 20, this.y + 50, 80, 0, Math.PI * 2);
            ctx.fill();
        }

        // Vẽ thân Stickman cơ bản (cần thay bằng hình ảnh Spine/DragonBones sau này)
        ctx.fillStyle = this.isTransformed ? 'gold' : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Vẽ hiệu ứng chiêu thức (Placeholder)
        if (this.isAttacking) {
            ctx.fillStyle = 'cyan';
            ctx.fillRect(this.x + 40, this.y + 20, 60, 20); // Tia năng lượng tĩnh
        }
    }

    transform() {
        this.isTransformed = !this.isTransformed;
        console.log("Super Mode: " + this.isTransformed);
    }

    castSkill(skillName) {
        this.isAttacking = true;
        console.log("Tung chiêu: " + skillName);
        setTimeout(() => this.isAttacking = false, 500); // Tắt hiệu ứng sau 0.5s
    }
}

const player = new StickmanFighter(100, 250, 'white');
const keys = {};

// Bắt sự kiện phím
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    // Nút biến hình
    if (e.key.toLowerCase() === 't') player.transform();
    
    // Nút kỹ năng (Gán với số/chữ)
    if (e.key.toLowerCase() === 'k') player.castSkill("Vô Hạn Không Gian");
    if (e.key.toLowerCase() === 'l') player.castSkill("Kamehameha");
    if (e.key === '1') player.castSkill("Tuyệt chiêu số 1");
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Vòng lặp Game (Game Loop)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Xử lý di chuyển
    if (keys['a']) player.x -= 5;
    if (keys['d']) player.x += 5;

    // Giới hạn màn hình
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;

    player.draw(ctx);
    requestAnimationFrame(animate);
}

// Bắt đầu game
animate();
