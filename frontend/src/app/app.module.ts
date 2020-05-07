import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, MatSliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
