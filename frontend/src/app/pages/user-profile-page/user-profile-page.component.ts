import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {
  information: any;

  userLogged: any = JSON.parse(localStorage.getItem('user'));
  user: any;

  roleUser: string = 'User';
  roleAdmin: string = 'Admin';
  roleEmployee: string = 'Employee';

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

      //Dates in our time zone
      this.user.birthDate =
        new Date(this.user.birthDate).getFullYear() +
        '/' +
        (new Date(this.user.birthDate).getMonth() + 1) +
        '/' +
        new Date(this.user.birthDate).getDate();
    });
  }

  goBack() {
    if (this.userLogged.role === 'Admin') {
      if (this.userLogged.nif === this.user.nif) {
        this.router.navigate(['/admin/']);
      } else {
        this.router.navigate(['/admin/users/']);
      }
    } else if (this.userLogged.role === 'User') {
      this.router.navigate(['/user/']);
    } else if (this.userLogged.role === 'Employee') {
      this.router.navigate(['/employee/']);
    }
  }

  goUpdate() {
    if (this.userLogged.role === 'Admin') {
      if (this.user.nif === this.userLogged.nif) {
        this.router.navigate(['/admin/profile/update']);
      } else {
        this.router.navigate(['/admin/users/profile/update']);
      }
    } else if (this.userLogged.role === 'User') {
      this.router.navigate(['/user/profile/update']);
    } else if (this.userLogged.role === 'Employee') {
      this.router.navigate(['/employee/profile/update']);
    }
  }

  deleteUser() {
    this.users.deleteUser(this.user._id).subscribe((res) => {
      if (res.delete === true) {
        this.success = true;
      }
    });
  }
}
