import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarShowsLookupComponent } from './car-shows-lookup/car-shows-lookup.component';

const carShowsRoutes = [
  {
    path: 'showsLookup',
    component: CarShowsLookupComponent,
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
