//버튼 아이템
interface Item{
    key:string;
    name:string;    
}
export class Button implements Item{
    key: string;
    name: string;
    buttonEl:HTMLButtonElement;

    constructor(key:string, name:string, onClick:Function){
        this.key = key;
        this.name = name;
         // 버튼 만들기
        this.buttonEl = document.createElement("button");
        this.buttonEl.textContent = name;    
            
         // 클릭 이벤트 핸들링
         this.buttonEl.addEventListener('click', () => {
            console.log("클릭");
            onClick(this);    
        });
    }

    render = (parentEl:HTMLElement) =>{
        parentEl.append(this.buttonEl);
    }

    disable = (value:boolean) => {
        if(value){
            this.buttonEl.setAttribute('disabled', "true");
        }
        else{
            this.buttonEl.removeAttribute('disabled');
        }        
    }
}
