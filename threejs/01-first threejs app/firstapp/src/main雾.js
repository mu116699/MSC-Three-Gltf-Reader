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

//����һ��������
const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//��������fog
scene.fog = new THREE.Fog(0x9999999, 0.1, 50);
//��������ָ��fog
// scene.fog = new THREE.FogExp2(0x9999999, 0.1);
scene.background = new THREE.Color(0x9999999);