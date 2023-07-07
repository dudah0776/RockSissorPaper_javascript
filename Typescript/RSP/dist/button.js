"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var Button = /** @class */ (function () {
    function Button(key, name, onClick) {
        var _this = this;
        this.render = function (parentEl) {
            parentEl.append(_this.buttonEl);
        };
        this.disable = function (value) {
            if (value) {
                _this.buttonEl.setAttribute('disabled', "true");
            }
            else {
                _this.buttonEl.removeAttribute('disabled');
            }
        };
        this.key = key;
        this.name = name;
        // 버튼 만들기
        this.buttonEl = document.createElement("button");
        this.buttonEl.textContent = name;
        // 클릭 이벤트 핸들링
        this.buttonEl.addEventListener = function () {
            return onClick;
        };
    }
    return Button;
}());
exports.Button = Button;
