import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css'],
})
export class ChangePasswordPageComponent implements OnInit {
  newPassword: string;
  currentPassword: string;
  update: any = {};
  user: any;
  success: boolean = false;

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit(): void {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
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
