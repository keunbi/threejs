import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// ----- 주제: TrackballControls

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

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
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new TrackballControls(camera, renderer.domElement); // renderer.domElement => canvas
    // TrackballControls은 업데이트 함수 실행 안하면 아예 실행되지 않음, enableDamping이 기본적으로 적용됨

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
	for(let i = 0; i < 20; i++){
		material = new THREE.MeshStandardMaterial({
			// 색상코드의 최대값인 255까지 랜덤으로 값이 나올 수 있도록
			// 색상 값은 정수가 나와야하므로 Math.floor 내림값 해줌
			// 배경이 검정색일 경우 박스의 컬러가 어두울 경우 안보이므로 랜덤 색상값에 기본으로 50은 가지고 있도록 지정. 0~205 사이의 값 가짐
			color: `rgb(
				${ 50 + Math.floor(Math.random() * 205)}, 
				${50 + Math.floor(Math.random() * 205)}, 
				${50 + Math.floor(Math.random() * 205)}
			)`
		});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 5;
		mesh.position.y = (Math.random() - 0.5) * 5;
		mesh.position.z = (Math.random() - 0.5) * 5;
		scene.add(mesh)
	}

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

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
