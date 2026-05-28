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

camera.position.set(0, 0, 7);

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
alpha: true,
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

const canvasContainer =
document.getElementById('iphone-canvas');

canvasContainer.appendChild(
renderer.domElement
);

/* =========================
   LIGHTS
========================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
3
);

scene.add(ambient);

/* BLUE */

const blueLight =
new THREE.PointLight(
0x00d4ff,
20
);

blueLight.position.set(5,5,5);

scene.add(blueLight);

/* PURPLE */

const purpleLight =
new THREE.PointLight(
0x7000ff,
15
);

purpleLight.position.set(-5,-5,5);

scene.add(purpleLight);

/* TOP */

const topLight =
new THREE.PointLight(
0xffffff,
10
);

topLight.position.set(0,5,5);

scene.add(topLight);

/* =========================
   PARTICLES
========================= */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 1000;

const posArray =
new Float32Array(
particlesCount * 3
);

for(let i = 0; i < particlesCount * 3; i++){

posArray[i] =
(Math.random() - 0.5) * 30;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(posArray,3)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.025,
color:0x00d4ff,
transparent:true,
opacity:0.7

});

const particlesMesh =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

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

/* CENTER MODEL */

const box =
new THREE.Box3()
.setFromObject(phone);

const center =
box.getCenter(
new THREE.Vector3()
);

phone.position.sub(center);

/* AUTO SCALE */

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

/* POSITION */

phone.position.x = 2;
phone.position.y = 0;

/* START ROTATION */

phone.rotation.y = -6;

/* MATERIAL BOOST */

phone.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;
child.receiveShadow = true;

if(child.material){

child.material.envMapIntensity = 3;

}

}

});

scene.add(phone);

/* =========================
   INTRO ANIMATION
========================= */

/* گوشی از راست میاد */

gsap.from(phone.position,{

x:10,
duration:2.5,
ease:'power4.out'

});

/* چرخش 360 */

gsap.to(phone.rotation,{

y:Math.PI * 2,

duration:3.5,

ease:'power3.out'

});

/* متن */

gsap.from('.hero-left .iphone-badge',{

x:-100,
opacity:0,
duration:1,
delay:1

});

gsap.from('.hero-left h1',{

x:-150,
opacity:0,
duration:1.5,
delay:1.3

});

gsap.from('.hero-left p',{

x:-120,
opacity:0,
duration:1.5,
delay:1.6

});

gsap.from('.hero-btn',{

y:80,
opacity:0,
duration:1,
delay:2

});

const loaderOverlay = document.getElementById('loader');
if(loaderOverlay){
    loaderOverlay.style.opacity = '0';
    loaderOverlay.style.pointerEvents = 'none';
    setTimeout(()=> loaderOverlay.style.display = 'none', 1000);
}

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
   MOUSE
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
   ANIMATE
========================= */

function animate(){

requestAnimationFrame(animate);

/* PHONE */

if(phone){

phone.rotation.y +=
(
(mouseX * 0.5)
-
phone.rotation.y
+
0.4
)
* 0.03;

phone.rotation.x =
mouseY * 0.15;

/* FLOAT */

phone.position.y =
Math.sin(
Date.now() * 0.0015
) * 0.15;

}

/* PARTICLES */

particlesMesh.rotation.y += 0.0007;

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


gsap.from('.hero-left h1',{

    y:120,
    opacity:0,
    duration:1.5,
    ease:'power4.out'

});

gsap.from('.hero-left p',{

    y:80,
    opacity:0,
    duration:1.5,
    delay:0.2,
    ease:'power4.out'

});

gsap.from('.hero-btn',{

    scale:0.7,
    opacity:0,
    duration:1.2,
    delay:0.5,
    ease:'back.out(1.7)'

});


