import { useState ,useEffect,Component} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//����three.js
import * as THREE from 'three'
import './App.css'

// function App() {
//   useEffect(() => {
//     //��������
//     const scene = new THREE.Scene();

//     //�������
//     const camera = new THREE.PerspectiveCamera(
//         45, //�ӽ�
//         window.innerWidth / window.innerHeight,//�����
//         0.1, //������
//         1000 //Զ����
//     );

//     //������Ⱦ��
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     //����������
//     const geometry = new THREE.BoxGeometry(1, 1, 1);

//     //��������
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//     //��������
//     const cube = new THREE.Mesh(geometry, material);

//     //��������볡��
//     scene.add(cube);

//     //�������λ��
//     camera.position.z = 5;
//     camera.lookAt(0, 0, 0);

//     //��Ⱦ����
//     function animate() {
//         requestAnimationFrame(animate);
//         //��Ⱦ
//         renderer.render(scene, camera);
//         //��ת
//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.01;
//     }
//     //������Ⱦ����
//     animate();
//   }, [])

class App extends Component {
  render() {
    return<div> </div>
  }
  componentDidMount() {
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

    //��������볡��
    scene.add(cube);

    //�������λ��
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    //��Ⱦ����
    function animate() {
        requestAnimationFrame(animate);
        //��Ⱦ
        renderer.render(scene, camera);
        //��ת
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    //������Ⱦ����
    animate();
  }
}

export default App
