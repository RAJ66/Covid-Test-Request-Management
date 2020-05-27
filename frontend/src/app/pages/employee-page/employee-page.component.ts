import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'],
})
export class EmployeePageComponent implements OnInit {
  list = [];
  requestId: string;
  displayedColumns: string[] = [
    'id',
    'requestState',
    'userState',
    'userId',
    'firstTestResult',
    'secondTestResult',
    'employeeId',
  ];
  information: string;

  constructor(public requests: RequestsService) {}

  ngOnInit(): void {
    this.requests.getRequests(null).subscribe((res: any) => {
      this.list = res.requestList;
    });
  }

  handleSubmit(event): void {
    event.preventDefault();
    this.requests.getOneRequest(this.requestId).subscribe((res: any) => {
      this.list = [];
      this.list[0] = res.request;
    });
  }
}
