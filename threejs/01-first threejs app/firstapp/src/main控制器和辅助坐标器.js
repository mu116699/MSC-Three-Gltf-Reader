//导入three.js
import * as THREE from 'three';
//导入three.js的控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
    45, //视角
    window.innerWidth / window.innerHeight,//长宽比
    0.1, //近截面
    1000 //远截面
);

//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
//创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//创建网格
const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1;
cube.position.set(3, 0, 0);


//将网格加入场景
scene.add(cube);

//设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

//添加世界坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5); //参数为轴线长度
scene.add(axesHelper);

//创建控制器
//const controls = new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, document.body);

//设置带有阻尼的旋转
controls.enableDamping = true;
//设置阻尼系数
controls.dampingFactor = 0.05;
//设置自动旋转
// controls.autoRotate = true;

//渲染函数
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    //渲染
    renderer.render(scene, camera);
    //旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
//调用渲染函数
animate();