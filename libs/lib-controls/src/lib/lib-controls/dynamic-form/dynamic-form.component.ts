import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { BaseDynamicForm } from '../base-dynamic-form';
import { DynamicFormTemplateDirective } from './directives';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { LibButtonDirective } from '@demo/lib-button';
import { DynamicControlPipe } from './pipes/dynamic-control.pipe';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    LibButtonDirective,
    AsyncPipe,
    DynamicControlPipe,
    NgComponentOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent extends BaseDynamicForm {
  @ContentChildren(DynamicFormTemplateDirective, { read: TemplateRef })
  templates!: QueryList<TemplateRef<unknown>>;
  @ContentChildren(DynamicFormTemplateDirective)
  templateInputs?: QueryList<DynamicFormTemplateDirective>;
  @ContentChild('control') control?: TemplateRef<unknown>;
}
