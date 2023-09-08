//导入three.js
import * as THREE from 'three';
//导入three.js的控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//导入 lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
//导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//导入glrf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//导入draco加载器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


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
camera.position.z = 80;
camera.position.y = 80;
camera.position.x = 130;
camera.lookAt(130, 70, 130);

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

//加载环境贴图
let rgbeLoade = new RGBELoader();
rgbeLoade.load('./textures/hdr/002.hdr', (envMap)=> {
    //设置球体的环境贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //设置环境贴图
    scene.background = envMap;
    //设置环境贴图
    scene.environment = envMap;
    //设置plane的环境贴图
    //planeMaterial.envMap = envMap;
});
// 创建文本元素用于显示相机坐标
var cameraPositionText = document.createElement('div');
cameraPositionText.style.position = 'absolute';
cameraPositionText.style.top = '10px';
cameraPositionText.style.left = '10px';
document.body.appendChild(cameraPositionText);

//创建场景fog
// scene.fog = new THREE.Fog(0x9999999, 10, 50);
//创建场景指数fog
// scene.fog = new THREE.FogExp2(0x9999999, 0.1);
// scene.background = new THREE.Color(0x9999999);

//实例化加载器gltf
const gltfLoader = new GLTFLoader();
// //加载模型
// gltfLoader.load(
//     //模型路径
//     // './model/Duck.glb',
//     './model/Duck.glb',
//     //加载完成后的回调函数
//     (gltf) => {
//         //console.log(gltf);
//         scene.add(gltf.scene);
//     }
// );

// //实例化加载器draco
// const dracoLoader = new DRACOLoader();
// //设置draco路径
// dracoLoader.setDecoderPath('./draco/');
// //设置draco加载器
// gltfLoader.setDRACOLoader(dracoLoader);

//加载模型
gltfLoader.load(
    //模型路径
    // './model/Duck.glb',
    './model/SourceCityToolkit/AR_Market.glb',
    //加载完成后的回调函数
    (gltf) => {
        console.log(gltf);
        scene.add(gltf.scene);
        //遍历场景中的所有对象
        gltf.scene.traverse(function (child) {
            //打印所有对象的名称
            console.log(child.name);
        });
    }
);

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

//渲染函数
function animate() {
    controls.update();

    // 更新相机位置的屏幕坐标显示
    var cameraPosition = new THREE.Vector3();
    cameraPosition.setFromMatrixPosition(camera.matrixWorld);
    // 更新相机看向的位置的屏幕坐标显示
    var cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    var cameraLookAt = new THREE.Vector3();
    cameraLookAt.copy(camera.position).add(cameraDirection);

    var cameraLookAtScreenPosition = cameraLookAt.clone();
    cameraLookAtScreenPosition.project(camera);

    var x = (cameraLookAtScreenPosition.x + 1) / 2 * window.innerWidth;
    var y = (-cameraLookAtScreenPosition.y + 1) / 2 * window.innerHeight;

    cameraPositionText.innerHTML = 'Camera Position: (' + cameraPosition.x.toFixed(2) + ', ' +
    cameraPosition.y.toFixed(2) + ', ' + cameraPosition.z.toFixed(2) + ')' +
    '<br>Camera Look At: (' + cameraLookAt.x.toFixed(2) + ', ' +
    cameraLookAt.y.toFixed(2) + ', ' + cameraLookAt.z.toFixed(2) + ')'+
    '<br>Camera LookAt Screen Position: (' + x.toFixed(2) + ', ' + y.toFixed(2) + ')';

    requestAnimationFrame(animate);
    //渲染
    renderer.render(scene, camera);
    //旋转
    scene.rotation.y += 0.01;
    // scene.rotation.y += 0.01;
}
//调用渲染函数
animate();



