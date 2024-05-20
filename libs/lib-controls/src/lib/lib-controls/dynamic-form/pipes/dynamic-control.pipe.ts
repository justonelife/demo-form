import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DYNAMIC_CONTROL } from '../../tokens';

@Pipe({
  name: 'dynamicControl',
  standalone: true,
})
export class DynamicControlPipe implements PipeTransform {
  readonly injector = inject(Injector);

  transform(control: FormControl) {
    return Injector.create({
      providers: [
        {
          provide: DYNAMIC_CONTROL,
          useValue: control,
        },
      ],
      parent: this.injector,
    });
  }
}
