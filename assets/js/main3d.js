// ============================================
// main3d.js - نسخه سینمایی: وسط‌چین -> چرخش -> بازگشت به چپ
// ============================================

const CONFIG = {
    colors: { beam: '#0088ff', glow: '#00aaff' },
    timing: { arrival: 3.2, beam: 0.7, emergence: 2.0, textReveal: 1.0 },
    positions: {
        shipStart: { x: 4, y: 1.5, z: -15 },
        shipFinal: { x: -6.5, y: 4.5, z: 7 },   // سفینه سمت چپ-بالا
        phoneCenter: { x: 0, y: 0, z: 6 },      // دقیقاً وسط بنر
        phoneFinal: { x: -6.5, y: 1.5, z: 6 }   // برگشت به زیر سفینه
    },
    scale: { phoneStart: 0.0003, phoneFinal: 150 },
    lighting: {
        exposure: 1.6, keyLightIntensity: 60,
        rimLightIntensity: 15, ambientIntensity: 0.6
    }
};

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 300);
    }
}

const container = document.getElementById('iphone-canvas');
let scene, camera, renderer, iphoneModel, ufoGroup, beamMesh;
let isDragging = false, prevMouse = { x: 0, y: 0 }, animDone = false;
let animStarted = false;

if (!container) {
    hideLoader();
} else {
    Promise.all([
        import('./three/three.module.js'),
        import('./three/GLTFLoader.js')
    ])
    .then(([THREE, { GLTFLoader }]) => {
        window.THREE = THREE; 
        initScene(THREE, GLTFLoader);
    })
    .catch(err => { console.error('Init failed:', err); hideLoader(); });
}

function initScene(THREE, GLTFLoader) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 22);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = CONFIG.lighting.exposure;
    container.appendChild(renderer.domElement);

    // Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const neutralScene = new THREE.Scene();
    neutralScene.background = new THREE.Color(0x808080);
    const envMap = pmremGenerator.fromScene(neutralScene, 0).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();

    // نورپردازی
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, CONFIG.lighting.ambientIntensity));
    const spotLight = new THREE.SpotLight(0xeef6ff, CONFIG.lighting.keyLightIntensity);
    spotLight.position.set(0, 10, 15);
    spotLight.angle = Math.PI / 6; spotLight.penumbra = 0.5;
    spotLight.decay = 2; spotLight.distance = 50;
    spotLight.target.position.set(0, 0, 5);
    scene.add(spotLight); scene.add(spotLight.target);
    scene.add(new THREE.PointLight(CONFIG.colors.glow, CONFIG.lighting.rimLightIntensity, 25).translateX(-5).translateY(2).translateZ(10));

    createUFO(THREE);
    createBeam(THREE);
    loadIPhone(GLTFLoader);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();
}

function createUFO(THREE) {
    ufoGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#1a2a3a', emissive: '#0a1520', emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 });
    ufoGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.8, 0.4, 32), bodyMat));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI*2, 0, Math.PI/2), new THREE.MeshPhysicalMaterial({ color: '#0088ff', transmission: 0.85, opacity: 0.25, transparent: true }));
    dome.position.y = 0.2; ufoGroup.add(dome);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.08, 16, 32), new THREE.MeshBasicMaterial({ color: '#00ffaa' }));
    ring.rotation.x = Math.PI / 2; ufoGroup.add(ring);
    ufoGroup.position.set(CONFIG.positions.shipStart.x, CONFIG.positions.shipStart.y, CONFIG.positions.shipStart.z);
    ufoGroup.scale.set(0.8, 0.8, 0.8);
    scene.add(ufoGroup);
}

function createBeam(THREE) {
    const geo = new THREE.CylinderGeometry(2.2, 0.3, 20, 32, 1, true);
    const mat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.beam, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
    beamMesh = new THREE.Mesh(geo, mat);
    beamMesh.rotation.x = Math.PI; beamMesh.position.y = -10; beamMesh.scale.y = 0.05;
    ufoGroup.add(beamMesh);
}

function loadIPhone(GLTFLoader) {
    new GLTFLoader().load('../../assets/models/iphone15.glb', (gltf) => {
        iphoneModel = gltf.scene;
        iphoneModel.position.set(CONFIG.positions.shipFinal.x, CONFIG.positions.shipFinal.y, CONFIG.positions.shipFinal.z);
        iphoneModel.scale.setScalar(CONFIG.scale.phoneStart);
        iphoneModel.rotation.set(0, 0, 0); // شروع رو به دوربین

        iphoneModel.traverse(child => {
            if (child.isMesh) {
                child.material.envMapIntensity = 1.5;
                child.material.metalness = 0.95; child.material.roughness = 0.1;
            }
        });
        scene.add(iphoneModel);
        startSequence();
    }, undefined, (err) => console.error('iPhone load failed:', err));
}

