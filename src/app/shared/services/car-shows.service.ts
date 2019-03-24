import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';
import { CarShows, RawCarShows } from '../interfaces/carShows.interface';

@Injectable()
export class CarShowsService {
  private rawCarShows: RawCarShows[];
  public carShows: CarShows[];

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

            this.processCarShows();
            console.log(this.rawCarShows);
            console.log(this.carShows);
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

  processCarShows(): void {
    this.carShows = _.chain(this.rawCarShows)
      .uniq(rawCarShow => JSON.stringify(rawCarShow))
      .filter(rawCarShow => _.keys(rawCarShow).length === 3 && rawCarShow['make'] && rawCarShow['name'] && rawCarShow['model'])
      .sortBy('make')
      .groupBy('make')
      .map((rawCars, key) => {
        const formattedCars = this.getFormattedCars(rawCars);

        return {
          make: key,
          cars: formattedCars,
        }
      })
      .value();
  }

  getFormattedCars(rawCars) {
    return _.chain(rawCars)
      .map(rawCar => _.omit(rawCar, 'make'))
      .groupBy('model')
      .map((modelShows, model) => {
        const shows = _.chain(modelShows)
          .map(v => _.omit(v, 'model'))
          .pluck('name')
          .value();

        return {
          model: model,
          shows: shows,
        };
      })
      .value();
  }

  isValidArray(value): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }
}
