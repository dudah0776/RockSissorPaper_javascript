import { Button } from "./button";

export class CircleData{
    items: Button[];

    constructor(items:Button[]){
        this.items = items;
    }

    getAll = () =>{
        return this.items;
    }

    getNext = (item:Button) =>{
        let index = this.items.indexOf(item);
        let next = this.items[index+1];
        return next ? next : this.items[0];
    }
    //버튼 활성화 비활성화 true:안보임 false:보임
    setDisable = (isDisable:boolean)=>{
        this.items.forEach(item => {
            item.disable(isDisable);
        })
    }
    //항목 렌더링
    rendering = (itemButtonEl:HTMLElement) => {

        this.items.forEach(item=>{
            item.render(itemButtonEl);
        })
    }
    //첫번째 항목 초기화 random함수로
    reSet = () => {
        var length = this.items.length;
        var index = Math.floor(Math.random() * length);        
        return this.items[index];
    }
}