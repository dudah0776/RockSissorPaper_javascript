export function createButton(name, option){
    var el = document.createElement("button");
    el.id=name;
    el.textContent = option.label;
    el.onclick = option.onClick;
    return {
        el: el,                    
    };
}