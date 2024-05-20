import { FormControl, ValidatorFn } from "@angular/forms";
import { DYNAMIC_FORM_TYPE } from "../enums";
import { TemplateRef } from "@angular/core";

export interface DynamicFormItem {
  key: string;
  type: DYNAMIC_FORM_TYPE;
  label: string;
  klass?: string;
  defaultValue?: any;
  value?: any;
  validators?: ValidatorFn[];
  config?: Record<string, any>;
  disabled?: boolean;
}

export interface DynamicFormItemRef extends DynamicFormItem {
  ref: TemplateRef<unknown>;
  comp?: Promise<any>;
  control: FormControl;
}