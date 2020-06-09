import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-request-page',
  templateUrl: './create-request-page.component.html',
  styleUrls: ['./create-request-page.component.css'],
})
export class CreateRequestPageComponent implements OnInit {
  request: any = {};
  user: any;
  riskGroup: string;
  riskProfession: string;
  saude24: string;
  success: boolean;

  constructor(public requests: RequestsService, public users: UsersService) {}

  ngOnInit(): void {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.user = res.userList[0];
        this.success = false;
      });
  }

  submitRequest() {
    this.request.riskGroup = String(true) == this.riskGroup;
    this.request.riskProfession = String(true) == this.riskProfession;
    this.request.saude24 = String(true) == this.saude24;
    this.request.userId = this.user._id;

    this.requests.createRequest(this.request).subscribe(
      (res) => {
        if (!res.err) {
          this.success = true;
        }
      },
      (error) => {
        alert(error.error);
        console.log(error);
      }
    );
  }
}
