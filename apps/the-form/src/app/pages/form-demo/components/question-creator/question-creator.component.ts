import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibSelectComponent } from '@demo/lib-controls';
import { LibSelectOption } from 'libs/lib-controls/src/lib/lib-controls/types';

@Component({
  selector: 'question-creator',
  templateUrl: './question-creator.component.html',
  standalone: true,
  imports: [
    LibSelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-white rounded p-4 block w-[500px]',
  },
})
export class QuestionCreatorComponent {
  testOptions: LibSelectOption[] = [
    { label: 'Apple', value: 0 },
    { label: 'Banana', value: 1 },
  ]
}
