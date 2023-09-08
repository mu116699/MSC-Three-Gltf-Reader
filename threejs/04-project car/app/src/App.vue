<template>
  <div class = "home">
    <div class="canvas-container" ref="canvasDom"> </div> 
    <div class="home-content">
      <div class="home-content-title">
        <h1 style="text-align: center;">Decorate Your Car</h1>
      </div> 
      <h2 style="text-align: center;">Select Car Body Material</h2>
      <div class="select" style="text-align: center;">
        <div 
        class="select-item" style="text-align: center;"
        v-for="(item, index) in colors"
        :key="index" 
        @click="selectColor(index)">

          <div 
          class="select-item-color" 
          :style="{backgroundColor: item}">
          
          </div>
        </div>
      </div> 

      <h2 style="text-align: center;">Select ClearCoatRoughness Material</h2>
      <h3 style="text-align: center;">Frosted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glossy</h3>
      <div class="select" style="text-align: center;">
        <div class="select-item1" style="text-align: center;"
        v-for="(item, index) in material"
        :key="index" 
        @click="selectMaterial(index)">
          <div style="text-align: center;" class="select-item-color" 
          :style="{backgroundColor: item.color}"></div>
        </div>
      </div> 

      <div class="introduction">
        <p style="color: red; font-weight: bold;">
        Please note: The above settings are for several major <br> 
        components(wheels, cardetail, door, fender, fender1, <br>
        frame,frame1, frontcar, rearcar, step, trunk, hood, <br>
        glass) for color and their clearcoatRoughness. <br>
        For other components selections, you can click on the <br>
        component to open a popup window for the respective <br>
        attribute modifications.
        <br><br></p>
        <p style="color: green; font-weight: bold;">Model operation: Rotate with left click, <br>zoom with scroll wheel, pan with right click.</p>
      </div>


    </div> 


    <div class="auto-rotation">
      <div class="auto-rotation-title">
        <h1 style="text-align: center;"></h1>
      </div> 
     <div style="display: flex; align-items: center">
      <h2 style="text-align: center;">Aut Rotation:</h2>
      <input type="checkbox" ref="checkbox" name="checkbox" @change="toggleRotation" checked>
      </div>
    </div> 

    <div class="compay-title">
      <div class="compay-title-title">
        <h1 id="special-heading" style="text-align: center; font-size: 36px;">MidSum©</h1>
      </div> 
    </div> 

    <div id="dialog" class="dialog">
      <div class="dialog-content">
        <h2 id="dialog-title"></h2>

        <p style="text-align: center;"><strong>Object Category</strong></p>
        <div class="inline-container1">
          <div class="radio-buttons_metalness">
            <label for="metalness-true">Metal:</label>
            <input type="radio" id="metalness-true" name="metalness" value="true" @click="setMetalnessRadioButtons">
            <label for="metalness-false">Glass:</label>
            <input type="radio" id="metalness-false" name="metalness" value="false" @click="setMetalnessRadioButtons">
            <label for="metalness-default">None</label>
            <input type="radio" id="metalness-default" name="metalness" value="default" checked @click="setMetalnessRadioButtons">
          </div>
        </div>

        <p style="text-align: center;"><strong>General attribute editing</strong></p>
        <div class="inline-container">
          <p >Metalness:</p>
          <input type="range" id="metalness-input" min="0" max="1" step="0.1" placeholder="">
        </div>

        <div class="inline-container">
          <p >Roughness:</p>
          <input type="range" id="roughness-input" min="0" max="1" step="0.1" placeholder="">
        </div>

        <div class="inline-container">
          <p >Clearcoat:</p>
          <input type="range" id="clearcoat-input" min="0" max="1" step="0.1" placeholder="">
        </div>

        <div class="inline-container">
          <p >ClearcoatRoughness:</p>
          <input type="range" id="clearcoatRoughness-input" min="0" max="1" step="0.1" placeholder="">
        </div>
        <div class="color-picker-container">
          <label for="color-picker">Select Color:</label>
          <input type="color" id="color-picker" value="#ff0000">
        </div>

        <p style="text-align: center;"><strong>Glass attribute editing</strong></p>
        <div class="inline-container">
          <p >Transmission:</p>
          <input type="range" id="transmission-input" min="0" max="1" step="0.1" placeholder="">
        </div>
        <div class="inline-container">
          <p>Transparent:</p>
          <div class="radio-buttons">
            <label for="transparent-input"></label>
            <input type="radio" id="transparent-input" name="transparent" value="true" checked>
          </div>
        </div>


        <div class="button-container">
          <button id="ok-button" @click="handleOKClick">OK</button>
          <button id="cancel-button" @click="handleCancelClick">Cancle</button>
        </div>
      </div>
    </div>

    <div class="openfile-title" style="position: absolute; top: 100px; left: 50px;">
    <button class="custom-button" @click="openFile">Open File</button>
    </div>

  </div>
