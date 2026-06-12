/* ===========================================================
   Raushan Kumar — Portfolio
   3D: undulating wireframe terrain + fresnel-lit crystal
   Plus: nav, scroll-reveal, card spotlight, active-section.
   =========================================================== */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;
const lowPower = coarse || navigator.hardwareConcurrency <= 4;

/* -----------------------------------------------------------
   Scene
   ----------------------------------------------------------- */
(function scene() {
    const host = document.getElementById('canvas-container');
    if (!host || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(0, 2.2, 16);

    const renderer = new THREE.WebGLRenderer({
        antialias: !lowPower,
        alpha: true,
        powerPreference: 'high-performance',
    });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, lowPower ? 1.5 : 2));
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---- Undulating wireframe terrain ---------------------- */
    const SEG = lowPower ? 40 : 64;
    const terrainGeo = new THREE.PlaneGeometry(60, 60, SEG, SEG);
    terrainGeo.rotateX(-Math.PI / 2);
    const base = terrainGeo.attributes.position.array.slice();

    const terrainMat = new THREE.MeshBasicMaterial({
        color: 0x6d4fc4,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.position.y = -5;
    group.add(terrain);

    /* ---- Central crystal with a fresnel rim shader --------- */
    const crystalGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const crystalMat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uColorA: { value: new THREE.Color(0x8b5cf6) },
            uColorB: { value: new THREE.Color(0x4c1d95) },
            uTime: { value: 0 },
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                vView = normalize(-mv.xyz);
                gl_Position = projectionMatrix * mv;
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vView;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            void main() {
                float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
                vec3 col = mix(uColorB, uColorA, fres);
                gl_FragColor = vec4(col, fres * 0.9 + 0.06);
            }
        `,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 1.5;
    group.add(crystal);

    // Wireframe overlay on the crystal for a faceted edge read
    const crystalEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(crystalGeo, 1),
        new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.4 })
    );
    crystal.add(crystalEdges);

    /* ---- Sparse drifting motes ----------------------------- */
    const MOTES = lowPower ? 60 : 120;
    const mp = new Float32Array(MOTES * 3);
    for (let i = 0; i < MOTES; i++) {
        mp[i * 3]     = (Math.random() - 0.5) * 50;
        mp[i * 3 + 1] = Math.random() * 24 - 4;
        mp[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(mp, 3));
    const moteSprite = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 32;
        const x = c.getContext('2d');
        const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(196,181,253,0.9)');
        g.addColorStop(1, 'rgba(139,92,246,0)');
        x.fillStyle = g; x.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
    })();
    const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
        size: 0.5, map: moteSprite, transparent: true, opacity: 0.55,
        depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    }));
    group.add(motes);

    /* ---- Interaction --------------------------------------- */
    let mx = 0, my = 0, cx = 0, cy = 0, scroll = 0;
    addEventListener('pointermove', (e) => {
        mx = (e.clientX / innerWidth - 0.5);
        my = (e.clientY / innerHeight - 0.5);
    }, { passive: true });
    addEventListener('scroll', () => { scroll = scrollY; }, { passive: true });
    addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });

    /* ---- Loop ---------------------------------------------- */
    const pos = terrainGeo.attributes.position;
    const wave = (t) => {
        for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3];
            const z = base[i * 3 + 2];
            pos.array[i * 3 + 1] =
                Math.sin(x * 0.3 + t) * 0.55 +
                Math.cos(z * 0.4 + t * 0.8) * 0.55 +
                Math.sin((x + z) * 0.18 + t * 0.5) * 0.4;
        }
        pos.needsUpdate = true;
    };

    let raf, t = 0;
    function frame() {
        t += 0.012;
        if (!reduceMotion) wave(t);

        crystal.rotation.y = t * 0.5;
        crystal.rotation.x = Math.sin(t * 0.3) * 0.25;
        crystal.position.y = 1.5 + Math.sin(t * 0.6) * 0.3;
        crystalMat.uniforms.uTime.value = t;

        motes.rotation.y = t * 0.04;

        // eased parallax; scroll pulls the camera back and down
        cx += (mx - cx) * 0.045;
        cy += (my - cy) * 0.045;
        const s = Math.min(scroll / innerHeight, 3);
        camera.position.x = cx * 4;
        camera.position.y = 2.2 - cy * 2 - s * 1.2;
        camera.lookAt(0, 1 - s * 0.5, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    }

    frame();
    if (reduceMotion) cancelAnimationFrame(raf); // single static frame
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else if (!reduceMotion) frame();
    });
})();

/* -----------------------------------------------------------
   Navbar + mobile menu + active-section highlight
   ----------------------------------------------------------- */
(function nav() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const anchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

    const onScroll = () => navbar.classList.toggle('scrolled', scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            toggle.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Scroll-spy
    const sections = anchors
        .map((a) => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    anchors.forEach((a) =>
                        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => spy.observe(s));
    }
})();

/* -----------------------------------------------------------
   Scroll reveal (with stagger via CSS var)
   ----------------------------------------------------------- */
(function reveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('revealed'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('revealed');
            io.unobserve(e.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
})();

/* -----------------------------------------------------------
   Cursor spotlight on cards (skipped on touch / reduced motion)
   ----------------------------------------------------------- */
(function spotlight() {
    if (coarse || reduceMotion) return;
    const cards = document.querySelectorAll('[data-spotlight]');
    cards.forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });
})();
