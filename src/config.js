export const GAME_CONFIG = {
    width: 1280,
    height: 720,

    maxDPR: 1.75,

    targetFPS: 60,

    fixedStep: 1000 / 60,

    maxFrameDelta: 100,

    maxParticles: 700,

    maxProjectiles: 80,

    maxEffects: 80,

    arena: {
        groundRatio: 0.76,

        leftLimit: 60,

        rightLimit: 60
    },

    physics: {
        gravity: 0.58,

        friction: 0.82,

        maxFallSpeed: 18
    },

    combat: {
        basicDamage: 32,

        comboTimeout: 1000,

        invulnerabilityAfterHit: 80
    },

    colors: {
        background: "#050812",

        white: "#ffffff",

        energy: "#55bfff",

        danger: "#ff4568",

        gold: "#ffd75c",

        purple: "#bd63ff"
    }
};
