import { ChangeDetectionStrategy, Component, computed, HostBinding, input, Input, InputSignal, Signal } from "@angular/core";
import { BaseSelectControl } from "../base-select-control";
import { RadioButtonModule } from 'primeng/radiobutton';
import { ILibRadio } from "../interfaces";
import { LibRadioLayout, LibSelectOption } from "../types";
import { FormsModule } from "@angular/forms";
import { provideControlValueAccessor } from "../utils";

@Component({
  selector: 'lib-radio',
  templateUrl: './lib-radio.component.html',
  standalone: true,
  imports: [
    RadioButtonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibRadioComponent)],
  host: {
    class: 'flex gap-2 flex-wrap'
  }
})
export class LibRadioComponent extends BaseSelectControl implements ILibRadio {

  @Input() layout: LibRadioLayout = 'VERTICAL';
  allowCustomOption = input<boolean>(false);
  maximumOptionCount: InputSignal<number | null> = input<number | null>(null);

  validOptions: Signal<LibSelectOption[]> = computed(() => {
    let result: LibSelectOption[] = this.maximumOptionCount() 
      ? this.options().slice(0, <number>this.maximumOptionCount() - 1)
      : this.options();

    if (this.allowCustomOption()) {
      result.push({ label: 'Other', value: 'other' });
    }

    return result;
  });

  @HostBinding('class')
  get classes(): string[] {
    return this.layout === 'VERTICAL' ? ['flex-row'] : ['flex-col'];
  }

  protected override onSelect(): void {
    throw new Error("Method not implemented.");
  }

}