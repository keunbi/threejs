import * as THREE from 'three';

export default function example(){

    // Renderer
    // 동적으로 캔버스 조립하기
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement); // renderer.domElement -> canvas

    // html에서 캔버스 가져와서 사용하기
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas : canvas }); // canvas의 속성을 위에서 가져온 canvas로 지정해줌
    const renderer = new THREE.WebGLRenderer({ 
        canvas,// 위의 코드 축약
        antialias: true // mesh 부드럽게 처리하지만 약간의 성능 저하가 있음
    }); 
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    // Perspective Camera (원근카메라)
    // const camera = new THREE.PerspectiveCamera(
    //     75, // 시야각 (field of view)
    //     window.innerWidth / window.innerHeight, // 종횡비 (aspect)
    //     0.1, // near
    //     1000 // far
    // );
    // camera.position.x = 1;
    // camera.position.y = 2;
    // camera.position.z = 5;

    // Orthographic Camera (직교카메라)
    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight), //left
        window.innerWidth / window.innerHeight, //right
        1, // top
        -1, //bottom
        0.1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(0,0,0); // 원점을 바라보도록 설정 (Mesh가 원점에 있으므로)
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();
    scene.add(camera);

    // Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        color: 'red'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 그리기
    renderer.render(scene, camera);
}





