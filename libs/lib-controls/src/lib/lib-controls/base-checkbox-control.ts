import { Directive, Input } from "@angular/core";
import { BaseControl } from "./base-control";

@Directive()
export class BaseCheckboxControl extends BaseControl {
  @Input() label: string = '';
}