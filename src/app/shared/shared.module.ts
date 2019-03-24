import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatTreeModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarShowsService } from './services/car-shows.service';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatTreeModule,
  ],
  providers: [
    CarShowsService,
  ]
})

export class SharedModule { }
