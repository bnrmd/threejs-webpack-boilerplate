import Config from './data/config';
import Main from './app/main';

let app;

function init() {
    const container = document.getElementById('appContainer');
    app = new Main(container);
}

function animate() {
    requestAnimationFrame(animate);
    app.renderer.render(app.scene, app.camera);
    app.cube.rotation.x += 0.01;
    app.cube.rotation.y += 0.03;
}

init();

animate();
