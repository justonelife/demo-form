import { Directive, input } from '@angular/core';
import { BaseControl } from './base-control';
import { LibSelectOption } from './types';

@Directive()
export abstract class BaseSelectControl extends BaseControl {

  options = input.required<LibSelectOption[]>();
  protected abstract onSelect(): void;

}
