import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css'],
})
export class ChangePasswordPageComponent implements OnInit {
  information: any;

  newPassword: string;
  currentPassword: string;
  update: any = {};
  user: any;
  success: boolean = false;

  constructor(
    public users: UsersService,
    public router: Router,
    public data: DataService
  ) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.users.getUsers(`nif=${this.information}`).subscribe((res) => {
      this.user = res.userList[0];
    });
  }

  changePassword() {
    this.update.newPassword = this.newPassword;
    this.update.oldPassword = this.currentPassword;
    this.users.updateUser(this.user._id, this.update).subscribe((res) => {
      if (!res.err) {
        this.success = true;
      }
      //this.router.navigate(['/user/profile']);
    });
  }
}
