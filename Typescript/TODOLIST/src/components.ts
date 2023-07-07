export interface Component<T> {
    el: HTMLElement;
    getValue(): T;
    setValue(value: T): void;
  }

  export interface ComponentOption<T> {
    tagName: string;
    eventName: string;
    label: string;
    eventHandler: (event: Event) => void;
    getValue: (element: HTMLElement) => T;
    setValue: (element: HTMLElement, value: T) => void;
  }

  export function createComponent<T>(name: string, option: ComponentOption<T>): Component<T> {
    const el = document.createElement(option.tagName);
    el.id = name;
    el.addEventListener(option.eventName, option.eventHandler);
    el.textContent = option.label;

    const result: Component<T> = {
      el,
      getValue() {
        return option.getValue(el);
      },
      setValue(value: T) {
        option.setValue(el, value);
      },
    };

    return result;
  }
  