import { Arena } from "./Arena.js";

export class CityArena extends Arena {

    constructor(game) {

        super(game);

        this.name =
            "Ruined City";

        this.skyColor =
            "#101a2c";

        this.buildings = [];

        this.generateCity();
    }

    generateCity() {

        this.buildings.length = 0;

        let x = -100;

        while (x < this.width) {

            const width =
                140 +
                Math.random() * 180;

            const height =
                180 +
                Math.random() * 300;

            this.buildings.push({

                x,

                width,

                height,

                color: [
                    "#17243a",
                    "#1b2940",
                    "#202d42"
                ][
                    Math.floor(
                        Math.random() * 3
                    )
                ]
            });

            x += width + 20;
        }
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
            "#090d1a"
        );

        gradient.addColorStop(
            .55,
            "#15213b"
        );

        gradient.addColorStop(
            1,
            "#2a1d28"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            GAME_CONFIG.width,
            GAME_CONFIG.height
        );

        this.drawMoon(
            ctx,
            camera
        );
    }

    drawMoon(ctx, camera) {

        ctx.save();

        ctx.globalAlpha = .8;

        ctx.shadowBlur = 40;

        ctx.shadowColor =
            "#b8d7ff";

        ctx.fillStyle =
            "#d9e8ff";

        ctx.beginPath();

        ctx.arc(
            1050 - camera.x * .12,
            130 - camera.y * .05,
            65,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

    drawMidground(ctx, camera) {

        for (
            const building
            of this.buildings
        ) {

            const screenX =
                building.x -
                camera.x * .45;

            const screenY =
                this.groundY -
                building.height -
                camera.y;

            ctx.fillStyle =
                building.color;

            ctx.fillRect(
                screenX,
                screenY,
                building.width,
                building.height
            );

            this.drawWindows(
                ctx,
                screenX,
                screenY,
                building.width,
                building.height
            );
        }
    }

    drawWindows(
        ctx,
        x,
        y,
        width,
        height
    ) {

        const rows =
            Math.floor(height / 45);

        const columns =
            Math.floor(width / 35);

        for (
            let row = 0;
            row < rows;
            row++
        ) {

            for (
                let col = 0;
                col < columns;
                col++
            ) {

                if (
                    Math.random() > .25
                ) {
                    continue;
                }

                ctx.fillStyle =
                    "rgba(255,190,80,.35)";

                ctx.fillRect(
                    x + 12 + col * 35,
                    y + 15 + row * 45,
                    8,
                    14
                );
            }
        }
    }

    drawForeground(ctx, camera) {

        const groundY =
            this.groundY -
            camera.y;

        ctx.fillStyle =
            "#090d15";

        ctx.fillRect(
            0,
            groundY,
            GAME_CONFIG.width,
            30
        );

        ctx.strokeStyle =
            "#303b4c";

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(
            0,
            groundY
        );

        ctx.lineTo(
            GAME_CONFIG.width,
            groundY
        );

        ctx.stroke();
    }
}
