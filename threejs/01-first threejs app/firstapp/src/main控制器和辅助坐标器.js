//����three.js
import * as THREE from 'three';
//����three.js�Ŀ�����
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//��������
const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1;
cube.position.set(3, 0, 0);


//��������볡��
scene.add(cube);

//�������λ��
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

//������������Ḩ����
const axesHelper = new THREE.AxesHelper(5); //����Ϊ���߳���
scene.add(axesHelper);

//����������
//const controls = new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, document.body);

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