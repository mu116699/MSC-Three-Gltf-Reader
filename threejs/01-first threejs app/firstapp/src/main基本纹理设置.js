//����three.js
import * as THREE from 'three';
//����three.js�Ŀ�����
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//���� lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
//����hdr������
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

//��������
const scene = new THREE.Scene();

//�������
const camera = new THREE.PerspectiveCamera(
    45, //�ӽ�
    window.innerWidth / window.innerHeight,//�����
    0.1, //������
    1000 //Զ����
);

//������Ⱦ��
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//�������λ��
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

//������������Ḩ����
const axesHelper = new THREE.AxesHelper(5); //����Ϊ���߳���
scene.add(axesHelper);

//����������
const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new OrbitControls(camera, document.body);

//���ô����������ת
controls.enableDamping = true;
//��������ϵ��
controls.dampingFactor = 0.05;
//�����Զ���ת
// controls.autoRotate = true;

//��Ⱦ����
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    //��Ⱦ
    renderer.render(scene, camera);
    //��ת
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
//������Ⱦ����
animate();

//������Ⱦ���ڵĴ�С
//�������ڱ仯
window.addEventListener('resize', () =>{
    //������������
    camera.aspect = window.innerWidth / window.innerHeight;
    //�������ͶӰ����
    camera.updateProjectionMatrix();
    //������Ⱦ�������
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//����GUI
const gui = new GUI();

//���������
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('./textures/door/color.jpg');
// texture.colorSpace = THREE.sRGBEncoding;
texture.colorSpace = THREE.SRGBColorSpace;
// texture.colorSpace = THREE.LinearSRGBColorSpace;
// texture.colorSpace = THREE.NoColorSpace;

//����ao����
let aoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
//����͸������ͼ
// let alphaTexture = textureLoader.load('./textures/door/height.jpg');
let alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
//���ع�����ͼ
let lightTexture = textureLoader.load('./textures/door/color.jpg');

//���ظ߹���ͼ
let specularTexture = textureLoader.load('./textures/door/metalness.jpg');

//���شֲڶ���ͼ
let roughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

//rgbeloader ����hdr��ͼ
let hdriLoader = new RGBELoader();
hdriLoader.load('./textures/hdr/002.hdr', (envMap)=> {
    //��������Ļ�����ͼ
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //���û�����ͼ
    scene.background = envMap;
    //���û�����ͼ
    scene.environment = envMap;
    //����plane�Ļ�����ͼ
    //planeMaterial.envMap = envMap;
});

let planeGeometry = new THREE.PlaneGeometry(1, 1);
let planeMaterial = new THREE.MeshBasicMaterial({ 
    //˫����Ⱦ
    side: THREE.DoubleSide,
    color: 0xffffff,
    map:texture,
    //����͸��
    transparent: true,
    //����ao��ͼ
    aoMap: aoTexture,
    //����ao��ͼǿ��
    aoMapIntensity: 1,
    //����alpha��ͼ
    alphaMap: alphaTexture,
    // //���ù�����ͼ
    // // lightMap: lightTexture,
    // //���ø߹���ͼ
    // specularMap: specularTexture,
    // //���ôֲ�ͼ��ͼ
    // //roughnessMap: roughnessTexture,
    // //���÷���ǿ��
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