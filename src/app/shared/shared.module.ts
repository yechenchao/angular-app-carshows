import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
})

export class SharedModule { }
