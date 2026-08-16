// js/zombie.js
function spawnZombie(scene) {
    const texture = new THREE.TextureLoader().load('zombie.png');
    const material = new THREE.SpriteMaterial({ map: texture });
    const zombie = new THREE.Sprite(material);
    zombie.scale.set(4, 4, 1);
    zombie.position.set(Math.random()*40-20, 2, Math.random()*40-20);
    scene.add(zombie);
    return zombie;
}

function moveZombies(zombies, player) {
    zombies.forEach(z => {
        // Hướng zombie về phía người chơi
        z.position.x += (player.position.x - z.position.x) * 0.01;
        z.position.z += (player.position.z - z.position.z) * 0.01;
    });
}