function startSequence() {
    if (animStarted) return;
    animStarted = true;
    hideLoader();

    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        // 1. سفینه می‌آید و می‌ایستد
        tl.to(ufoGroup.position, { x: -6.5, y: 5.5, z: 7, duration: 3.2 }, 0);
        tl.to(ufoGroup.scale, { x: 2.2, y: 2.2, z: 2.2, duration: 3.2 }, 0);

        // 2. نور سفینه باز می‌شود
        tl.to(beamMesh.material, { opacity: 0.4, duration: 0.7 }, "-=0.6");
        tl.to(beamMesh.scale, { y: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" }, "<");

        // 3. آیفون بزرگ می‌شود (داخل/نزدیک سفینه)
        tl.to(iphoneModel.scale, { x: 38, y: 38, z: 38, duration: 0.9, ease: "back.out(1.4)" }, "-=0.2");

        // ✅ 4. فاز سقوط: آیفون فقط عمودی (Y) از سفینه پایین می‌آید
        tl.to(iphoneModel.position, { y: -1.5, duration: 0.8, ease: "power2.in" }, "-=0.2");

        // ✅ 5. فاز حرکت: آیفون افقی (X/Z) به وسط بنر می‌رود
        tl.to(iphoneModel.position, { x: 0, y: 0.5, z: 6, duration: 1.2, ease: "power3.out" }, "-=0.1");

        // 6. چرخش ۳۶۰ درجه در وسط
        tl.to(iphoneModel.rotation, { y: Math.PI * 2, duration: 0.7, ease: "power2.inOut" }, "-=0.5");

        // ✅ 7. متن واقعاً از پشت آیفون بیرون می‌آید (بازگشت Z به صفر)
        // ✅ 7. متن از پایین (زیر آیفون) ظاهر شده و به جایگاه نهایی می‌آید
        // ✅ 7. متن با تأخیر و از پایین ظاهر می‌شود (حس پشت سر)
        tl.to(".cinematic-text", {
            opacity: 1,
            x: 0,          // حرکت به راست
            y: 20,         // حرکت به بالا (از 80px به 20px)
            scale: 1,      // بزرگ شدن به اندازه واقعی
            duration: 1.0, // زمان کمی طولانی‌تر برای نرم‌تر شدن
            ease: "power2.out"
        }, "-=0.2"); // ✅ شروع دقیقاً وقتی آیفون کمی از مرکز فاصله گرفت

        // ✅ 8. حرکت معکوس: آیفون به چپ، متن به راست
        tl.to(iphoneModel.position, { x: -6.5, y: 1.5, z: 6, duration: 1.5, ease: "power2.inOut" }, "-=0.4");
        tl.to(".cinematic-text", { x: 40, duration: 1.5, ease: "power2.inOut" }, "<");

        // 9. نور خاموش، سفینه بالاتر می‌رود و ثابت می‌ماند
        tl.to(beamMesh.material, { opacity: 0, duration: 0.8 }, "-=0.8");
        tl.to(ufoGroup.position, { y: 6.8, duration: 1.5 }, "<");

        tl.call(() => { animDone = true; enableDrag(); });
    } else {
        // فال‌بک
        ufoGroup.position.set(-6.5, 5.5, 7); ufoGroup.scale.set(2.2, 2.2, 2.2);
        beamMesh.material.opacity = 0.4; beamMesh.scale.y = 1;
        iphoneModel.scale.setScalar(38); iphoneModel.position.set(-6.5, 1.5, 6);
        document.querySelector('.cinematic-text').style.opacity = 1;
        animDone = true; enableDrag();
    }
}
function enableDrag() {
    container.addEventListener('mousedown', e => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
        container.classList.add('dragging');
    });
    window.addEventListener('mouseup', () => { isDragging = false; container.classList.remove('dragging'); });
    window.addEventListener('mousemove', e => {
        if (!isDragging || !animDone || !iphoneModel) return;
        const dx = e.clientX - prevMouse.x, dy = e.clientY - prevMouse.y;
        iphoneModel.rotation.y += dx * 0.005;
        iphoneModel.rotation.x += dy * 0.004;
        iphoneModel.rotation.x = Math.max(-0.5, Math.min(0.5, iphoneModel.rotation.x));
        prevMouse = { x: e.clientX, y: e.clientY };
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (ufoGroup) {
        ufoGroup.rotation.y += 0.003;
        ufoGroup.position.y += Math.sin(Date.now() * 0.001) * 0.002;
    }
    if (animDone && iphoneModel && !isDragging) {
        iphoneModel.rotation.y += 0.001;
        iphoneModel.position.y = CONFIG.positions.phoneFinal.y + Math.sin(Date.now() * 0.001) * 0.03;
    }
    renderer.render(scene, camera);
}