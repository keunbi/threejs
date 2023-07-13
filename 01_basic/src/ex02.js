import * as THREE from 'three';

export default function example(){

    // Renderer
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas : canvas }); // canvas의 속성을 위에서 가져온 canvas로 지정해줌
    const renderer = new THREE.WebGLRenderer({ 
        canvas,// 위의 코드 축약
        antialias: true // mesh 부드럽게 처리하지만 약간의 성능 저하가 있음
    }); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고해상도로 표현해줄 때 사용하는 메소드
    

    // Scene
    const scene = new THREE.Scene();

    // Camera
    // Perspective Camera (원근카메라)
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각 (field of view)
        window.innerWidth / window.innerHeight, // 종횡비 (aspect)
        0.1, // near
        1000 // far
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    // Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        color: 'red'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 그리기
    renderer.render(scene, camera);


    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); //카메라에 변화가 있을 때 실행시켜줘야하는 함수
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
    }

    window.addEventListener('resize', setSize);
}





