export class KeyController{
    constructor(){
        // 생성자
        this.keys = [];

        // 키가 눌렸을 때 어떤 키냐에 따라서 keys 배열에 추가하거나 삭제
        window.addEventListener('keydown', e => {
            console.log(e.code)
            this.keys[e.code] = true; // ex) W키를 눌렀다면 this.keys['KeyW'] = true;
        })

        window.addEventListener('keyup', e => {
            delete this.keys[e.code]; // ex) W키에서 손을 뗐다면 this.keys배열에서 KeyW 속성을 삭제
        })
    }
}