import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseControl } from "../base-control";
import { InputTextModule } from 'primeng/inputtext';
import { provideControlValueAccessor } from "../utils";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'lib-input-text',
  templateUrl: './lib-input-text.component.html',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibInputTextComponent)],
  host: {
    class: 'p-fluid',
  }
})
export class LibInputTextComponent extends BaseControl {

}