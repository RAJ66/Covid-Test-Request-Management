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

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'list', component: ListRequestComponent },
  { path: 'table', component: TableRequestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'material', component: TestMaterialComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
