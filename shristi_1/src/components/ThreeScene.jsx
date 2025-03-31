import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Add a rotating torus
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        // Add floating text
        const fontLoader = new FontLoader();
        fontLoader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            (font) => {
                const textGeometry = new TextGeometry("Shristi Tech Fest", {
                    font: font,
                    size: 2,
                    height: 0.5,
                });
                const textMaterial = new THREE.MeshStandardMaterial({
                    color: 0x00ffcc,
                });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-10, 10, 0);
                scene.add(textMesh);
            }
        );

        // Add glowing particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 500;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }
        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Add lighting
        const light = new THREE.PointLight(0xffffff);
        light.position.set(50, 50, 50);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        camera.position.z = 30;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
            particles.rotation.y += 0.002; // Rotate particles
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            if (mountRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;
