import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseControl } from "../base-control";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from "@angular/forms";
import { provideControlValueAccessor } from "../utils";

@Component({
  selector: 'lib-textarea',
  templateUrl: './lib-textarea.component.html',
  standalone: true,
  imports: [
    InputTextareaModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibTextareaComponent)],
  host: {
    class: 'p-fluid',
  }
})
export class LibTextareaComponent extends BaseControl {

}