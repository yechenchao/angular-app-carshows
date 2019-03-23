import { Injectable } from '@angular/core';
import { _ } from 'underscore';

@Injectable()
export class CommonService {
  existAndValid(type: string, value: any, property?: string) {
    let isCorrectType = false;
    const val = property ? value[property] : value;

    switch (type) {
      case 'array':
        isCorrectType = _.isArray(value);
        break;
      case 'string':
        isCorrectType = _.isString(value);
        break;
    }

    return isCorrectType && _.isEmpty(val);
  }
}
