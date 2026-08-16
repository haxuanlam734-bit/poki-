// js/gun.js
function createGun() {
    const loader = new THREE.TextureLoader();
    const gunTexture = loader.load('gun.png'); // Đảm bảo file gun.png nằm ngoài thư mục gốc
    const material = new THREE.SpriteMaterial({ map: gunTexture });
    const gun = new THREE.Sprite(material);
    
    gun.scale.set(1.5, 1.5, 1); // Kích thước súng
    gun.position.set(0.8, -0.2, 0.5); // Vị trí cầm trên tay nhân vật
    return gun;
}

function updateGunRotation(gun, mouse) {
    // Súng xoay theo vị trí chuột trên màn hình
    gun.rotation.z = Math.atan2(mouse.y, mouse.x);
}
