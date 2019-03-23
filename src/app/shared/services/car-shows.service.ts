import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';

@Injectable()
export class CarShowsService {
  rawCarShows: any[];

  constructor(
    private http: HttpClient,
  ) {
    this.rawCarShows = [];
  }

  getCarShowsData() {
    return this.http.get(environment.api.carShows)
      .pipe(
        first(),
        map((shows: any[]) => {
          if (this.isValidArray(shows)) {
            _.each(shows, show => {
              if (show['name'] && show['cars'] && this.isValidArray(show.cars)) {
                this.addToCarShowList(show.name, show.cars);
              } else {
                // fire error
              }
            });

            this.sortByMake();
            console.log(this.rawCarShows);
          }

          return;
        }))
      .toPromise();
  }

  addToCarShowList(name: string, cars: any) {
    _.each(cars, car => {
      const rawCarShow = Object.assign({ name: name }, car);

      this.rawCarShows.push(rawCarShow);
    })
  }

  sortByMake() {
    this.rawCarShows = _.sortBy(this.rawCarShows, 'make');
  }

  isValidArray(value): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }
}
