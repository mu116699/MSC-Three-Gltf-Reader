//֧������


//����three.js
import * as THREE from 'three';
//����three.js�Ŀ�����
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//���� lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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

//����������
const geometry = new THREE.BoxGeometry(1, 1, 1);
//��������
//��������
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//���ø����߿�ģʽ
parentMaterial.wireframe = true;
//��������
let parentCube = new THREE.Mesh(geometry, parentMaterial);
const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1;
cube.position.set(3, 0, 0);
//���������������
cube.scale.set(2, 0.5, 0.5);
//����x����ת
cube.rotation.x = Math.PI / 4;


parentCube.add(cube);
parentCube.position.set(-3, 0, 0);
parentCube.rotation.x = Math.PI / 4;
// parentCube.scale.set(2, 0.5, 0.5);

//��������볡��
scene.add(parentCube);


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

// var btn = document.createElement("button");
// btn.innerHTML = "���ȫ��";
// btn.style.position = "absolute";
// btn.style.top = "10px";
// btn.style.left = "10px";
// btn.style.zIndex = "999";
// btn.onclick = function () {
//     //ȫ��
//     // renderer.domElement.requestFullscreen();
//     document.body.requestFullscreen();
//     console.log("ȫ��");
// }
// document.body.appendChild(btn);

// var exitBtn = document.createElement("button");
// exitBtn.innerHTML = "�˳�ȫ��";
// exitBtn.style.position = "absolute";
// exitBtn.style.top = "10px";
// exitBtn.style.left = "100px";
// btn.style.zIndex = "999";
// exitBtn.onclick = function () {
//     //�˳�ȫ��
//     document.exitFullscreen();
//     console.log("�˳�ȫ��");
// }
// document.body.appendChild(exitBtn);

let eventObj = {    
    Fullscreen: function () {
        //ȫ��
        // renderer.domElement.requestFullscreen();
        document.body.requestFullscreen();
        console.log("ȫ��");
    },
    ExitFullscreen: function () {
        //�˳�ȫ��
        document.exitFullscreen();
        console.log("�˳�ȫ��");
    },
}
//����GUI
const gui = new GUI();
//��Ӱ�ť
// gui.add(eventObj, 'Fullscreen').name("ȫ��");
// gui.add(eventObj, 'ExitFullscreen').name("�˳�ȫ��");
gui.add(eventObj, 'Fullscreen');
gui.add(eventObj, 'ExitFullscreen');
//����������
// gui.add(cube.position, 'x', -5, 5, 0.1).name("������x��λ��");
// gui.add(cube.position, 'x').min(-10).max(10).step(1).name("������x��λ��");
// gui.add(cube.position, 'y').min(-10).max(10).step(1).name("������y��λ��");
// gui.add(cube.position, 'z').min(-10).max(10).step(1).name("������z��λ��");

let folder = gui.addFolder("������λ��");
folder
    .add(cube.position, 'x')
    .min(-10).max(10).step(1)
    .name("������x��λ��")
    .onChange(function (value) {
        console.log("������x��λ��", value);
    });

folder
    .add(cube.position, 'y')
    .min(-10)
    .max(10)
    .step(1)
    .name("������y��λ��")
    .onChange(function (value) {
        console.log("������y��λ��", value);
    });
folder
    .add(cube.position, 'z')
    .min(-10)
    .max(10)
    .step(1)
    .name("������z��λ��")
    .onFinishChange(function (value) {
        console.log("������z��λ��", value);
    });
gui.add(parentMaterial, 'wireframe').name("�����߿�ģʽ");

let colorParams = {
    cubeColor: "#00ff00",
};
gui.addColor(colorParams, 'cubeColor').name("��������ɫ").onChange(function (value) {
    console.log("��������ɫ", value);
    cube.material.color.set(value);
});