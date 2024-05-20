import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCheckboxControl } from "../base-checkbox-control";

@Component({
  selector: 'lib-binary-checkbox',
  templateUrl: './lib-binary-checkbox.component.html',
  standalone: true,
  imports: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibBinaryCheckboxComponent extends BaseCheckboxControl {
  
}