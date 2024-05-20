import { Injectable } from "@angular/core";
import { SIZE_TO_KLASS, STATUS_TO_KLASS } from "./consts";
import { LibButtonSize, LibButtonStatus } from "./types";

@Injectable()
export class LibButtonService {

    getClassesByStatus(status: LibButtonStatus): string[] {
        return STATUS_TO_KLASS[status];
    }

    getClassesBySize(size: LibButtonSize): string[] {
        return SIZE_TO_KLASS[size];
    }

    getClassesByDisabledState(disabled: boolean): string[] {
        return disabled ? ['cursor-not-allowed', 'opacity-50'] : [];
    }
}