import { Component, OnInit } from '@angular/core';
import { CarShows } from '../../shared/interfaces/carShows.interface';
import { CarShowsService } from '../../shared/services/car-shows.service';

@Component({
  selector: 'app-car-shows-lookup',
  templateUrl: './car-shows-lookup.component.html',
  styleUrls: ['./car-shows-lookup.component.scss']
})
export class CarShowsLookupComponent implements OnInit {
  carShows: CarShows[];
  error: string;
  loaded: boolean;

  constructor(
    private carShowsService: CarShowsService,
  ) { }

  ngOnInit(): Promise<void> {
    return this.getCarShows();
  }

  async getCarShows(): Promise<void> {
    try {
      this.carShows = await this.carShowsService.getCarShowsData();

      console.log(this.carShows);
    } catch (error) {
      this.error = error;
    }

    this.loaded = true;
  }

  reload(): void {
    window.location.reload();
  }
}
