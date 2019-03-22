import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarShowsLoookupComponent } from "./car-shows-loookup/car-shows-loookup.component";

const carShowsRoutes = [
  {
    path: 'showsLookup',
    component: CarShowsLoookupComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(carShowsRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CarShowsRoutingModule { }
