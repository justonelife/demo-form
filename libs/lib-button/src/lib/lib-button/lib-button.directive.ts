import { AfterViewInit, Directive, ElementRef, HostBinding, inject, Input, Renderer2 } from '@angular/core';
import { LibButtonIconPosition, LibButtonSize, LibButtonStatus } from './types';
import { LibButtonService } from './lib-button.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: 'button[libButton]',
  standalone: true,
  providers: [LibButtonService],
  host: {
    class: '!rounded',
  },
})
export class LibButtonDirective implements AfterViewInit {
  private readonly _libButtonService = inject(LibButtonService);
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);

  @Input() size: LibButtonSize = 'medium';
  @Input() status: LibButtonStatus = 'primary';
  @Input() iconPos: LibButtonIconPosition = 'left';
  @Input() icon?: string;

  private _disabled: boolean = false;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(v: BooleanInput) {
    this._disabled = coerceBooleanProperty(v);
  }

  @HostBinding('class')
  get classes(): string[] {
    return [
      ...this._libButtonService.getClassesByStatus(this.status),
      ...this._libButtonService.getClassesBySize(this.size),
      ...this._libButtonService.getClassesByDisabledState(this._disabled),
    ];
  }

  ngAfterViewInit(): void {
    this._renderIcon();
  }

  private _renderIcon(): void {
    if (!this.icon) return;
    const span = this._renderer.createElement('span');
    this._renderer.setStyle(span, 'display', 'flex');
    this._addClassToElement(span, ['material-symbols-outlined']);

    // GAP BY SIZE
    if (this.size === 'small') {
      this._addClassToElement(this._elementRef.nativeElement, ['gap-2']);
    } else if (this.size === 'medium') {
      this._addClassToElement(this._elementRef.nativeElement, ['gap-4']);
    } else if (this.size === 'large') {
      this._addClassToElement(this._elementRef.nativeElement, ['gap-6']);
    }

    // POSITION BY ICON POS
    if (this.iconPos === 'left') {
      this._addClassToElement(this._elementRef.nativeElement, [
        'flex-row-reverse',
      ]);
    } else {
      this._addClassToElement(this._elementRef.nativeElement, ['flex-row']);
    }

    this._renderer.setAttribute(span, 'aria-hidden', 'true');
    this._renderer.setProperty(span, 'innerText', this.icon);
    this._renderer.appendChild(this._elementRef.nativeElement, span);
  }

  private _addClassToElement(el: ElementRef, klasses: string[]): void {
    for (const klass of klasses) {
      this._renderer.addClass(el, klass);
    }
  }
}
