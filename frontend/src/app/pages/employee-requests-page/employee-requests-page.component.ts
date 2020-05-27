import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employee-requests-page',
  templateUrl: './employee-requests-page.component.html',
  styleUrls: ['./employee-requests-page.component.css'],
})
export class EmployeeRequestsPageComponent implements OnInit {
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
  employeeNif = JSON.parse(localStorage.getItem('user')).nif;

  constructor(public requests: RequestsService, public data: DataService) {}

  ngOnInit(): void {
    this.requests
      .getRequests(`employeeNif=${this.employeeNif}`)
      .subscribe((res: any) => {
        this.list = res.requestList;
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
