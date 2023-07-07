import { Button } from "./button";
import { CircleData } from "./CircleData";

const items = new CircleData([
    new Button('sissor',"가위",game),
    new Button('rock',"바위",game),
    new Button('paper',"보",game),
]);

let startEl = document.getElementById("start");
let comEl = document.getElementById("com");

let comCurrentItem = items.reSet();
let timerId:any;


//항목 생성
let itemButtonEl = document.getElementById('item-buttons');

//항목 렌더링
items.rendering(itemButtonEl as HTMLElement);

items.setDisable(true);

//시작 클릭 이벤트 핸들링
startEl.onclick = function(){        
    startEl.setAttribute('disabled', "true");
    items.setDisable(false);
    comCurrentItem = items.reSet();
    timerId=setInterval(() => {        
        comCurrentItem = items.getNext(comCurrentItem);                
        comEl.textContent=comCurrentItem.name;                                
    }, 100);                    
};


function game(item:Button){    
    // 가위,바위,보 동그랗게 연결되어 있다.
    // 나보다 앞에있는 항목한테는 지고, 뒤에있는 항목한테는 이긴다. 같으면 비긴다.
    let next = items.getNext(item);
    if(item===comCurrentItem){
        alert("비겼습니다");
    }
    else if(next===comCurrentItem){
        alert("졌습니다");
    }
    else{
        alert("이겼습니다");
    }
    clearInterval(timerId);
    
    startEl.removeAttribute('disabled');
        
    items.setDisable(true);
}