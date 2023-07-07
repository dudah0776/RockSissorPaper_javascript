import { Component, ComponentOption, createComponent } from "./components";

export function createButton(name: string, option: any): Component<void> {
    const buttonOption: ComponentOption<void> = {
      tagName: "button",
      eventName: "click",
      eventHandler: option.onClick,
      label: option.label,
      getValue: () => undefined,
      setValue: () => {},
    };
    
    return createComponent(name, buttonOption);
  }