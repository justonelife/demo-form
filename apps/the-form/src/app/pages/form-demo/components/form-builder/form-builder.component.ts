import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LibButtonDirective } from '@demo/lib-button';
import { QuestionBuilderComponent } from '../question-builder/question-builder.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'demo-form-builder',
  templateUrl: './form-builder.component.html',
  standalone: true,
  imports: [
    LibButtonDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DialogService,
  ]
})
export class FormBuilderComponent {
  private readonly dialog = inject(DialogService);
  
  openQuestionBuilderModal(): void {
    this.dialog.open(QuestionBuilderComponent, {
      styleClass: 'w-11/12 sm:w-1/3',
      header: 'Add a New Question',
      dismissableMask: true,
    });
  }
}
