import * as THREE from './three/three.module.js';
import { GLTFLoader } from './three/GLTFLoader.js';

/* =========================
   SCENE
========================= */
const scene = new THREE.Scene();

/* =========================
   CAMERA
========================= */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,7);

/* =========================
   RENDERER
========================= */
const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('iphone-canvas').appendChild(renderer.domElement);

/* =========================
   LIGHTS
========================= */
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const blueLight = new THREE.PointLight(0x00d4ff, 15);
blueLight.position.set(5,5,5);
scene.add(blueLight);

const purpleLight = new THREE.PointLight(0x7000ff, 12);
purpleLight.position.set(-5,-5,5);
scene.add(purpleLight);

const topLight = new THREE.PointLight(0xffffff, 8);
topLight.position.set(0,5,5);
scene.add(topLight);

/* =========================
   LOAD MODEL
========================= */
const loader = new GLTFLoader();
let phone;
loader.load('../models/iphone15.glb', (gltf) => {
    phone = gltf.scene;
    const box = new THREE.Box3().setFromObject(phone);
    const center = box.getCenter(new THREE.Vector3());
    phone.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x,size.y,size.z);
    const scale = 3 / maxDim;
    phone.scale.setScalar(scale);
    phone.position.x = 1.8;
    phone.rotation.y = -Math.PI / 2;
    phone.traverse((child)=>{if(child.isMesh){child.castShadow=true;child.receiveShadow=true;if(child.material)child.material.envMapIntensity=2;}});
    scene.add(phone);

    // Intro animation cinematic with GSAP
    gsap.from(phone.position,{x:10,duration:2.5,ease:'power4.out'});
    gsap.to(phone.rotation,{y:phone.rotation.y+Math.PI*2,duration:3,ease:'power3.out',delay:0.5});
    gsap.from('.hero-left h1',{y:100,opacity:0,duration:1.5,delay:1.5});
    gsap.from('.hero-left p',{y:50,opacity:0,duration:1.5,delay:1.8});
});

/* =========================
   PARTICLES BACKGROUND
========================= */
const particlesCount = 400;
const particlesGeometry = new THREE.BufferGeometry();
const particlesPositions = new Float32Array(particlesCount*3);
for(let i=0;i<particlesCount*3;i++){
    particlesPositions[i] = (Math.random()-0.5)*20;
}
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(particlesPositions,3));
const particlesMaterial = new THREE.PointsMaterial({color:0x00d4ff,size:0.08,transparent:true,opacity:0.7});
const particles = new THREE.Points(particlesGeometry,particlesMaterial);
scene.add(particles);

/* =========================
   MOUSE INTERACTION
========================= */
let mouseX=0, mouseY=0;
document.addEventListener('mousemove',(e)=>{mouseX=(e.clientX/window.innerWidth-0.5);mouseY=(e.clientY/window.innerHeight-0.5);});

/* =========================
   ANIMATION LOOP
========================= */
function animate(){
    requestAnimationFrame(animate);

    if(phone){
        phone.rotation.y += 0.002 + mouseX*0.01;
        phone.rotation.x = mouseY*0.1;
        phone.position.y = Math.sin(Date.now()*0.0015)*0.2;
    }

    particles.rotation.y += 0.0005;

    renderer.render(scene,camera);
}
animate();

/* =========================
   RESIZE
========================= */
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});

/* =========================
   LOADER SCREEN
========================= */
const progress = document.querySelector('.loader-progress');
let load = 0;
const fakeLoad = setInterval(()=>{
    load += 5;
    progress.style.width = load+'%';
    if(load>=100){
        clearInterval(fakeLoad);
        setTimeout(()=>{
            document.getElementById('loader').style.opacity='0';
            setTimeout(()=>{
                document.getElementById('loader').style.display='none';
                introAnimation();
            },1000);
        },500);
    }
},80);

/* =========================
   INTRO ANIMATION
========================= */
function introAnimation(){
    if(phone){
        phone.scale.setScalar(0);
        phone.rotation.y=-6;
        gsap.to(phone.scale,{x:1,y:1,z:1,duration:2,ease:'power4.out'});
        gsap.to(phone.rotation,{y:Math.PI*2,duration:3,ease:'power3.out'});
    }
    gsap.from('.hero-left h1',{y:100,opacity:0,duration:1.5,delay:1.5});
    gsap.from('.hero-left p',{y:50,opacity:0,duration:1.5,delay:1.8});
}