import { Component, ComponentOption, createComponent } from "./components";

export function createList<T>(id: string, option: any): Component<T[]> {
    const listOption: ComponentOption<T[]> & { label?: string } = {
      tagName: "ul",
      eventName: "",
      eventHandler: () => {},
      label:option.label,
      getValue: () => option.datas,
      setValue: () => {},
    };
        
    const list = createComponent(id, listOption);
    
    function render(datas: T[], columns: any) {
      list.el.innerHTML = "";      
      datas.forEach((data) => {        
        const liEl = document.createElement("li");
        columns.forEach((column:any) => {          
          const control = column.render(data);          
          liEl.append(control.el);
        });
        list.el.append(liEl);
      });
    }    
    render(option.datas, option.columns);

    const result: Component<T[]> = {
      el: list.el,
      getValue: list.getValue,
      setValue: (datas) => {
        list.el.innerHTML="";
        render(datas, option.columns);
      },      
    };    
    return result;
  }