import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BaseSelectControl } from '../base-select-control';
import { provideControlValueAccessor } from '../utils';

@Component({
  selector: 'lib-select',
  templateUrl: './lib-select.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-fluid'
  },
  providers: [provideControlValueAccessor(LibSelectComponent)]
})
export class LibSelectComponent extends BaseSelectControl {

  @Input() override placeholder: string = 'Select';
  
  protected override onSelect(): void {
    this.onChange(this.state);  
  }
}

