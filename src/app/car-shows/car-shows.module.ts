import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CarShowsLookupComponent } from './car-shows-lookup/car-shows-lookup.component';
import { CarShowsRoutingModule } from './car-shows.routing.module';

@NgModule({
  imports: [
    CarShowsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CarShowsLookupComponent,
  ],
})
export class CarShowsModule { }
