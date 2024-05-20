import { InputSignal } from "@angular/core";
import { LibRadioLayout } from "../types";

export interface ILibRadio {
  layout: LibRadioLayout;
  maximumOptionCount: InputSignal<number | null>;
  allowCustomOption: InputSignal<boolean>;
}