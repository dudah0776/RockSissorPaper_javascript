import { createButton } from "./Button";
import { createInput } from "./Input";
import { createList } from "./List";

class todo{
  id: string;
  contents: string;
  done: boolean;
  constructor(id: string, contents: string){
    this.id = id;
    this.contents = contents;
    this.done = false;
  }
}

let list: todo[] = [];

//done:true , done:false를 기준으로 필터링 하는 메소드
function getSortedTodoList(filter:boolean) {
  // 할 일 목록을 가져오고 필터링 및 정렬 작업 수행
  let filterList : todo[]=[];
  
  if(filter){
      filterList = list.filter(function(item){return item.done})
  }
  else{
      filterList = list.filter(function(item){return !item.done})
  }    
  return filterList;
}
//todo목록을 새로 고쳐주는 메소드
function ReloadTodo(){
  todoList.setValue(getSortedTodoList(false));    
}
//done목록을 새로 고쳐주는 메소드
function ReloadDone(){
  DoneList.setValue(getSortedTodoList(true));
}

//체크박스 컬럼
function renderColumnDone(data:todo){    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.done;
    checkbox.onchange = function(e){
      const checkbox = e.target as HTMLInputElement;
      data.done = checkbox.checked;                 
      ReloadTodo();
      ReloadDone();      
    };
    const control = {
      el: checkbox,
    };
    return control;
}
//해야할일 컬럼
function renderColumnTodo(data:todo){
  var contents = document.createElement("span");
  contents.textContent = data.contents;
  const control={
    el: contents
  };
  return control;
}
//삭제 컬럼
function renderColumnDelete(data:todo){
  var delBtnControl = createButton("btnDel", {
    label: "삭제",
    onClick: () => {
      list.splice(list.indexOf(data), 1);
      ReloadTodo();
      ReloadDone(); 
    }
  });
  const control={
    el: delBtnControl.el
  };    
  return control;
}

  let root = document.getElementById("container");
  let div = document.createElement('div');
  root.appendChild(div);

   // Input 컴포넌트 생성
  const input = createInput("todoInput", {
    onKeyDown: (e:any) =>{
        let text = e.target.value;          
    }    
  });
  div.append(input.el);

  const button = createButton("btnSave", {
    label: "입력",
    onClick: () => {
        console.log("클릭");
        console.log(input.getValue());
        if (!input.getValue()) {
          alert("할일을 입력해주세요");
          return;
        }
        list.push(new todo(crypto.randomUUID(), input.getValue()));
        ReloadTodo();
        input.setValue("");
        input.el.focus();
    }
  });
  div.append(button.el);

  let todoContainer = document.getElementById("todo-container"); 
  let doneContainer = document.getElementById("done-container");  

  // List 컴포넌트 생성
  const todoList = createList("todoList", {
    datas: getSortedTodoList(false),
    columns: [
      { id: "done", render: renderColumnDone },
      { id: "todo", render: renderColumnTodo },
      { id: "delete", render: renderColumnDelete },
    ],
  });
  todoContainer.append(todoList.el);

  const DoneList = createList("todoListDone", {
    datas: getSortedTodoList(true),
    columns: [
      { id: "done", render: renderColumnDone },
      { id: "todo", render: renderColumnTodo },
      { id: "delete", render: renderColumnDelete },
    ],
  });
  doneContainer.append(DoneList.el);


