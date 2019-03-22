import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const staticRoutes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(staticRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class StaticRoutingModule { }
