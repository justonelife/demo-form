import { Directive, Input, input } from '@angular/core';
import { BaseControl } from './base-control';
import { LibSelectOption } from './types';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive()
export abstract class BaseSelectControl extends BaseControl {

  @Input()
  get multiple() { return this._multiple }
  set multiple(v: BooleanInput) {
    this._multiple = coerceBooleanProperty(v);
  }

  private _multiple: boolean = false;
  options = input.required<LibSelectOption[]>();
  protected abstract onSelect(): void;

}
