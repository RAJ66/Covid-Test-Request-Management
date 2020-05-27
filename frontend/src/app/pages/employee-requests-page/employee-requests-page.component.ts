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
  list = [];
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
        this.list = res.requestList;
        this.dataSource = new MatTableDataSource(res.requestList);
        this.dataSource.sort = this.sort;
      });

    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );
  }

  handleSubmit(event): void {
    event.preventDefault();
    this.requests.getOneRequest(this.requestId).subscribe((res: any) => {
      this.list = [];
      this.list[0] = res.request;
    });
  }

  showRequest(requestId) {
    this.data.changeinformation(requestId);
  }
}
