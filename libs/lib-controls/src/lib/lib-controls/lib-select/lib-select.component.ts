import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BaseSelectControl } from '../base-select-control';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-select',
  templateUrl: './lib-select.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibSelectComponent extends BaseSelectControl {

  @Input() override placeholder: string = 'Select';
  protected override onSelect(): void {
    
  }
}

