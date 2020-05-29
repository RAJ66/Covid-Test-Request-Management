import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {
  user: any;

  constructor(public users: UsersService) {}

  ngOnInit(): void {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.user = res.userList[0];
        console.log(this.user);
      });
  }
}
