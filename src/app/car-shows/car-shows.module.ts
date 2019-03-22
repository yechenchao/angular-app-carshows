import { NgModule } from '@angular/core';
import { CarShowsLoookupComponent } from "./car-shows-loookup/car-shows-loookup.component";
import { CarShowsRoutingModule } from './car-shows.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CarShowsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CarShowsLoookupComponent,
  ],
})
export class CarShowsModule { }