</template>

<script setup>
import *as THREE from 'three'
import {onMounted, ref} from 'vue'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'

let controls;
let canvasDom = ref(null);
//创建场景
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.set(300, 300, 330);
//创建渲染器
const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    //alpha: true
  }
);
renderer.setSize(window.innerWidth, window.innerHeight);

let wheels, cardetail, door, fender, fender1, frame, frame1, frontcar, rearcar, step, trunk, hoodCar, glassCar;
//创建物理材质
const cardetailMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const doorMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const fenderMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const fender1Material = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const frameMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const frame1Material = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const frontcarMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const rearcarMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const stepMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
});
const trunkCarMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.1,
});
const hoodMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const textMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc0c0c0,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const wheelMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  transparent: true,
});


let rotationSpeed = 0.01;
const checkbox = ref(null);
let carbmw;
const render = () => {
  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
  carbmw && (carbmw.rotation.y += rotationSpeed);
};

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

let colors = ["red","blue","green","gray","orange","purple","pink"]
let selectColor = (index) => {
  wheelMaterial.color.set(colors[index]);
  cardetailMaterial.color.set(colors[index]);
  doorMaterial.color.set(colors[index]);
  fenderMaterial.color.set(colors[index]);
  fender1Material.color.set(colors[index]);
  frameMaterial.color.set(colors[index]);
  frame1Material.color.set(colors[index]);
  frontcarMaterial.color.set(colors[index]);
  rearcarMaterial.color.set(colors[index]);
  stepMaterial.color.set(colors[index]);
  trunkCarMaterial.color.set(colors[index]);
  hoodMaterial.color.set(colors[index]);
  //glassMaterial.color.set(colors[index]);
}
let material = [
  {name:"Frosted", color:"red", value:1},
  {name:"Glossy", color:"blue", value:0},
];
let remmberMaterial;
let selectMaterial = (index) => {
  wheelMaterial.clearcoatRoughness = material[index].value;
  cardetailMaterial.clearcoatRoughness = material[index].value;
  doorMaterial.clearcoatRoughness = material[index].value;
  fenderMaterial.clearcoatRoughness = material[index].value;
  fender1Material.clearcoatRoughness = material[index].value;
  frameMaterial.clearcoatRoughness = material[index].value;
  frame1Material.clearcoatRoughness = material[index].value;
  frontcarMaterial.clearcoatRoughness = material[index].value;
  rearcarMaterial.clearcoatRoughness = material[index].value;
  stepMaterial.clearcoatRoughness = material[index].value;
  trunkCarMaterial.clearcoatRoughness = material[index].value;
  hoodMaterial.clearcoatRoughness = material[index].value;
  textMaterial.clearcoatRoughness = material[index].value;
  remmberMaterial = material[index].value;
  console.log(remmberMaterial);
  //glassMaterial.roughness = material[index].value;
}

