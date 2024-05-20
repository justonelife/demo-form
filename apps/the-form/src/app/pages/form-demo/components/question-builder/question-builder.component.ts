import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButtonDirective } from '@demo/lib-button';
import { DYNAMIC_FORM_TYPE, DynamicFormComponent, DynamicFormItem, LibInputTextComponent, LibSelectOption, LibTextareaComponent } from '@demo/lib-controls';
import { Destroyable } from 'apps/the-form/src/app/shared/destroyable';
import { uniqueAnswersValidator } from 'apps/the-form/src/app/shared/validators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'question-builder',
  templateUrl: './question-builder.component.html',
  standalone: true,
  imports: [
    LibTextareaComponent,
    LibInputTextComponent,
    DynamicFormComponent,
    ReactiveFormsModule,
    LibButtonDirective,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBuilderComponent extends Destroyable implements OnInit {
  readonly dialogRef = inject(DynamicDialogRef, { optional: true });

  get answers() {
    return this.questionBuilderForm.controls["answers"] as FormArray<FormControl>;
  }

  readonly LIMIT_ANSWERS: number = 4;

  typeOptions: LibSelectOption<QuestionType>[] = [
    { label: 'Paragraph', value: 'paragraph' },
    { label: 'Checkbox List', value: 'checkbox' },
  ];

  questionTypeForm: FormGroup = new FormGroup({});
  readonly QUESTION_TYPE_FIELDS: DynamicFormItem[] = [
    { key: 'type', 
      label: 'Question Type', 
      type: DYNAMIC_FORM_TYPE.SELECT, 
      klass: 'col-span-12', 
      config: { options: this.typeOptions }, 
      validators: [Validators.required]
    }
  ];

  questionBuilderForm: FormGroup = new FormGroup({
    type: new FormControl<QuestionType | null>(null, Validators.required),
    question: new FormControl('', Validators.required),
    answers: new FormArray([
      new FormControl('', Validators.required),
    ], [Validators.required, Validators.minLength(1), Validators.maxLength(this.LIMIT_ANSWERS), uniqueAnswersValidator]),
  });

  ngOnInit(): void {
    this.questionTypeForm.valueChanges.pipe(
      distinctUntilChanged(),
      map((value: { type: QuestionType }) => value.type),
      tap(type => {
        this.questionBuilderForm.get('type')?.setValue(type);
      }),
      tap(type => {
        const control = this.questionBuilderForm.get('answers') as FormArray;
        if (type === 'paragraph') {
          control?.clear();
          control?.removeValidators(Validators.required);
        } else {
          if (!control?.length) this.onAddAnswer();
          control?.addValidators(Validators.required);
        }
        control?.updateValueAndValidity();
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  onAddAnswer(): void {
    if (this.answers?.length >= this.LIMIT_ANSWERS) {
      return;
    }

    (this.questionBuilderForm.get('answers') as FormArray).push(new FormControl('', Validators.required));
  }

  onRemoveAnswer(index: number): void {
    (this.questionBuilderForm.get('answers') as FormArray).removeAt(index);
  }

}

type QuestionType = 'paragraph' | 'checkbox';
