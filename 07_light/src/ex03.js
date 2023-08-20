import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import { DirectionalLightHelper, ShapePath } from 'three';

// ----- 주제: PointLight

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // 그림자 설정
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFShadowMap; // 기본값
    renderer.shadowMap.type = THREE.BasicShadowMap;

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight)

	const light = new THREE.PointLight('white', 1, 2);
	light.position.x = -5;
    light.position.y = 3;
	scene.add(light)

	const lightHelper = new THREE.PointLightHelper(light);
	scene.add(lightHelper)

    // 그림자 설정
    light.castShadow = true; // 설정해주면 그림자를 만들 수 있는 라이트가 됨
    // 그림자 퀄리티 올리기
    light.shadow.mapSize.width = 2048; // 기본값 512
    light.shadow.mapSize.height = 2048; // 기본값 512
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 30;
    
	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Geomerty
	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const sphereGeomerty = new THREE.SphereGeometry(0.7, 16, 16);

	// Material
	const material1 = new THREE.MeshStandardMaterial({
		color: 'white'
	});
	const material2 = new THREE.MeshStandardMaterial({
		color: 'royalblue'
	});
	const material3 = new THREE.MeshStandardMaterial({
		color: 'gold'
	});

	// Mesh
	const plane = new THREE.Mesh(planeGeometry, material1);
	const box = new THREE.Mesh(BoxGeometry, material2);
	const sphere = new THREE.Mesh(sphereGeomerty, material3);

	plane.rotation.x = -Math.PI * 0.5;
	box.position.set(1, 1, 0);
	sphere.position.set(-1, 1, 0)

    // 그림자 설정
    plane.receiveShadow = true;
    box.castShadow = true;
    box.receiveShadow = true;
    sphere.castShadow = true;
    sphere.receiveShadow = true;

	scene.add(plane, box, sphere);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// Dat GUI
	const gui = new dat.GUI();
	gui.add(light.position, 'x', -5, 5).name('라이트 X');
	gui.add(light.position, 'y', -5, 5).name('라이트 Y');
	gui.add(light.position, 'z', 2, 10).name('라이트 Z');

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime(); // 계속 늘어나는 값

		// light.position.x = Math.cos(time);
		// light.position.z = Math.sin(time);

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}