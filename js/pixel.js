function pixel_onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pixel_render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var stats;

function pixel_initStats() {
    // stats = new Stats();
    // document.body.appendChild(stats.dom);
}

var controls;

function pixel_initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.1;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;
    //设置相机距离原点的最远距离
    controls.minDistance = 20;
    //设置相机距离原点的最远距离
    controls.maxDistance = 10000;
    //是否开启右键拖拽
    controls.enablePan = false;
    //
    controls.rotateSpeed = 0.01;
    //
    controls.panSpeed = 0.01;
}
var gui;

function pixel_initGui() {}
var renderer;

function pixel_initRender() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xffffff)); //设置背景颜色
    renderer.setSize(window.innerWidth, window.innerHeight);
    // var tmp = document.getElementsByClassName('pixel')[0];
    // tmp.appendChild(renderer.domElement);
    var t = $(renderer.domElement).replaceAll(document.getElementById('main_page'));
    $(t).attr("id", "main_page");


}
var camera;

function pixel_initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, -100, 400);
    // camera.lookAt(new THREE.Vector3(100, 100, 0));
    camera.lookAt(scene.position);

}
var scene;

function pixel_initScene() {
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('../src/skybox2/');
    //六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
    var cubeTexture = cubeTextureLoader.load([
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'

    ]);
    scene = new THREE.Scene();
    scene.background = cubeTexture;
    //***create***//
    PicParticles();
    // scene = new THREE.Scene();

}

var light;

function pixel_initLight() {
    // scene.add(new THREE.AmbientLight(0x404040));
    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(1, 1, 1);
    // scene.add(light);
}

function pixel_initModel() {
    //轴辅助 （每一个轴的长度）
    // var object = new THREE.AxesHelper(500);
    //scene.add(object);
}

function pixel_render() {
    renderer.render(scene, camera);

}
var stopAnimation;

function pixel_animate() {

    controls.update();
    pixel_render();
    // stats.update();

    stopAnimation = requestAnimationFrame(pixel_animate);

}

function pixel_draw() {
    pixel_initRender();

    pixel_initScene();

    pixel_initCamera();

    pixel_initLight();

    pixel_initModel();

    pixel_initControls();

    pixel_initStats();

    pixel_initGui();

    pixel_animate();


}
var imgDate;

function PicParticles() {

    canvas = document.createElement('canvas');
    // canvas = document.getElementById('pixel');
    content = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    // document.body.appendChild(canvas);
    img = new Image();
    img.crossOrigin = '';
    img.src = "../src/111.jpg";

    canvas.style.position = 'absolute';

    img.onload = function() {
        content.drawImage(img, 0, 0,
            canvas.width, canvas.height);
        imgDate = content.getImageData(0, 0, canvas.width, canvas.height);
        pixel_createParticles(); //创建点
    };



}

function pixel_createParticles() { //创建点
    var particles = canvas.width * canvas.height;
    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);
    for (var i = 0; i < positions.length; i++) {
        // positions
        positions[3 * i] = -150 + parseInt(i % canvas.width);
        positions[3 * i + 1] = 200 + parseInt((canvas.height - i) / canvas.width);
        positions[3 * i + 2] = 0;
        // colors

        colors[3 * i] = imgDate.data[4 * i] / 255.0;
        colors[3 * i + 1] = imgDate.data[4 * i + 1] / 255.0;
        colors[3 * i + 2] = imgDate.data[4 * i + 2] / 255.0;
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.PointsMaterial({ size: 1, vertexColors: THREE.VertexColors });
    var points = new THREE.Points(geometry, material);
    scene.add(points);

    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
}


window.onresize = function() {
    // skybox_onWindowResize();

    pixel_onWindowResize();
}