import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { LibControlsSafeAny } from './types';

@Directive()
export abstract class BaseControl<T = LibControlsSafeAny> implements ControlValueAccessor {

  @Input() placeholder: string = '';

  protected state!: T;
  protected onChange = (v: T) => {};
  protected onTouched = () => {};
  protected disabled: boolean = false;

  writeValue(obj: LibControlsSafeAny): void {
    this.state = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
