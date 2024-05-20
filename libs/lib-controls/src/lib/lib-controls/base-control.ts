import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DYNAMIC_CONTROL } from './tokens';
import { LibControlsSafeAny } from './types';

@Directive()
export abstract class BaseControl<T = LibControlsSafeAny>
  implements ControlValueAccessor, OnInit, OnDestroy
{
  protected readonly dynamicControl = inject(DYNAMIC_CONTROL, {
    optional: true,
  });

  @Input() placeholder: string = '';

  protected state!: T;
  protected onChange = (v: T) => {
    this.dynamicControl?.setValue(v);
  };
  protected onTouched = () => {};
  protected disabled: boolean = false;

  protected destroy$ = new Subject();

  ngOnInit(): void {
    this.dynamicControl?.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((val) => {
        this.writeValue(val);
      });

    this.dynamicControl?.registerOnDisabledChange((isDisabled) => {
      if (this.setDisabledState) {
        this.setDisabledState(isDisabled);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  writeValue(obj: LibControlsSafeAny): void {
    this.state = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
