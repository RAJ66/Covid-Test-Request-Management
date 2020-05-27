import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RequestsService } from '../../services/requests.service';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  information: string;
  request: any;
  employee: any;
  requestState: boolean;

  constructor(
    public data: DataService,
    public requests: RequestsService,
    public users: UsersService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.requests.getOneRequest(this.information).subscribe((res) => {
      this.request = res.request;
      this.requestState = this.request.requestState === 'Done';
    });

    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.employee = res.userList[0];
      });
  }

  claimRequest() {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.employee = res.userList[0];
        this.request.employeeId = this.employee._id;
        this.requests.updateRequest(this.request._id, this.request).subscribe();
      });
  }

  goBack() {
    this.location.back();
  }
}
