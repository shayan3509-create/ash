// ============================================
// main3d.js – انیمیشن سینمایی بشقاب پرنده و آیفون
// نسخهٔ نهایی: رفع ایرادات زمانبندی، حذف پارالاکس موس، استقلال حرکت‌ها
// ============================================

const CONFIG = {
    colors: { beam: '#0088ff', glow: '#00aaff' },
    positions: {
        saucerStart: { x: 4, y: 2, z: -18 },
        saucerFinal: { x: -6.5, y: 4.5, z: 7 },
        phoneUnderSaucer: { x: -6.5, y: 3.0, z: 7 },
        phoneDropY: 0.0,
        phoneCenter: { x: 0, y: 0.0, z: 4.5 },
        phoneReturn: { x: -6.5, y: 0.2, z: 6 }
    },
    scale: { phoneStart: 0.0003, phoneFull: 42 },
    lighting: {
        exposure: 1.6,
        keyIntensity: 60,
        rimIntensity: 15,
        ambient: 0.6
    }
};

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 300);
    }
}

const container = document.getElementById('iphone-canvas');
let scene, camera, renderer, iphoneModel, saucerGroup, beamMesh;
let spotLight, particleSystem, glowMesh, saucerPointLight;
let isDragging = false, prevMouse = { x: 0, y: 0 }, animDone = false;
let animStarted = false;
let velX = 0, velY = 0;
let ufoFloatOffset = 0, phoneFloatOffset = Math.PI;
let raycaster, mouseNDC;

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
    .catch(err => {
        console.error('خطای بارگذاری:', err);
        hideLoader();
    });
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

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const neutralScene = new THREE.Scene();
    neutralScene.background = new THREE.Color(0x808080);
    const envMap = pmremGenerator.fromScene(neutralScene, 0).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, CONFIG.lighting.ambient));
    spotLight = new THREE.SpotLight(0xeef6ff, CONFIG.lighting.keyIntensity);
    spotLight.position.set(0, 10, 15);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 50;
    spotLight.target.position.set(0, 0, 5);
    scene.add(spotLight);
    scene.add(spotLight.target);
    scene.add(new THREE.PointLight(CONFIG.colors.glow, CONFIG.lighting.rimIntensity, 25).translateX(-5).translateY(2).translateZ(10));

    raycaster = new THREE.Raycaster();
    mouseNDC = new THREE.Vector2();

    createSaucer(THREE);
    createBeam(THREE);
    createParticles(THREE);
    loadIPhone(GLTFLoader);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // فقط ذرات به موس واکنش نشان می‌دهند (اختیاری)
    window.addEventListener('mousemove', (e) => {
        if (!particleSystem) return;
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(particleSystem.position, { x: nx * 0.8, y: ny * 0.5, duration: 2, ease: "power1.out" });
    });

    animate();
}

// ========================
// بشقاب پرنده (همان نسخهٔ کوچک)
// ========================
function createSaucer(THREE) {
    saucerGroup = new THREE.Group();

    const bodyGeo = new THREE.CylinderGeometry(2.4, 2.8, 0.5, 64);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: '#1a2a3a', emissive: '#0a1520', emissiveIntensity: 0.4,
        metalness: 0.9, roughness: 0.15
    });
    saucerGroup.add(new THREE.Mesh(bodyGeo, bodyMat));

    const lowerRim = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.13, 16, 64),
        new THREE.MeshStandardMaterial({ color: '#00aaff', emissive: '#004466', emissiveIntensity: 0.8, metalness: 0.7, roughness: 0.3 })
    );
    lowerRim.rotation.x = Math.PI / 2;
    lowerRim.position.y = -0.25;
    saucerGroup.add(lowerRim);

    const upperRim = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.09, 16, 64),
        new THREE.MeshStandardMaterial({ color: '#00ccff', emissive: '#003344', emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 })
    );
    upperRim.rotation.x = Math.PI / 2;
    upperRim.position.y = 0.25;
    saucerGroup.add(upperRim);

    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshPhysicalMaterial({ color: '#0088ff', emissive: '#001122', emissiveIntensity: 0.2, metalness: 0.1, roughness: 0.1, transmission: 0.7, opacity: 0.35, transparent: true })
    );
    dome.position.y = 0.3;
    saucerGroup.add(dome);

    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const light = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00ffaa : 0x00aaff })
        );
        light.position.set(Math.cos(angle) * 2.5, 0.1, Math.sin(angle) * 2.5);
        saucerGroup.add(light);
    }

    const ringLight = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.1, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ringLight.rotation.x = Math.PI / 2;
    ringLight.position.y = -0.3;
    ringLight.name = 'ringLight';
    saucerGroup.add(ringLight);

    saucerPointLight = new THREE.PointLight(0x0088ff, 0, 10);
    saucerPointLight.position.set(0, -0.4, 0);
    saucerGroup.add(saucerPointLight);

    saucerGroup.position.set(CONFIG.positions.saucerStart.x, CONFIG.positions.saucerStart.y, CONFIG.positions.saucerStart.z);
    saucerGroup.scale.set(0.6, 0.6, 0.6);
    scene.add(saucerGroup);
}

