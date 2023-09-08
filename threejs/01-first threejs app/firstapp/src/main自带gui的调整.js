//支持中文


//导入three.js
import * as THREE from 'three';
//导入three.js的控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//导入 lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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
//创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//设置父类线框模式
parentMaterial.wireframe = true;
//创建网格
let parentCube = new THREE.Mesh(geometry, parentMaterial);
const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1;
cube.position.set(3, 0, 0);
//设置立方体的缩放
cube.scale.set(2, 0.5, 0.5);
//绕着x轴旋转
cube.rotation.x = Math.PI / 4;


parentCube.add(cube);
parentCube.position.set(-3, 0, 0);
parentCube.rotation.x = Math.PI / 4;
// parentCube.scale.set(2, 0.5, 0.5);

//将网格加入场景
scene.add(parentCube);


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

// var btn = document.createElement("button");
// btn.innerHTML = "点击全屏";
// btn.style.position = "absolute";
// btn.style.top = "10px";
// btn.style.left = "10px";
// btn.style.zIndex = "999";
// btn.onclick = function () {
//     //全屏
//     // renderer.domElement.requestFullscreen();
//     document.body.requestFullscreen();
//     console.log("全屏");
// }
// document.body.appendChild(btn);

// var exitBtn = document.createElement("button");
// exitBtn.innerHTML = "退出全屏";
// exitBtn.style.position = "absolute";
// exitBtn.style.top = "10px";
// exitBtn.style.left = "100px";
// btn.style.zIndex = "999";
// exitBtn.onclick = function () {
//     //退出全屏
//     document.exitFullscreen();
//     console.log("退出全屏");
// }
// document.body.appendChild(exitBtn);

let eventObj = {    
    Fullscreen: function () {
        //全屏
        // renderer.domElement.requestFullscreen();
        document.body.requestFullscreen();
        console.log("全屏");
    },
    ExitFullscreen: function () {
        //退出全屏
        document.exitFullscreen();
        console.log("退出全屏");
    },
}
//创建GUI
const gui = new GUI();
//添加按钮
// gui.add(eventObj, 'Fullscreen').name("全屏");
// gui.add(eventObj, 'ExitFullscreen').name("退出全屏");
gui.add(eventObj, 'Fullscreen');
gui.add(eventObj, 'ExitFullscreen');
//控制立方体
// gui.add(cube.position, 'x', -5, 5, 0.1).name("立方体x轴位置");
// gui.add(cube.position, 'x').min(-10).max(10).step(1).name("立方体x轴位置");
// gui.add(cube.position, 'y').min(-10).max(10).step(1).name("立方体y轴位置");
// gui.add(cube.position, 'z').min(-10).max(10).step(1).name("立方体z轴位置");

let folder = gui.addFolder("立方体位置");
folder
    .add(cube.position, 'x')
    .min(-10).max(10).step(1)
    .name("立方体x轴位置")
    .onChange(function (value) {
        console.log("立方体x轴位置", value);
    });

folder
    .add(cube.position, 'y')
    .min(-10)
    .max(10)
    .step(1)
    .name("立方体y轴位置")
    .onChange(function (value) {
        console.log("立方体y轴位置", value);
    });
folder
    .add(cube.position, 'z')
    .min(-10)
    .max(10)
    .step(1)
    .name("立方体z轴位置")
    .onFinishChange(function (value) {
        console.log("立方体z轴位置", value);
    });
gui.add(parentMaterial, 'wireframe').name("父类线框模式");

let colorParams = {
    cubeColor: "#00ff00",
};
gui.addColor(colorParams, 'cubeColor').name("立方体颜色").onChange(function (value) {
    console.log("立方体颜色", value);
    cube.material.color.set(value);
});