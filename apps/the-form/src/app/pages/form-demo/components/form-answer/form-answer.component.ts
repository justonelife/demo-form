import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'demo-form-answer',
    templateUrl: './form-answer.component.html',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAnswerComponent {

}