// ========================
// پرتو بزرگتر (مستقل)
// ========================
function createBeam(THREE) {
    // بزرگ شدن: شعاع بالا 5.0، شعاع پایین 1.5
    const geo = new THREE.CylinderGeometry(5.0, 1.5, 20, 64, 1, true);
    const canvas = document.createElement('canvas');
    canvas.width = 1; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
    const alphaTexture = new THREE.CanvasTexture(canvas);

    const mat = new THREE.MeshBasicMaterial({
        color: CONFIG.colors.beam,
        transparent: true, opacity: 0,
        alphaMap: alphaTexture,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide, depthWrite: false
    });

    beamMesh = new THREE.Mesh(geo, mat);
    beamMesh.rotation.x = Math.PI;
    beamMesh.position.set(
        CONFIG.positions.saucerStart.x,
        CONFIG.positions.saucerStart.y - 10,
        CONFIG.positions.saucerStart.z
    );
    beamMesh.scale.y = 0.05;
    scene.add(beamMesh);
}

// ========================
// ذرات فضایی
// ========================
function createParticles(THREE) {
    const count = 150;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 40;
        positions[i+1] = (Math.random() - 0.5) * 20;
        positions[i+2] = (Math.random() - 0.5) * 15 - 5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
        color: 0x88ccff, size: 0.08, transparent: true, opacity: 0.4,
        blending: THREE.AdditiveBlending, depthWrite: false
    });
    particleSystem = new THREE.Points(geo, mat);
    scene.add(particleSystem);
}

