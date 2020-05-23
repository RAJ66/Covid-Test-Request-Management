import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { RequestComponent } from './request/request.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { TestMaterialComponent } from './test-material/test-material.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { KpiComponent } from './components/kpi/kpi.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RequestComponent,
    DashboardComponent,
    ListRequestComponent,
    TableRequestComponent,
    TestMaterialComponent,
    LoginPageComponent,
    KpiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
