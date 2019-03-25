import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';
import { CarShows, ModelShows, RawCarShow, RawModelShows } from '../interfaces/carShows.interface';

@Injectable()
export class CarShowsService {
  private rawCarShows: RawCarShow[];

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
        const modelShows = this.getModelShows(rawCars);

        return {
          make: make,
          cars: modelShows,
        }
      })
      .value();
  }

  getModelShows(rawCars: RawCarShow[]): ModelShows[] {
    return _.chain(rawCars)
      .map(rawCar => _.omit(rawCar, 'make'))
      .sortBy('model')
      .groupBy('model')
      .map((modelShows, model) => {
        const shows = this.getShows(modelShows);

        return {
          model: model,
          shows: shows,
        };
      })
      .value();
  }

  getShows(modelShows: RawModelShows[]): string[] {
    return _.chain(modelShows)
      .map(modelShow => _.omit(modelShow, 'model'))
      .pluck('name')
      .sortBy()
      .value();
  }

  isValidArray(value: any): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError('Failed connection to the service. Please try again.')
  }
}
