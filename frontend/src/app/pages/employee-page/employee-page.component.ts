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

  constructor(public requests: RequestsService, public data: DataService) {}

  ngOnInit(): void {
    this.requests.getRequests(null).subscribe((res: any) => {
      this.list = res.requestList;
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
