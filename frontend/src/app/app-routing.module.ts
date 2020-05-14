import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestMaterialComponent } from './test-material/test-material.component';

const routes: Routes = [
  { path: 'list', component: ListRequestComponent },
  { path: 'table', component: TableRequestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'material', component: TestMaterialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
