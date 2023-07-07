import { Component, ComponentOption, createComponent } from "./components";

export function createInput(name: string, option: any): Component<string> {    
    const inputOption: ComponentOption<string> & { label?: string } = {
      tagName: "input",
      eventName: "keydown",
      eventHandler: option.onKeyDown,
      label:option.label,
      getValue: (element) => (element as HTMLInputElement).value,
      setValue: (element, value) => {
        (element as HTMLInputElement).value = value;
      },
    };    
    return createComponent(name, inputOption);
  }