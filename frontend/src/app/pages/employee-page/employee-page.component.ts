import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'],
})
export class EmployeePageComponent implements OnInit {
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

  constructor(public requests: RequestsService, public data: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.requests.getRequests(null).subscribe((res: any) => {
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
    if (this.requestId) {
      this.requests.getOneRequest(this.requestId).subscribe((res: any) => {
        this.list = [];
        this.list[0] = res.request;
      });
    } else {
      this.requests.getRequests(null).subscribe((res: any) => {
        this.list = res.requestList;
      });
    }
  }

  showRequest(requestId) {
    this.data.changeinformation(requestId);
  }
}
