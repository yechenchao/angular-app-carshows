import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const flightsRoutes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(flightsRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class StaticRoutingModule { }
