import * as THREE from 'three';

export default function example(){
    // fog(안개)

    // Renderer
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas : canvas }); // canvas의 속성을 위에서 가져온 canvas로 지정해줌
    const renderer = new THREE.WebGLRenderer({ 
        canvas,// 위의 코드 축약
        antialias: true, // mesh 부드럽게 처리하지만 약간의 성능 저하가 있음
    }); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고해상도로 표현해줄 때 사용하는 메소드
    

    // Scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('blue'); // renderer보다 위에 있으므로 renderer를 덮음

    scene.fog = new THREE.Fog('black', 3, 7) //(색상, near, far)

    // Camera
    // Perspective Camera (원근카메라)
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각 (field of view)
        window.innerWidth / window.innerHeight, // 종횡비 (aspect)
        0.1, // near
        1000 // far
    );
    camera.position.y = 1;
    camera.position.z = 5;



    // Light 
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);


    // Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red'
    });
    const meshes = [];
    let mesh;
    for (let i = 0; i < 10; i ++){
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 5 - 2.5; // 가운데 기준으로 랜덤하게 되도록 5의 절반을 뺴줌
        mesh.position.z = Math.random() * 5 - 2.5;
        scene.add(mesh);
        meshes.push(mesh)
    }
    

    // 그리기
    let oldTime = Date.now(); // 장점 : threejs와 상관 없어 canvas 등에서도 사용가능

    function draw(){
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        meshes.forEach(item => {
            item.rotation.y += deltaTime * 0.001;
        })

        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw); // requestAnimationFrame대신 사용할 수 있지만 vr 등의 컨텐츠에서는 해당 함수 사용해야 함
    }


    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); //카메라에 변화가 있을 때 실행시켜줘야하는 함수
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
    }

    window.addEventListener('resize', setSize);

    draw();
}





