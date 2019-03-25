import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';
import { CarShows, ModelShows, PristineCar, RawCarShow, RawModelShows } from '../interfaces/carShows.interface';
import { CommonService } from './common.service';

@Injectable()
export class CarShowsService {
  private rawCarShows: RawCarShow[];

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
  ) {
    this.rawCarShows = [];
  }

  getCarShowsData(): Promise<CarShows[]> {
    return this.http.get(environment.api.carShows)
      .pipe(
        first(),
        catchError(this.commonService.handleError),
        map((shows: any[]) => {
          if (this.commonService.isValidArray(shows)) {
            _.each(shows, show => {
              if (show['name'] && show['cars'] && this.commonService.isValidArray(show.cars)) {
                this.addToCarShowList(show.name, show.cars);
              } else {
                console.error('Data corrupted');
              }
            });

            return this.getFormattedCarShows();
          }

          return [];
        }))
      .toPromise();
  }

  addToCarShowList(name: string, cars: PristineCar[]): void {
    _.each(cars, car => {
      const rawCarShow = Object.assign({ name: name }, car);

      this.rawCarShows.push(rawCarShow);
    })
  }

  getFormattedCarShows(): CarShows[] {
    return _.chain(this.rawCarShows)
      .uniq(rawCarShow => JSON.stringify(rawCarShow))
      .filter(rawCarShow => _.keys(rawCarShow).length === 3 && rawCarShow['make'] && rawCarShow['model'])
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

  getShows(rawModelShows: RawModelShows[]): string[] {
    return _.chain(rawModelShows)
      .map(rawModelShow => _.omit(rawModelShow, 'model'))
      .pluck('name')
      .sortBy()
      .value();
  }
}
