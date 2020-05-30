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
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KpiComponent } from './components/kpi/kpi.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
//new material
import { DemoMaterialModule } from './material-modules';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';

import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { HeaderEmployeeComponent } from './components/header-employee/header-employee.component';
import { RequestPageComponent } from './pages/request-page/request-page.component';
import { UpdateRequestPageComponent } from './pages/update-request-page/update-request-page.component';
import { EmployeeRequestsPageComponent } from './pages/employee-requests-page/employee-requests-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UpdateProfilePageComponent } from './pages/update-profile-page/update-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginPageComponent,
    KpiComponent,
    RegisterPageComponent,
    HomePageComponent,
    QuestionPageComponent,
    UserPageComponent,
    HeaderUserComponent,
    EmployeePageComponent,
    HeaderEmployeeComponent,
    RequestPageComponent,
    UpdateRequestPageComponent,
    EmployeeRequestsPageComponent,
    UserProfilePageComponent,
    UpdateProfilePageComponent,
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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
