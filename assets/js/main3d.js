import * as THREE from './three/three.module.js';
import { GLTFLoader } from './three/GLTFLoader.js';

/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0,0,7);

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({

alpha:true,
antialias:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

document
.getElementById('iphone-canvas')
.appendChild(renderer.domElement);

/* =========================
   LIGHTS
========================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
3
);

scene.add(ambient);

/* BLUE LIGHT */

const blueLight =
new THREE.PointLight(
0x00d4ff,
15
);

blueLight.position.set(
5,
5,
5
);

scene.add(blueLight);

/* PURPLE LIGHT */

const purpleLight =
new THREE.PointLight(
0x7000ff,
12
);

purpleLight.position.set(
-5,
-5,
5
);

scene.add(purpleLight);

/* TOP LIGHT */

const topLight =
new THREE.PointLight(
0xffffff,
8
);

topLight.position.set(
0,
5,
5
);

scene.add(topLight);

/* =========================
   LOAD MODEL
========================= */

const loader =
new GLTFLoader();

let phone;

loader.load(

'../../assets/models/iphone15.glb',

(gltf)=>{

phone = gltf.scene;

/* =========================
   CENTER MODEL
========================= */

const box =
new THREE.Box3()
.setFromObject(phone);

const center =
box.getCenter(
new THREE.Vector3()
);

phone.position.sub(center);

/* =========================
   AUTO SCALE
========================= */

const size =
box.getSize(
new THREE.Vector3()
);

const maxDim =
Math.max(
size.x,
size.y,
size.z
);

const scale =
5 / maxDim;

phone.scale.setScalar(scale);

/* =========================
   POSITION
========================= */

phone.position.x = 1.8;

/* =========================
   ROTATION
========================= */

phone.rotation.y = 2.5;

/* =========================
   SHADOW / MATERIAL BOOST
========================= */

phone.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;
child.receiveShadow = true;

if(child.material){

child.material.envMapIntensity = 2;

}

}

});

scene.add(phone);

},

(xhr)=>{

console.log(

(xhr.loaded / xhr.total * 100)
+ '% loaded'

);

},

(error)=>{

console.error(
'GLB ERROR:',
error
);

}

);

/* =========================
   MOUSE INTERACTION
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener(

'mousemove',

(e)=>{

mouseX =
(e.clientX /
window.innerWidth - 0.5);

mouseY =
(e.clientY /
window.innerHeight - 0.5);

}

);

/* =========================
   ANIMATION
========================= */

function animate(){

requestAnimationFrame(animate);

if(phone){

/* ROTATION */

phone.rotation.y = Math.PI / 9;

phone.rotation.x =
mouseY * 0.15;

/* FLOATING EFFECT */

phone.position.y =
Math.sin(
Date.now() * 0.0015
) * 0.2;

}

/* RENDER */

renderer.render(
scene,
camera
);

}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener(

'resize',

()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}

);

/* =========================
   DEBUG
========================= */

console.log(renderer);
console.log(scene);
console.log(camera);