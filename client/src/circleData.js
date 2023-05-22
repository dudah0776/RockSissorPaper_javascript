export function CircleData(items){
    this.items = items;
}
CircleData.prototype.getAll = function(){
    return this.items;
};
CircleData.prototype.getNext = function(item){
    var index = this.items.indexOf(item);
    var next = this.items[index+1];
    return next ? next : this.items[0];
};
//버튼 활성화 비활성화 true:안보임 false:보임
CircleData.prototype.setDisable=function(isDisable){
    this.items.forEach(item => {
        item.disable(isDisable);
    })
};
//항목 렌더링
CircleData.prototype.rendering=function(itemButtonEl){
    this.items.forEach(item=>{
        item.render(itemButtonEl);
    })
}
//첫번째 항목 초기화 random함수로
CircleData.prototype.reSet=function(){
    var length = this.items.length;
    var index = Math.floor(Math.random() * length);
    console.log(this.items[index]);
    return this.items[index];
}