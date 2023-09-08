//导入three.js
import * as THREE from 'three';
//导入three.js的控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//导入 lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
//导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

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
//设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

//添加世界坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5); //参数为轴线长度
scene.add(axesHelper);

//创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new OrbitControls(camera, document.body);

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

//重现渲染窗口的大小
//监听窗口变化
window.addEventListener('resize', () =>{
    //更新相机长宽比
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新相机投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器长宽比
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//创建GUI
const gui = new GUI();

//创建一个长方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//创建场景fog
scene.fog = new THREE.Fog(0x9999999, 0.1, 50);
//创建场景指数fog
// scene.fog = new THREE.FogExp2(0x9999999, 0.1);
scene.background = new THREE.Color(0x9999999);