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
          console.log(shows);

          if (this.isValidArray(shows)) {
            _.each(shows, show => {
              if (show['name'] && show['cars'] && this.isValidArray(show.cars)) {
                this.addToCarShowList(show.name, show.cars);
              } else {
                // fire error
              }
            });

            this.processCarShowsData();
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

  processCarShowsData() {
    this.rawCarShows = _.chain(this.rawCarShows)
      .uniq(rawCarShow => JSON.stringify(rawCarShow))
      .filter(rawCarShow => _.keys(rawCarShow).length === 3 && rawCarShow['make'] && rawCarShow['name'] && rawCarShow['model'])
      .sortBy('make')
      .groupBy('make')
      .map((value, key) => {
        const cars = _.chain(value)
          .map(car => _.omit(car, 'make'))
          .groupBy('model')
          .map((val, ke) => {
            console.log(val);

            const ca = _.chain(val)
              .map(v => _.omit(v, 'model'))
              .pluck('name')
              .value();

            return {
              model: ke,
              shows: ca,
            };
          })
          .value();

        return {
          make: key,
          cars: cars,
        }
      })
      .value();
  }

  isValidArray(value): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }
}
