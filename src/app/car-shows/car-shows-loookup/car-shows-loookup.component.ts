import { Component, OnInit } from '@angular/core';
import { CarShowsService } from '../../shared/services/car-shows.service';

@Component({
  selector: 'app-car-shows-loookup',
  templateUrl: './car-shows-loookup.component.html',
  styleUrls: ['./car-shows-loookup.component.scss']
})
export class CarShowsLoookupComponent implements OnInit {

  constructor(
    private carShowsService: CarShowsService,
  ) { }

  async ngOnInit() {
    const carShows = await this.carShowsService.getCarShowsData();
  }

}