function fitCameraToObject(object, camera) {
  const boundingBox = new THREE.Box3().setFromObject(object);
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());

  const distance = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  camera.aspect = renderer.domElement.offsetWidth / renderer.domElement.offsetHeight;

  const cameraZ = Math.abs(distance / Math.sin(fov / 2));
  camera.position.copy(center);
  camera.position.z += cameraZ;
  camera.position.x = camera.position.z;
  camera.position.y = camera.position.z;
  

  //const minZ = boundingBox.min.z;
  //const maxZ = boundingBox.max.z;

  //camera.near = cameraZ - maxZ;
  //camera.far = cameraZ - minZ;
  camera.updateProjectionMatrix();

  //if (controls) {
    //controls.target.copy(center);
    //controls.update();
  //}
}

function openFile() {
  console.log('openFile');
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.gltf, .glb'; // 设置文件类型过滤器，仅接受.gltf和.glb文件
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      let element = document.querySelector('.home-content');
      element.style.display = 'none'; // 隐藏元素

      const reader = new FileReader();
      reader.onload = (e) => {
        const filePath = e.target.result;
        console.log(filePath);
        // 处理所选文件，例如上传或显示预览等
        if(carbmw)
        {
            scene.remove(carbmw);
        }

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/gltf');
        loader.setDRACOLoader(dracoLoader);
        loader.load(filePath,
          (gltf) => {
            carbmw = gltf.scene;
            carbmw.position.set(0, 0, 0);
            scene.add(carbmw);
            render();
            fitCameraToObject(carbmw, camera);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  });
  input.click();
}

onMounted(() => {
  checkbox.value.checked = true;
  //console.log(canvasDom.value);
  //把渲染器的dom元素添加到页面中
  canvasDom.value.appendChild(renderer.domElement);
  //初始化渲染器，渲染背景
  renderer.setClearColor("#000");
  scene.background = new THREE.Color("#ccc");  
  scene.environment = new THREE.Color("#ccc"); 
  render();

  //添加网格地面
  const gridHelper = new THREE.GridHelper(10000, 10000);
  //调整单个网格大小
  gridHelper.geometry.scale(50, 50, 50);

  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  //添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  //controls.update();

  //添加汽车模型
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('./draco/gltf');
  loader.setDRACOLoader(dracoLoader);
  loader.load('./model/vw-beetle-cabrio-sport-2013.quads.glb',
    (gltf) => {
      carbmw = gltf.scene;
      carbmw.position.set(0, 0, 0);
      //console.log(carbmw);
      carbmw.traverse((item) => {
        //if (item.isMesh) {
        //  console.log(item.name);
        //}
        //判断是不是轮毂
        if (item.isMesh && (item.name.includes('rimblack')||item.name.includes('rimwhite'))) {
          wheels = item;
          wheels.material = wheelMaterial;
        }
        //判断是不是cardetail
        if (item.isMesh && item.name.includes('cardetail')) {
          cardetail = item;
          cardetail.material = cardetailMaterial;
        }
        //判断是不是车门
        if (item.isMesh && item.name.includes('door')) {
          door = item;
          door.material = doorMaterial;
        }
        //判断是不是车轮罩
        if (item.isMesh && item.name.includes('fender')) {
          fender = item;
          fender.material = fenderMaterial;
        }
        //判断是不是车轮罩
        if (item.isMesh && item.name.includes('fender1')) {
          fender1 = item;
          fender1.material = fender1Material;
        }
        //判断是不是车架
        if (item.isMesh && item.name.includes('frame')) {
          frame = item;
          frame.material = frameMaterial;
        }
        //判断是不是车架
        if (item.isMesh && item.name.includes('frame1')) {
          frame1 = item;
          frame1.material = frame1Material;
        }
        //判断是不是前车灯
        if (item.isMesh && item.name.includes('frontcar')) {
          frontcar = item;
          frontcar.material = frontcarMaterial;
        }
        //判断是不是后车灯
        if (item.isMesh && item.name.includes('rearcar')) {
          rearcar = item;
          rearcar.material = rearcarMaterial;
        }
        //判断是不是踏板
        if (item.isMesh && item.name.includes('step')) {
          step = item;
          step.material = stepMaterial;
        }
        //判断是不是后备箱
        if (item.isMesh && item.name.includes('trunk')) {
          trunk = item;
          trunk.material = trunkCarMaterial;
        }
        //判断是不是引擎盖
        if (item.isMesh && item.name.includes('hood')) {
          hoodCar = item;
          hoodCar.material = hoodMaterial;
        }
        //判断是不是车窗
        if (item.isMesh && item.name.includes('awindow')) {
          glassCar = item;
          glassCar.material = glassMaterial;
        }
        //判断是不是字体
        if (item.isMesh && item.name.includes('text')) {
          item.material = textMaterial;
        }
      });
      scene.add(carbmw);
    },
  );
  //添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 600);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -600);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(600, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-600, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 600, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(300, 600, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(-300, 600, 0);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 600, 300);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(0, 600, -300);
  scene.add(light9);
  document.getElementById('dialog').style.display = 'none';
  document.addEventListener('contextmenu', handleCancelClick)
});


function toggleRotation() {
  if (checkbox.value.checked) {
    rotationSpeed = 0.01;
  } else {
    rotationSpeed = 0;
  }
}

const materialMetal = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const materialGlass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  transparent: true,
});

