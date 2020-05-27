import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  employeeNif = JSON.parse(localStorage.getItem('user')).nif;

  constructor(public requests: RequestsService, public data: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.requests
      .getRequests(`employeeNif=${this.employeeNif}`)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.requestList);
        this.dataSource.sort = this.sort;
      });

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
