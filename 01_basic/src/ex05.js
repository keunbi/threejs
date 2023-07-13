import * as THREE from 'three';

export default function example(){

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

    // Camera
    // Perspective Camera (원근카메라)
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각 (field of view)
        window.innerWidth / window.innerHeight, // 종횡비 (aspect)
        0.1, // near
        1000 // far
    );
    camera.position.z = 5;



    // Light 
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.z = 2;
    scene.add(light);


    // Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 그리기
    const clock = new THREE.Clock(); // 경과된 시간을 값으로 가지고 있음, 따라서 해당 값을 실행시킬 애니메이션에 사용하면 됨
    function draw(){
        const time = clock.getElapsedTime(); // 시간의 경과
        

        // 각도는 Radian을 사용
        // 360도는 2파이 = 3.14 * 2 = 6.3정도
        // mesh.rotation.y += 0.1; 


        // mesh.rotation.y += THREE.MathUtils.degToRad(1); // 우리가 아는 1도
        mesh.rotation.y = time;
        mesh.position.y += 0.01;
        if(mesh.position.y > 3){
            mesh.position.y = 0;
        }
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