let metalnessRadioButtons = ["false","false","true"];
let selectObject,oldColor,delSceneClick;
function setMetalnessRadioButtons() {
  metalnessRadioButtons = document.getElementsByName('metalness');
  for (let i = 0; i < metalnessRadioButtons.length; i++) {
    if (metalnessRadioButtons[i].checked) {
      metalnessRadioButtons[i].value = "true";
    } else {
      metalnessRadioButtons[i].value = "false";
    }
  }
  console.log(metalnessRadioButtons);
}
function handleOKClick() {
  console.log('handleOKClick');
  console.log(metalnessRadioButtons);
  // 处理确定按钮的点击事件
  // 在这里可以执行确定按钮的逻辑，如保存数据
  // 获取属性值
  var metalnessInputValue = document.getElementById('metalness-input').value;
  var roughnessInputValue = document.getElementById('roughness-input').value;
  var clearcoatInputValue = document.getElementById('clearcoat-input').value;
  var clearcoatRoughnessInputValue = document.getElementById('clearcoatRoughness-input').value;
  var colorPickerValue = document.getElementById('color-picker').value;
  var transmissionInputValue = document.getElementById('transmission-input').value;
  var transparentValue = document.querySelector('input[name="transparent"]:checked').value;

  // 输出属性值
  console.log("Metalness: " + metalnessInputValue);
  console.log("Roughness: " + roughnessInputValue);
  console.log("Clearcoat: " + clearcoatInputValue);
  console.log("ClearcoatRoughness: " + clearcoatRoughnessInputValue);
  console.log("Color: " + colorPickerValue);
  console.log("Transmission: " + transmissionInputValue);
  console.log("Transparent: " + transparentValue);
  

  //设置焦点的颜色
  if(selectObject)
  {
    selectObject.material.color.set(colorPickerValue);
    if (metalnessRadioButtons[0].checked) {
      materialMetal.color.set(colorPickerValue);
      materialMetal.metalness = metalnessInputValue;
      materialMetal.roughness = roughnessInputValue;
      materialMetal.clearcoat = clearcoatInputValue;
      materialMetal.clearcoatRoughness = clearcoatRoughnessInputValue;

      selectObject.material = materialMetal;
      console.log("metal");
    } 
    else if (metalnessRadioButtons[1].checked) {
      materialGlass.color.set(colorPickerValue);
      materialGlass.transmission = transmissionInputValue;
      materialGlass.transparent = transparentValue;
      materialGlass.roughness = roughnessInputValue;
      materialGlass.metalness = metalnessInputValue;
      selectObject.material = materialGlass;
      console.log("glass");
    } 
    else {
      selectObject.material.color.set(colorPickerValue);
      console.log("none");
    }
  }
  else
  {
    console.log("selectObject is null");
  }
  // 然后隐藏对话框
  document.getElementById('dialog').style.display = 'none';
  event.stopPropagation();
  delSceneClick = false;
  selectObject = null;
}

