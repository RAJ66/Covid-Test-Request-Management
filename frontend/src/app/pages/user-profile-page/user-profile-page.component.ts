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

  user: any;

  roleUser: string = 'User';
  roleAdmin: string = 'Admin';

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

  goBack() {
    if (this.user.role === 'User') {
      this.router.navigate(['/user/']);
    } else {
      this.router.navigate(['/admin/']);
    }
  }
}
