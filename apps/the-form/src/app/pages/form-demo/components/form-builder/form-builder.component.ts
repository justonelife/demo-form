import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LibButtonDirective } from '@demo/lib-button';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { QuestionCreatorComponent } from '../question-creator/question-creator.component';

@Component({
  selector: 'demo-form-builder',
  templateUrl: './form-builder.component.html',
  standalone: true,
  imports: [
    LibButtonDirective, 
    DialogModule,
    QuestionCreatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
  private readonly dialog = inject(Dialog);

  openQuestionCreatorModal(): void {
    this.dialog.open(QuestionCreatorComponent)
  }
}
