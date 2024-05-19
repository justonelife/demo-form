import { Injectable } from "@angular/core";
import { SIZE_TO_KLASS, STATUS_TO_KLASS } from "./consts";
import { LibButtonSize, LibButtonStatus } from "./types";

@Injectable()
export class LibButtonService {

    getClassByStatus(status: LibButtonStatus): string[] {
        return STATUS_TO_KLASS[status];
    }

    getClassBySize(size: LibButtonSize): string[] {
        return SIZE_TO_KLASS[size];
    }
}