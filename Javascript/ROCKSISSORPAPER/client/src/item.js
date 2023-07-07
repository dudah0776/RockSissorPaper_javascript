export function Item(key, name, onClick){
    this.key=key;
    this.name=name;
    //버튼 만들기
    this.buttonEl = document.createElement("button");
    this.buttonEl.textContent = name;

    //클릭 이벤트 핸들링
    var _self=this;
    this.buttonEl.onclick = function(){
        onClick(_self);
    };
}

Item.prototype.render = function(parentEl){
    parentEl.append(this.buttonEl);
}
Item.prototype.disable = function(value){
    if(value){
        this.buttonEl.setAttribute('disabled', true);
    }
    else{
        this.buttonEl.removeAttribute('disabled');
    }        
}
