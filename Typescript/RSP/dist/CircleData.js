"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleData = void 0;
var CircleData = /** @class */ (function () {
    function CircleData(items) {
        var _this = this;
        this.getAll = function () {
            return _this.items;
        };
        this.getNext = function (item) {
            var index = _this.items.indexOf(item);
            var next = _this.items[index + 1];
            return next ? next : _this.items[0];
        };
        //버튼 활성화 비활성화 true:안보임 false:보임
        this.setDisable = function (isDisable) {
            _this.items.forEach(function (item) {
                item.disable(isDisable);
            });
        };
        //항목 렌더링
        this.rendering = function (itemButtonEl) {
            _this.items.forEach(function (item) {
                item.render(itemButtonEl);
            });
        };
        //첫번째 항목 초기화 random함수로
        this.reSet = function () {
            var length = _this.items.length;
            var index = Math.floor(Math.random() * length);
            console.log(_this.items[index]);
            return _this.items[index];
        };
        this.items = items;
    }
    return CircleData;
}());
exports.CircleData = CircleData;
