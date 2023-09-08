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

//纹理加载器
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('./textures/door/color.jpg');
// texture.colorSpace = THREE.sRGBEncoding;
texture.colorSpace = THREE.SRGBColorSpace;
// texture.colorSpace = THREE.LinearSRGBColorSpace;
// texture.colorSpace = THREE.NoColorSpace;

//加载ao纹理
let aoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
//加载透明度贴图
// let alphaTexture = textureLoader.load('./textures/door/height.jpg');
let alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
//加载光照贴图
let lightTexture = textureLoader.load('./textures/door/color.jpg');

//加载高光贴图
let specularTexture = textureLoader.load('./textures/door/metalness.jpg');

//加载粗糙度贴图
let roughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

//rgbeloader 加载hdr贴图
let hdriLoader = new RGBELoader();
hdriLoader.load('./textures/hdr/002.hdr', (envMap)=> {
    //设置球体的环境贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //设置环境贴图
    scene.background = envMap;
    //设置环境贴图
    scene.environment = envMap;
    //设置plane的环境贴图
    //planeMaterial.envMap = envMap;
});

let planeGeometry = new THREE.PlaneGeometry(1, 1);
let planeMaterial = new THREE.MeshBasicMaterial({ 
    //双面渲染
    side: THREE.DoubleSide,
    color: 0xffffff,
    map:texture,
    //允许透明
    transparent: true,
    //设置ao贴图
    aoMap: aoTexture,
    //设置ao贴图强度
    aoMapIntensity: 1,
    //设置alpha贴图
    alphaMap: alphaTexture,
    // //设置光照贴图
    // // lightMap: lightTexture,
    // //设置高光贴图
    // specularMap: specularTexture,
    // //设置粗糙图贴图
    // //roughnessMap: roughnessTexture,
    // //设置反射强度
    // reflectivity: 0.5,
});
// planeMaterial.map = texture;
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

gui
    .add(planeMaterial, 'aoMapIntensity')
    .min(0)
    .max(1)
    .step(0.01)
    .name('aoMapIntersity');
gui
    .add(planeMaterial, 'reflectivity')
    .min(0)
    .max(1)
    .step(0.01)
    .name('reflectivity');
gui.add(texture, 'colorSpace',{
    sRGB: THREE.SRGBColorSpace,
    Linear: THREE.LinearSRGBColorSpace,
}).onChange(()=> {
    texture.needsUpdate = true;
});