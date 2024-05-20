import { InjectionToken } from "@angular/core";
import { FormControl } from "@angular/forms";

export const DYNAMIC_CONTROL = new InjectionToken<FormControl>('DYNAMIC_CONTROL')