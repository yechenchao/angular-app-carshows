import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';

@Injectable()
export class CarShowsService {
  constructor(
    private http: HttpClient,
  ) {}

  getCarShowsData() {
    const carShowList = [];

    return this.http.get(environment.api.carShows)
      .pipe(
        first(),
        map((shows: any[]) => {
          if (_.isArray(shows) && !_.isEmpty(shows)) {
            _.each(shows, show => {
              if (_.has(show, 'name') && _.isString(show.name) && _.has(show, 'cars') && _.isArray(show.cars) && !_.isEmpty(show.cars)) {
                console.log(show);
              }
            });
          }

          return;
        }))
      .toPromise();
  }

  validateData() {

  }
}
