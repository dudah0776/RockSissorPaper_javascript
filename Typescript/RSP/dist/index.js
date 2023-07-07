"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("./button");
var CircleData_1 = require("./CircleData");
var items = new CircleData_1.CircleData([
    new button_1.Button('sissor', "가위", game),
    new button_1.Button('rock', "바위", game),
    new button_1.Button('paper', "보", game),
]);
function isHTMLButtonElement(element) {
    return element !== null && element instanceof HTMLButtonElement;
}
var startEl = document.getElementById("start");
var comEl = document.getElementById("com");
var comCurrentItem = items.reSet();
var timerId;
//항목 생성
var itemButtonEl = document.getElementById('item-buttons');
//항목 렌더링
if (isHTMLButtonElement(itemButtonEl)) {
    items.rendering(itemButtonEl);
}
items.setDisable(true);
//시작 클릭 이벤트 핸들링
if (isHTMLButtonElement(startEl)) {
    startEl.onclick = function () {
        if (isHTMLButtonElement(startEl)) {
            startEl.setAttribute('disabled', "true");
            items.setDisable(false);
            comCurrentItem = items.reSet();
            timerId = setInterval(function () {
                comCurrentItem = items.getNext(comCurrentItem);
                if (isHTMLButtonElement(comEl)) {
                    comEl.textContent = comCurrentItem.name;
                }
            }, 100);
        }
    };
}
function game(item) {
    // 가위,바위,보 동그랗게 연결되어 있다.
    // 나보다 앞에있는 항목한테는 지고, 뒤에있는 항목한테는 이긴다. 같으면 비긴다.
    var next = items.getNext(item);
    if (item === comCurrentItem) {
        alert("비겼습니다");
    }
    else if (next === comCurrentItem) {
        alert("졌습니다");
    }
    else {
        alert("이겼습니다");
    }
    clearInterval(timerId);
    if (isHTMLButtonElement(startEl)) {
        startEl.removeAttribute('disabled');
    }
    items.setDisable(true);
}
