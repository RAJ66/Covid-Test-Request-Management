import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RequestsService } from '../../services/requests.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  information: string;
  request: any;
  user: any;
  requestState: boolean;
  file: any;

  userRole = JSON.parse(localStorage.getItem('user')).role;
  roleEmployee: string = 'Employee';
  roleUser: string = 'User';

  constructor(
    public data: DataService,
    public requests: RequestsService,
    public users: UsersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.requests.getOneRequest(this.information).subscribe((res) => {
      this.request = res.request;

      if (this.request.firstTestDate !== undefined) {
        //First Test Date
        this.request.firstTestDate =
          new Date(this.request.firstTestDate).getFullYear() +
          '/' +
          (new Date(this.request.firstTestDate).getMonth() + 1) +
          '/' +
          new Date(this.request.firstTestDate).getDate();
      }

      if (this.request.secondTestDate !== undefined) {
        //Second Test Date
        this.request.secondTestDate =
          new Date(this.request.secondTestDate).getFullYear() +
          '/' +
          (new Date(this.request.secondTestDate).getMonth() + 1) +
          '/' +
          new Date(this.request.secondTestDate).getDate();
      }

      this.requestState = this.request.requestState === 'Done';
    });

    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.user = res.userList[0];
      });
  }

  claimRequest() {
    this.request.employeeId = this.user._id;
    this.requests.updateRequest(this.request._id, this.request).subscribe();
  }

  goBack() {
    if (this.user.role === this.roleEmployee) {
      this.router.navigate(['/employee/requests']);
    } else {
      this.router.navigate(['/user/requests']);
    }
  }

  downloadFile() {
    this.requests.getFile(this.request.file).subscribe((res) => {
      saveAs(res, `${this.request.file}`);
    });
  }
}
