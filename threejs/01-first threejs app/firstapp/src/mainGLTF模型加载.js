//����three.js
import * as THREE from 'three';
//����three.js�Ŀ�����
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//���� lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
//����hdr������
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//����glrf������
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//����draco������
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


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
camera.position.z = 80;
camera.position.y = 80;
camera.position.x = 130;
camera.lookAt(130, 70, 130);

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

//���ػ�����ͼ
let rgbeLoade = new RGBELoader();
rgbeLoade.load('./textures/hdr/002.hdr', (envMap)=> {
    //��������Ļ�����ͼ
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //���û�����ͼ
    scene.background = envMap;
    //���û�����ͼ
    scene.environment = envMap;
    //����plane�Ļ�����ͼ
    //planeMaterial.envMap = envMap;
});
// �����ı�Ԫ��������ʾ�������
var cameraPositionText = document.createElement('div');
cameraPositionText.style.position = 'absolute';
cameraPositionText.style.top = '10px';
cameraPositionText.style.left = '10px';
document.body.appendChild(cameraPositionText);

//��������fog
// scene.fog = new THREE.Fog(0x9999999, 10, 50);
//��������ָ��fog
// scene.fog = new THREE.FogExp2(0x9999999, 0.1);
// scene.background = new THREE.Color(0x9999999);

//ʵ����������gltf
const gltfLoader = new GLTFLoader();
// //����ģ��
// gltfLoader.load(
//     //ģ��·��
//     // './model/Duck.glb',
//     './model/Duck.glb',
//     //������ɺ�Ļص�����
//     (gltf) => {
//         //console.log(gltf);
//         scene.add(gltf.scene);
//     }
// );

// //ʵ����������draco
// const dracoLoader = new DRACOLoader();
// //����draco·��
// dracoLoader.setDecoderPath('./draco/');
// //����draco������
// gltfLoader.setDRACOLoader(dracoLoader);

//����ģ��
gltfLoader.load(
    //ģ��·��
    // './model/Duck.glb',
    './model/SourceCityToolkit/AR_Market.glb',
    //������ɺ�Ļص�����
    (gltf) => {
        console.log(gltf);
        scene.add(gltf.scene);
        //���������е����ж���
        gltf.scene.traverse(function (child) {
            //��ӡ���ж��������
            console.log(child.name);
        });
    }
);

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

//��Ⱦ����
function animate() {
    controls.update();

    // �������λ�õ���Ļ������ʾ
    var cameraPosition = new THREE.Vector3();
    cameraPosition.setFromMatrixPosition(camera.matrixWorld);
    // ������������λ�õ���Ļ������ʾ
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
    //��Ⱦ
    renderer.render(scene, camera);
    //��ת
    scene.rotation.y += 0.01;
    // scene.rotation.y += 0.01;
}
//������Ⱦ����
animate();



