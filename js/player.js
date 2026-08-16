// js/player.js
function createPlayer(scene) {
    const texture = new THREE.TextureLoader().load('player.png');
    const material = new THREE.SpriteMaterial({ map: texture });
    const player = new THREE.Sprite(material);
    player.scale.set(5, 5, 1);
    player.position.y = 2.5;
    scene.add(player);
    return player;
}

function handleMovement(player, keys) {
    if (keys['KeyW']) player.position.z -= 0.5;
    if (keys['KeyS']) player.position.z += 0.5;
    if (keys['KeyA']) player.position.x -= 0.5;
    if (keys['KeyD']) player.position.x += 0.5;
}
