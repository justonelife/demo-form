import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export const uniqueAnswersValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  for (let i = 0; i < value.length - 1; i++) {
    for (let j = i + 1; j < value.length; j++) {
      if (value[i] === value[j]) {
        return ({
          foundDuplicateAnswers: true
        });
      }
    }
  }
  return null;
}