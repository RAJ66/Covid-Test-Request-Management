import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {
  user: any;

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit(): void {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.user = res.userList[0];
      });
  }

  goBack() {
    if (this.user.role === 'User') {
      this.router.navigate(['/user/']);
    } else {
      this.router.navigate(['/admin/']);
    }
  }
}
