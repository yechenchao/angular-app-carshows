import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatListModule, MatTreeModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarShowsService } from './services/car-shows.service';
import { CommonService } from './services/common.service';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatTreeModule,
  ],
  providers: [
    CarShowsService,
    CommonService,
  ]
})

export class SharedModule { }
