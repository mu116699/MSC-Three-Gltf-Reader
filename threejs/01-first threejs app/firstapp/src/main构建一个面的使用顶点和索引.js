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

// //����������
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// //��������
// //��������
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00,
//     wireframe: true});
// //��������
// const cube = new THREE.Mesh(geometry, material);
// console.log(geometry);
// // // cube.position.x = 1;
// // cube.position.set(3, 0, 0);
// // //���������������
// // cube.scale.set(2, 0.5, 0.5);
// // //����x����ת
// // cube.rotation.x = Math.PI / 4;

// //��������볡��
// scene.add(cube);

//����������
const geometry = new THREE.BufferGeometry();
// //������������,��������˳��ģ�ÿ����Ϊһ�����㣬��ʱ��Ϊ����
// const vertices = new Float32Array([
//     //��һ��������
//     -1.0, -1.0, 0.0, //����1
//     1.0, -1.0, 0.0, //����2
//     1.0, 1.0, 0.0, //����3
//     //�ڶ���������
//     -1.0, -1.0, 0.0, //����4
//     1.0, 1.0, 0.0, //����5
//     -1.0, 1.0, 0.0, //����6
// ]);
// //������������
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//ʹ����������
const vertices = new Float32Array([
    -1.0, -1.0, 0.0, //����1
    1.0, -1.0, 0.0, //����2
    1.0, 1.0, 0.0, //����3
    -1.0, 1.0, 0.0, //����5
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//��������
const indices = new Uint16Array([0,1,2,2,3,0]);
//������������
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

console.log(geometry);
//��������
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    // side: THREE.DoubleSide,
     //wireframe: true 
    });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

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

// let folder = gui.addFolder("������λ��");
// folder
//     .add(cube.position, 'x')
//     .min(-10).max(10).step(1)
//     .name("������x��λ��")
//     .onChange(function (value) {
//         console.log("������x��λ��", value);
//     });

// folder
//     .add(cube.position, 'y')
//     .min(-10)
//     .max(10)
//     .step(1)
//     .name("������y��λ��")
//     .onChange(function (value) {
//         console.log("������y��λ��", value);
//     });
// folder
//     .add(cube.position, 'z')
//     .min(-10)
//     .max(10)
//     .step(1)
//     .name("������z��λ��")
//     .onFinishChange(function (value) {
//         console.log("������z��λ��", value);
//     });
// gui.add(material, 'wireframe').name("�����߿�ģʽ");

// let colorParams = {
//     cubeColor: "#00ff00",
// };
// gui.addColor(colorParams, 'cubeColor').name("��������ɫ").onChange(function (value) {
//     console.log("��������ɫ", value);
//     cube.material.color.set(value);
// });