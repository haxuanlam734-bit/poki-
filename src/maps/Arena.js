import { GAME_CONFIG } from "../config.js";

export class Arena {

    constructor(game) {
        this.game = game;

        this.width = 2600;
        this.height = 900;

        this.groundY = 690;

        this.decorations = [];
        this.particles = [];

        this.generate();
    }

    generate() {
        this.decorations.length = 0;
        this.particles.length = 0;
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {

            const p = this.particles[i];

            p.life -= dt;

            p.x += p.vx * dt;
            p.y += p.vy * dt;

            p.vy += 0.002 * dt;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx, camera) {

        ctx.save();

        this.drawBackground(ctx, camera);

        this.drawMidground(ctx, camera);

        this.drawGround(ctx, camera);

        this.drawForeground(ctx, camera);

        ctx.restore();
    }

    drawBackground(ctx, camera) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                GAME_CONFIG.height
            );

        gradient.addColorStop(
            0,
            "#050918"
        );

        gradient.addColorStop(
            1,
            "#111b31"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            GAME_CONFIG.width,
            GAME_CONFIG.height
        );
    }

    drawMidground(ctx, camera) {
        // Map con thể override
    }

    drawGround(ctx, camera) {

        const groundScreenY =
            this.groundY - camera.y;

        ctx.fillStyle = "#101827";

        ctx.fillRect(
            0,
            groundScreenY,
            GAME_CONFIG.width,
            GAME_CONFIG.height
        );

        ctx.strokeStyle =
            "rgba(90,160,255,.35)";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            0,
            groundScreenY
        );

        ctx.lineTo(
            GAME_CONFIG.width,
            groundScreenY
        );

        ctx.stroke();
    }

    drawForeground(ctx, camera) {
        // foreground effect
    }

    createDust(x, y, amount = 8) {

        if (
            this.particles.length >=
            GAME_CONFIG.maxParticles
        ) {
            return;
        }

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            this.particles.push({
                x,
                y,

                vx:
                    (Math.random() - .5)
                    * 4,

                vy:
                    -Math.random()
                    * 3,

                life:
                    250 +
                    Math.random() * 250
            });
        }
    }
}