function handleCancelClick() {
  console.log('handleCancelClick');
  // 处理取消按钮的点击事件
  // 在这里可以执行取消按钮的逻辑，如清空数据
  // 然后隐藏对话框
  //设置焦点的颜色
  if(selectObject)
  {
    console.log(oldColor);
    selectObject.material.color.set(oldColor);
  }
  else
  {
    console.log("selectObject is null");
  }
  document.getElementById('dialog').style.display = 'none';
  event.stopPropagation();
  delSceneClick = false;
  selectObject = null;
}

//创建射线
const raycaster = new THREE.Raycaster();
//创建鼠标向量
const mouse = new THREE.Vector2();
//创建点击事件
window.addEventListener('click', (event) => {
    if(delSceneClick)
    {
      return;
    }
    //console.log(event.clientX, event.clientY);
    //获取鼠标的屏幕坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //console.log(mouse.x, mouse.y);
    //设置射线的起点
    raycaster.setFromCamera(mouse, camera);
    //获取射线的焦点  scene.children
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      if (intersects[0].object.isMesh) {
        console.log(intersects[0].object.name);
        
        // 显示对话框
        //修改对话框的标题
        document.getElementById('dialog-title').innerHTML = intersects[0].object.name;
        document.getElementById('dialog').style.display = 'block';
        oldColor = intersects[0].object.material.color.getHex();
        console.log(oldColor);
        intersects[0].object.material.color.set(0x00ff00);
        console.log(intersects[0].object.material.color);
        selectObject = intersects[0].object;
        delSceneClick = true;

        //设置焦点的颜色
        //intersects[0].object.material.color.set(tagInputValue);
        //console.log(intersects[0].object.material.color);
        //trunkCarMaterial.clearcoatRoughness = remmberMaterial;
        //intersects[0].object.material = trunkCarMaterial;
      }
    }
});

</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.home-content{
  position: fixed;
  top: 0;
  right:10px;
  transform: scale(0.7); /* 根据需要调整缩放比例 */
}
.auto-rotation{
  position: fixed;
  bottom: 10px;
  right:20px;
}
.compay-title{
  position: fixed;
  top: 10px;
  left:20px;
}

#special-heading {
  color: blue; /* 设置字体颜色为蓝色 */
  background: linear-gradient(to right, blue, green); /* 设置背景为水平渐变色 */
  -webkit-background-clip: text; /* 将背景剪辑到文字 */
  -webkit-text-fill-color: transparent; /* 文字透明填充 */
  font-weight: bold; /* 设置字体为粗体 */
}

@keyframes text-glow {
  0% {
    text-shadow: 0 0 0 rgba(255, 0, 0, 0.5); /* 初始阴影：无发光效果 */
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.9); /* 中间阶段：发光效果 */
  }
  100% {
    text-shadow: 0 0 0 rgba(255, 0, 0, 0.5); /* 结束阶段：无发光效果 */
  }
}

#special-heading {
  animation: text-glow 2s ease-in-out infinite; /* 将动画应用于元素 */
}
.select-item-color{
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
}
.select{
  display: flex;
}
.select-item1{
  margin-left: 95px;
  margin-right: 80px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.black-text {
  font-family: "黑体", Arial, sans-serif;
}
.introduction {
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: center;
}

.dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  transform: translate(120, 92%);
  background-color: #ffffff;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dialog-title {
  font-size: 18px;
  margin-top: 0;
}

.dialog-message {
  margin-bottom: 20px;
}

.color-picker-container {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.button-container button {
  margin-left: 10px;
}

.openfile-title {
  position: absolute;

}
.openfile-title .custom-button {
  border-radius: 10px; /* 圆角半径 */
  font-size: 24px; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  color: red; /* 紫色字体颜色 */
  background: linear-gradient(to right, #00ff00, #00ffff, #00ffff,#00ffff,#00ff00); /* 绿蓝绿渐变背景色 */
}
.inline-container {
  display: flex;
  align-items: center;
}
.inline-container1 {
  display: flex;
  justify-content: center;
}
#dialog-message {
  margin-right: 10px;
}
</style>
