export function createInput(name, option){
    var content = document.createElement("input");
    content.id=name;
    content.onkeydown = option.onKeyDown;    
    return{
        el: content,
        setValue: function(text){
            content.value=text;
        },
        getValue: function(){
            return content.value;
        },
    };
}