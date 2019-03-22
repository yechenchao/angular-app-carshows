import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { StaticModule } from "./static/static.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    StaticModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
