import {
  AfterContentInit,
  Directive,
  inject,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { DynamicFormTemplateDirective } from './dynamic-form';
import { DynamicFormResolverService } from './dynamic-form/services/dynamic-form-resolver.service';
import { DYNAMIC_FORM_TYPE } from './enums';
import { DynamicFormItem } from './interfaces';

@Directive()
export abstract class BaseDynamicForm<
  TItem extends DynamicFormItem = DynamicFormItem
> implements OnInit, AfterContentInit
{
  protected readonly controlContainer = inject(ControlContainer);
  protected readonly formGroupDirective = inject(FormGroupDirective);
  protected readonly resolver = inject(DynamicFormResolverService);

  fields: TItem[] = [];
  get _fields(): TItem[] {
    return this.fields;
  }
  @Input({ alias: 'fields', required: true }) set _fields(v: TItem[]) {
    this.fields = v;
    this.addControlForCustomFieldOrFieldHasDefault();
    this.computeFieldRefs();
  }

  abstract templates: QueryList<TemplateRef<unknown>>;
  abstract templateInputs?: QueryList<DynamicFormTemplateDirective>;
  abstract control?: TemplateRef<unknown>;

  get keyToRef(): Record<string, TemplateRef<unknown>> {
    if (!this.templates?.length || !this.templateInputs?.length) {
      return {};
    }

    let val: Record<string, TemplateRef<unknown>> = {};
    for (let i = 0; i < this.templates.length; i++) {
      val[this.templateInputs.get(i)?.key as string] = this.templates.get(
        i
      ) as TemplateRef<unknown>;
    }
    return val;
  }

  fieldRefs: (TItem & {
    ref: TemplateRef<unknown>;
    comp: any;
    control: FormControl;
  })[] = [];
  readonly DYNAMIC_FORM_TYPE = DYNAMIC_FORM_TYPE;
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

  ngAfterContentInit(): void {
    this.addControlForCustomFieldOrFieldHasDefault();
    this.computeFieldRefs();
  }

  addControlForCustomFieldOrFieldHasDefault(): void {
    this.fields.forEach((f) => {
      if (this.form.controls[f.key]) {
        // Already existed
        return;
      }

      this.form.addControl(
        f.key,
        new FormControl(
          {
            value: f.value || f.defaultValue || null,
            disabled: f.disabled,
          },
          f.validators?.length ? f.validators : null
        )
      );
    }, this);
  }

  computeFieldRefs(): void {
    this.fieldRefs = this.fields.map((f) => {
      return {
        ...f,
        ref: this.keyToRef[f.key],
        comp: this.resolver.resolve(f.type),
        control: this.form.get(f.key) as FormControl,
      };
    });
  }

  onReset(): void {
    // Only work with default control
    const defaultValues: Record<string, any> = this.fields
      .filter((f) => {
        return f.defaultValue !== undefined;
      })
      .reduce((acc, cur) => ({ ...acc, [cur.key]: cur.defaultValue }), {});

    this.form.reset(defaultValues);
  }

  onSubmit(event: Event): void {
    if (this.form.invalid) {
      return;
    }
    this.formGroupDirective.onSubmit(event);
  }
}
