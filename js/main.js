// Three.js Scene Setup - Matrix Style
let scene, camera, renderer, particles, matrixRain;

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 200, 500);

    // Camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create Matrix rain effect
    createMatrixRain();

    // Create particles
    createParticles();

    // Create floating Matrix code objects
    createFloatingObjects();

    // Lighting - Matrix green glow
    const ambientLight = new THREE.AmbientLight(0x00ff00, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff00, 1);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Handle resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

function createMatrixRain() {
    // Create canvas for Matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);

    // Draw Matrix characters
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 12px monospace';
    for (let i = 0; i < 20; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, Math.random() * 200, Math.random() * 200);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        emissive: 0x00ff00,
        emissiveIntensity: 0.3
    });

    matrixRain = new THREE.Mesh(geometry, material);
    matrixRain.position.z = -50;
    scene.add(matrixRain);
}

function createParticles() {
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;      // x
        positions[i + 1] = (Math.random() - 0.5) * 200;  // y
        positions[i + 2] = (Math.random() - 0.5) * 200;  // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00ff00,
        size: 1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createFloatingObjects() {
    // Create rotating Matrix code cubes
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            metalness: 0.6,
            roughness: 0.3,
            emissive: 0x00ff00,
            emissiveIntensity: 0.3,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
        };
        scene.add(cube);
    }

    // Create rotating Matrix spheres
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.IcosahedronGeometry(2, 4);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x00ff00,
            emissiveIntensity: 0.4,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
        );
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.008,
            z: (Math.random() - 0.5) * 0.008,
        };
        scene.add(sphere);
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
    }

    // Animate Matrix rain
    if (matrixRain) {
        matrixRain.rotation.z += 0.0005;
        matrixRain.position.y = Math.sin(Date.now() * 0.0005) * 10;
    }

    // Rotate floating objects
    scene.children.forEach((child) => {
        if (child.userData.rotationSpeed) {
            child.rotation.x += child.userData.rotationSpeed.x;
            child.rotation.y += child.userData.rotationSpeed.y;
            child.rotation.z += child.userData.rotationSpeed.z;
        }
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Navigation and smooth scrolling
function navigateTo(section) {
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll event listener for parallax and animations
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();

    // Observe cards for animation
    const cards = document.querySelectorAll('.experience-card, .project-card, .skill-category, .education-card, .cert-card, .contact-item');
    cards.forEach((card) => {
        observer.observe(card);
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            navigateTo(target.substring(1));
        });
    });

    // Add scroll event for navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });
});

// Mouse tracking for interactive effects
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    // Optional: Add subtle camera rotation based on mouse position
    // camera.rotation.x = mouseY * 0.0005;
    // camera.rotation.y = mouseX * 0.0005;
});

// Performance optimization for mobile
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Reduce particle count on mobile
    const particleGeometry = particles?.geometry;
    if (particleGeometry) {
        const positions = particleGeometry.getAttribute('position').array;
        // Keep only half the particles on mobile
        const newPositions = new Float32Array(positions.length / 2);
        for (let i = 0; i < newPositions.length; i++) {
            newPositions[i] = positions[i];
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
    }
}

// Add Matrix rain effect overlay
class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        this.columns = [];
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 16;

        // Initialize columns
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i] = 1;
        }

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '50';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.1';

        document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = [];
        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        for (let i = 0; i < columnCount; i++) {
            this.columns[i] = 1;
        }
    }

    draw() {
        // Semi-transparent black to create trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.columns.length; i++) {
            const char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            const x = i * this.fontSize;
            const y = this.columns[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.99) {
                this.columns[i] = 0;
            }
            this.columns[i]++;
        }
    }
}

const matrixEffect = new MatrixEffect();

// Update animation loop to include Matrix effect
const originalAnimationLoop = window.requestAnimationFrame;
let frameCount = 0;

function animationLoop() {
    frameCount++;
    if (frameCount % 3 === 0) { // Update matrix effect every 3 frames
        matrixEffect.draw();
    }
    originalAnimationLoop(animationLoop);
}

// Start the matrix effect loop after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animationLoop();
}, { once: true });
