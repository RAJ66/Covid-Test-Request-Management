import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { RequestComponent } from './request/request.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { TestMaterialComponent } from './test-material/test-material.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { KpiComponent } from './components/kpi/kpi.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from './material-modules';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { HeaderEmployeeComponent } from './components/header-employee/header-employee.component';
import { RequestPageComponent } from './pages/request-page/request-page.component';
import { UpdateRequestPageComponent } from './pages/update-request-page/update-request-page.component';

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
    RegisterPageComponent,
    HomePageComponent,
    QuestionPageComponent,
    EmployeePageComponent,
    HeaderEmployeeComponent,
    RequestPageComponent,
    UpdateRequestPageComponent,
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
    MatFormFieldModule,
    DemoMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
