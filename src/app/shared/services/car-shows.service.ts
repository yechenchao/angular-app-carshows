import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { _ } from 'underscore';
import { environment } from '../../../environments/environment';

@Injectable()
export class CarShowsService {
  carShowList: any[];

  constructor(
    private http: HttpClient,
  ) {
    this.carShowList = [];
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

            console.log(this.carShowList);
          }

          return;
        }))
      .toPromise();
  }

  addToCarShowList(name: string, cars: any) {
    _.each(cars, car => {
      const carShow = Object.assign({ name: name }, car);

      this.carShowList.push(carShow);
    })
  }

  isValidArray(value): boolean {
    return _.isArray(value) && !_.isEmpty(value);
  }
}
