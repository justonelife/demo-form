import { Injectable } from '@angular/core';
import { DynamicFormResolver } from '../../utils';
import { DYNAMIC_FORM_TYPE } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormResolverService {
  #resolver = DynamicFormResolver.getInstace();

  resolve(type: DYNAMIC_FORM_TYPE): Promise<any> | undefined {
    switch (type) {
      case DYNAMIC_FORM_TYPE.TEXTAREA:
        return this.#resolver.textarea();
      case DYNAMIC_FORM_TYPE.SELECT:
        return this.#resolver.select();
      case DYNAMIC_FORM_TYPE.RADIO:
        return this.#resolver.radio();
      default:
        return undefined;
    }
  }
}
