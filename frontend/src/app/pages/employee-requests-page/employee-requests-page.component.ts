import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-requests-page',
  templateUrl: './employee-requests-page.component.html',
  styleUrls: ['./employee-requests-page.component.css'],
})
export class EmployeeRequestsPageComponent implements OnInit {
  dataSource: any;
  requestId: string;
  displayedColumns: string[] = [
    'id',
    'requestState',
    'userState',
    'userId',
    'firstTestDate',
    'firstTestResult',
    'secondTestDate',
    'secondTestResult',
    'employeeId',
  ];
  information: string;

  roleEmployee = 'Employee';
  roleUser = 'User';

  user = JSON.parse(localStorage.getItem('user'));

  constructor(public requests: RequestsService, public data: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.user.role === this.roleEmployee) {
      this.requests
        .getRequests(`employeeNif=${this.user.nif}`)
        .subscribe((res: any) => {
          this.dataSource = new MatTableDataSource(res.requestList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    } else {
      this.requests
        .getRequests(`userNif=${this.user.nif}`)
        .subscribe((res: any) => {
          this.dataSource = new MatTableDataSource(res.requestList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }

    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showRequest(requestId) {
    this.data.changeinformation(requestId);
  }
}
