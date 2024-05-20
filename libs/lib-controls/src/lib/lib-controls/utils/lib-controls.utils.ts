import { forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function provideControlValueAccessor<TComponent>(
  component: TComponent
): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}

export class DynamicFormResolver {
  private static instance: DynamicFormResolver;

  private constructor() {}

  public static getInstace(): DynamicFormResolver {
    return this.instance || (this.instance = new this());
  }

  textarea(): Promise<any> {
    return import(
      '../lib-textarea/lib-textarea.component'
    ).then((c) => c.LibTextareaComponent);
  }

  select(): Promise<any> {
    return import(
      '../lib-select/lib-select.component'
    ).then((c) => c.LibSelectComponent);
  }

  radio(): Promise<any> {
    return import(
      '../lib-radio/lib-radio.component'
    ).then((c) => c.LibRadioComponent);
  }
}
