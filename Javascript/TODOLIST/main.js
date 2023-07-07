var todolist=[];
//인풋
var input = Widget.input("todoInput", { onKeyDown: onKeyDownTodoInput });
//컨테이너
var containerEl = document.getElementById("container");
//todo 컨테이너
var todoContainer = document.getElementById("todo-container");
//done 컨테이너
var doneContainer = document.getElementById("done-container");
//입력 버튼
var inputBtnControl = Widget.button("btnSave", { label: "입력", onClick: onClickSave });

//todolist
var todolistControl = Widget.list("todo-list",
    {
        datas: getSortedTodoList({ done: false }),
        columns:[
            { id: "done", render: renderColumnDone },
            { id: "todo", render: renderColumnTodo },
            { id: "delete", render: renderColumnDelete },
        ]
    });
//donelist
var donelistControl = Widget.list("done-list",
    {
        datas: getSortedTodoList({ done: true }),
        columns:[
            { id: "done", render: renderColumnDone },
            { id: "todo", render: renderColumnTodo },
            { id: "delete", render: renderColumnDelete },
        ]
    });
containerEl.append(input.el);    
containerEl.append(inputBtnControl.el);
todoContainer.append(todolistControl.el);    
doneContainer.append(donelistControl.el);
//입력창 메소드
function onKeyDownTodoInput(e){
    var text = e.target.value;
    input.setValue(text);
}
//입력 버튼
function onClickSave() {
    if (!input.getValue()) {
        alert("할일을 입력해주세요");
        return;
    }
    todolist.push({
        id: crypto.randomUUID(),
        contents: input.getValue(),
        done: false,
    })
    todolistControl.reload(todolist);
    input.setValue("");
    input.el.focus();
}

//done:true , done:false를 기준으로 필터링 하는 메소드
function getSortedTodoList(filter) {
    // 할 일 목록을 가져오고 필터링 및 정렬 작업 수행
    var filterList;
    
    if(filter.done){
        filterList = todolist.filter(function(item){return item.done})
    }
    else{
        filterList = todolist.filter(function(item){return !item.done})
    }    
    return filterList;
}
//todo목록을 새로 고쳐주는 메소드
function ReloadTodo(){
    todolistControl.reload(getSortedTodoList({ done: false }));    
}
//done목록을 새로 고쳐주는 메소드
function ReloadDone(){
    donelistControl.reload(getSortedTodoList({ done: true }));
}
//체크박스 컬럼
function renderColumnDone(data){    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.done;
    checkbox.onchange = function(e){
        data.done = e.target.checked;
        ReloadTodo();
        ReloadDone();
    };
    return checkbox;
}
//해야할일 컬럼
function renderColumnTodo(data){
    var contents = document.createElement("span");
    contents.textContent = data.contents;
    return contents;
}
//삭제 컬럼
function renderColumnDelete(data){
    var delBtnControl=Widget.button(
        "btnDel",
        {        
        label:"삭제",
        onClick: function(){                
            //splice
            todolist.splice(todolist.indexOf(data), 1);
            data.done ? ReloadDone() : ReloadTodo();
        },
    });
    return delBtnControl.el;
}


