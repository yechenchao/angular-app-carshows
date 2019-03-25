import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { _ } from 'underscore';

@Injectable()
export class CommonService {
  isValidArray(value: any): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError('Failed connection to the service. Please try again.')
  }
}
