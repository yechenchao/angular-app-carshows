import { NgModule } from '@angular/core';
import { StaticRoutingModule } from './static.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    StaticRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class StaticModule { }
