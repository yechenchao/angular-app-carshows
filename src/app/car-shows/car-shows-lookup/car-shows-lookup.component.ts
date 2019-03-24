import { Component, OnInit } from '@angular/core';
import { CarShowsService } from '../../shared/services/car-shows.service';

@Component({
  selector: 'app-car-shows-lookup',
  templateUrl: './car-shows-lookup.component.html',
  styleUrls: ['./car-shows-lookup.component.scss']
})
export class CarShowsLookupComponent implements OnInit {

  constructor(
    private carShowsService: CarShowsService,
  ) { }

  ngOnInit() {
    this.getCarShows();
  }

  async getCarShows() {
    try {
      const carShows = await this.carShowsService.getCarShowsData();

      console.log(carShows);
    } catch (error) {
      console.log(error);
    }
  }
}
