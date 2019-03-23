import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class CarShowsService {
  constructor(
    private http: HttpClient,
  ) {}

  getCarShowsData() {
    return this.http.get(environment.api.carShows)
      .pipe(first())
      .toPromise();
  }
}