// ========================
// لود آیفون
// ========================
function loadIPhone(GLTFLoader) {
    new GLTFLoader().load('../../assets/models/iphone15.glb', (gltf) => {
        iphoneModel = gltf.scene;
        iphoneModel.position.set(
            CONFIG.positions.phoneUnderSaucer.x,
            CONFIG.positions.phoneUnderSaucer.y,
            CONFIG.positions.phoneUnderSaucer.z
        );
        iphoneModel.scale.setScalar(CONFIG.scale.phoneStart);
        iphoneModel.rotation.set(0, 0, 0);

        iphoneModel.traverse(child => {
            if (child.isMesh) {
                child.material.envMapIntensity = 1.5;
                child.material.metalness = 0.95;
                child.material.roughness = 0.1;
            }
        });

        const glowGeo = new THREE.SphereGeometry(2.2, 32, 32);
        const glowMat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 }, color: { value: new THREE.Color('#00aaff') } },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform float time;
                uniform vec3 color;
                void main() {
                    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0))), 3.0);
                    float pulse = sin(time * 4.0) * 0.25 + 0.75;
                    gl_FragColor = vec4(color, fresnel * 0.35 * pulse);
                }
            `,
            transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });
        glowMesh = new THREE.Mesh(glowGeo, glowMat);
        glowMesh.visible = false;
        iphoneModel.add(glowMesh);

        scene.add(iphoneModel);
        startSequence();
    }, undefined, (err) => console.error('خطای بارگذاری آیفون:', err));
}

// ========================
// انیمیشن اصلی (رفع مشکل زمانبندی)
// ========================
function startSequence() {
    if (animStarted) return;
    animStarted = true;
    hideLoader();

    if (typeof gsap === 'undefined') {
        saucerGroup.position.set(CONFIG.positions.saucerFinal.x, CONFIG.positions.saucerFinal.y, CONFIG.positions.saucerFinal.z);
        beamMesh.position.set(CONFIG.positions.saucerFinal.x, CONFIG.positions.saucerFinal.y - 10, CONFIG.positions.saucerFinal.z);
        beamMesh.material.opacity = 0.4; beamMesh.scale.y = 1;
        iphoneModel.scale.setScalar(CONFIG.scale.phoneFull);
        iphoneModel.position.set(CONFIG.positions.phoneCenter.x, CONFIG.positions.phoneCenter.y, CONFIG.positions.phoneCenter.z);
        triggerTextReveal();
        animDone = true; enableDrag();
        return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // ۱. ورود بشقاب پرنده
    tl.to(saucerGroup.position, {
        x: CONFIG.positions.saucerFinal.x,
        y: CONFIG.positions.saucerFinal.y,
        z: CONFIG.positions.saucerFinal.z,
        duration: 3.2
    }, 0);
    tl.to(saucerGroup.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 3.2 }, 0);
    tl.to(beamMesh.position, {
        x: CONFIG.positions.saucerFinal.x,
        y: CONFIG.positions.saucerFinal.y - 10,
        z: CONFIG.positions.saucerFinal.z,
        duration: 3.2
    }, 0);

    // ۲. باز شدن کامل پرتو (۰.۷ ثانیه)
    tl.to(beamMesh.material, { opacity: 0.4, duration: 0.7 }, "-=0.6");
    tl.to(beamMesh.scale, { y: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" }, "<");
    tl.to(saucerPointLight, { intensity: 3, duration: 0.7 }, "<");

    // ۳. آیفون بعد از باز شدن کامل پرتو ظاهر می‌شود
    tl.to(iphoneModel.scale, {
        x: CONFIG.scale.phoneFull, y: CONFIG.scale.phoneFull, z: CONFIG.scale.phoneFull,
        duration: 0.8, ease: "back.out(2.5)"
    }, "+=0"); // درست بعد از اتمام باز شدن پرتو

    // ۴. آیفون شروع به افتادن عمودی می‌کند (پرتو همچنان باز است)
    tl.to(iphoneModel.position, {
        y: CONFIG.positions.phoneDropY,
        duration: 0.7,
        ease: "power2.in"
    }, "-=0.1");

    // ۵. پرتو و نور بشقاب خاموش می‌شوند (با تأخیر کوتاه)
    tl.to(beamMesh.material, { opacity: 0, duration: 0.6 }, "+=0.2");
    tl.to(saucerPointLight, { intensity: 0, duration: 0.6 }, "<");

    // ۶. حرکت افقی آیفون به مرکز
    tl.to(iphoneModel.position, {
        x: CONFIG.positions.phoneCenter.x,
        z: CONFIG.positions.phoneCenter.z,
        duration: 1.2,
        ease: "power2.inOut"
    }, "-=0.1");

    // bounce کوچک
    tl.to(iphoneModel.position, {
        y: CONFIG.positions.phoneCenter.y - 0.15,
        duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1
    }, "-=0.1");

    // ۷. نور صحنه قوی‌تر
    tl.to(spotLight, { intensity: 130, duration: 0.8, ease: "power2.out" }, "<");

    // ۸. چرخش آیفون (فقط یک بار)
    tl.to(iphoneModel.rotation, { y: Math.PI * 2, duration: 1.0, ease: "power2.inOut" }, "-=0.3");
    tl.call(() => { if (glowMesh) glowMesh.visible = true; }, [], "-=0.5");

    // ۹. نمایش متن
    tl.call(() => triggerTextReveal(), [], "+=0.1");

    // ۱۰. برگشت آیفون به زیر بشقاب (بدون چرخش)
    tl.to(iphoneModel.position, {
        x: CONFIG.positions.phoneReturn.x,
        y: CONFIG.positions.phoneReturn.y,
        z: CONFIG.positions.phoneReturn.z,
        duration: 1.4,
        ease: "power2.inOut"
    }, "+=0.8");

    tl.to(spotLight, { intensity: CONFIG.lighting.keyIntensity, duration: 1.2, ease: "power2.out" }, "<");
    tl.to(".cinematic-text", { x: 40, duration: 1.4, ease: "power2.inOut" }, "<");

    tl.call(() => {
        animDone = true;
        enableDrag();
    });

    setTimeout(() => initMagneticButton(), 6000);
}

function triggerTextReveal() {
    const textContainer = document.querySelector('.cinematic-text');
    if (!textContainer) return;
    gsap.set(textContainer, { opacity: 1, x: 0, y: 20, scale: 1 });

    const badge = textContainer.querySelector('.badge');
    if (badge) gsap.from(badge, { opacity: 0, y: 20, filter: 'blur(8px)', duration: 0.6, ease: "power2.out" });

    const title = textContainer.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.innerHTML = text.split('').map(c => `<span class="char" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
        gsap.from(title.querySelectorAll('.char'), { opacity: 0, y: 30, rotateX: -90, filter: 'blur(4px)', duration: 0.5, stagger: 0.03, ease: "back.out(1.7)", delay: 0.3 });
    }

    const desc = textContainer.querySelector('.desc');
    if (desc) {
        const words = desc.textContent.split(' ');
        desc.innerHTML = words.map(w => `<span class="word" style="display:inline-block;margin-left:4px">${w}</span>`).join('');
        gsap.from(desc.querySelectorAll('.word'), { opacity: 0, y: 15, filter: 'blur(3px)', duration: 0.4, stagger: 0.04, ease: "power2.out", delay: 0.8 });
    }

    const btn = textContainer.querySelector('.btn-buy');
    if (btn) gsap.from(btn, { opacity: 0, scale: 0.8, filter: 'blur(6px)', duration: 0.6, ease: "back.out(2)", delay: 1.4 });
}

