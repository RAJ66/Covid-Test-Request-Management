import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestMaterialComponent } from './test-material/test-material.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { RequestPageComponent } from './pages/request-page/request-page.component';
import { UpdateRequestPageComponent } from './pages/update-request-page/update-request-page.component';
import { EmployeeRequestsPageComponent } from './pages/employee-requests-page/employee-requests-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'list', component: ListRequestComponent },
  { path: 'table', component: TableRequestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'material', component: TestMaterialComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'question', component: QuestionPageComponent },
  { path: 'employee', component: EmployeePageComponent },
  { path: 'employee/request', component: RequestPageComponent },
  { path: 'employee/request/update', component: UpdateRequestPageComponent },
  { path: 'employee/requests', component: EmployeeRequestsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
