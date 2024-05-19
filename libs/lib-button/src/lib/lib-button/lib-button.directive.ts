import { Directive, HostBinding, inject, Input } from "@angular/core";
import { LibButtonSize, LibButtonStatus } from "./types";
import { LibButtonService } from "./lib-button.service";

@Directive({
    selector: 'button[libButton]',
    standalone: true,
    providers: [LibButtonService],
})
export class LibButtonDirective {
    private readonly _libButtonService = inject(LibButtonService);

    @Input() size: LibButtonSize = 'medium';
    @Input() status: LibButtonStatus = 'primary';

    @HostBinding('class')
    get classes(): string[] {
        return [
            ...this._libButtonService.getClassByStatus(this.status),
            ...this._libButtonService.getClassBySize(this.size),
        ];
    }
}