function initMagneticButton() {
    const btn = document.querySelector('.btn-buy');
    if (!btn) return;
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" }));
}

function enableDrag() {
    container.addEventListener('mousedown', (e) => {
        if (!animDone || !iphoneModel) return;
        mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseNDC, camera);
        const intersects = raycaster.intersectObject(iphoneModel, true);
        if (intersects.length > 0) {
            isDragging = true;
            velX = 0; velY = 0;
            prevMouse = { x: e.clientX, y: e.clientY };
            container.classList.add('dragging');
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        container.classList.remove('dragging');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !animDone || !iphoneModel) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        velX = dx * 0.005;
        velY = dy * 0.004;
        iphoneModel.rotation.y += velX;
        iphoneModel.rotation.x += velY;
        iphoneModel.rotation.x = Math.max(-0.5, Math.min(0.5, iphoneModel.rotation.x));
        prevMouse = { x: e.clientX, y: e.clientY };
    });
}

function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.001;

    // شناوری مستقل بشقاب پرنده (بدون تأثیر موس)
    if (saucerGroup && animDone) {
        ufoFloatOffset += 0.008;
        const newY = CONFIG.positions.saucerFinal.y + Math.sin(ufoFloatOffset) * 0.1;
        saucerGroup.position.y = newY;
        if (beamMesh) beamMesh.position.y = newY - 10;

        const ring = saucerGroup.getObjectByName('ringLight');
        if (ring) ring.material.opacity = 0.5 + Math.sin(t * 5) * 0.2;
    }

    // شناوری مستقل آیفون (بدون تأثیر موس)
    if (animDone && iphoneModel && !isDragging) {
        velX *= 0.96; velY *= 0.96;
        iphoneModel.rotation.y += velX;
        iphoneModel.rotation.x += velY;
        const spring = 0.03;
        iphoneModel.rotation.y += (0 - iphoneModel.rotation.y) * spring;
        iphoneModel.rotation.x += (0.1 - iphoneModel.rotation.x) * spring;
        phoneFloatOffset += 0.012;
        const targetY = CONFIG.positions.phoneReturn.y + Math.sin(phoneFloatOffset) * 0.04;
        iphoneModel.position.y += (targetY - iphoneModel.position.y) * 0.05;
    }

    // دوربین دیگر با موس حرکت نمی‌کند (ثابت)
    // حذف: camera.position.x += (targetCamX - camera.position.x) ...

    if (glowMesh && glowMesh.visible && glowMesh.material.uniforms) {
        glowMesh.material.uniforms.time.value = t;
    }

    if (particleSystem) {
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x += 0.0001;
    }

    renderer.render(scene, camera);
}