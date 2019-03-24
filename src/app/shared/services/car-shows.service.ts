import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';
import { CarShows, ModelShows, RawCarShows } from '../interfaces/carShows.interface';

@Injectable()
export class CarShowsService {
  private rawCarShows: RawCarShows[];

  constructor(
    private http: HttpClient,
  ) {
    this.rawCarShows = [];
  }

  getCarShowsData(): Promise<CarShows[]> {
    return this.http.get(environment.api.carShows)
      .pipe(
        first(),
        catchError(this.handleError),
        map((shows: any[]) => {
          if (this.isValidArray(shows)) {
            _.each(shows, show => {
              if (show['name'] && show['cars'] && this.isValidArray(show.cars)) {
                this.addToCarShowList(show.name, show.cars);
              } else {
                console.error('Data corrupted');
              }
            });

            console.log(this.rawCarShows);

            return this.getFormattedCarShows();
          }

          return [];
        }))
      .toPromise();
  }

  addToCarShowList(name: string, cars: any): void {
    _.each(cars, car => {
      const rawCarShow = Object.assign({ name: name }, car);

      this.rawCarShows.push(rawCarShow);
    })
  }

  getFormattedCarShows(): CarShows[] {
    return _.chain(this.rawCarShows)
      .uniq(rawCarShow => JSON.stringify(rawCarShow))
      .filter(rawCarShow => _.keys(rawCarShow).length === 3 && rawCarShow['make'] && rawCarShow['name'] && rawCarShow['model'])
      .sortBy('make')
      .groupBy('make')
      .map((rawCars, make) => {
        const formattedCars = this.getFormattedCars(rawCars);

        return {
          make: make,
          cars: formattedCars,
        }
      })
      .value();
  }

  getFormattedCars(rawCars): ModelShows[] {
    return _.chain(rawCars)
      .map(rawCar => _.omit(rawCar, 'make'))
      .sortBy('model')
      .groupBy('model')
      .map((modelShows, model) => {
        const shows = _.chain(modelShows)
          .map(v => _.omit(v, 'model'))
          .pluck('name')
          .sortBy()
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error)
  }
}
