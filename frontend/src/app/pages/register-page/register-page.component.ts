import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));

  nif: number;
  email: string;
  name: string;
  password: string;
  contact: number;
  birthDate: Date;
  roleUser: string = 'User';
  roleEmployee: string = 'Employee';
  success: boolean = false;

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit(): void {}

  handleRegister(event): void {
    event.preventDefault();
    if (this.user) {
      this.users
        .createUser(
          this.nif,
          this.password,
          this.email,
          this.name,
          this.birthDate,
          this.contact,
          this.roleEmployee
        )
        .subscribe(() => {
          this.success = true;
        });
    } else {
      this.users
        .createUser(
          this.nif,
          this.password,
          this.email,
          this.name,
          this.birthDate,
          this.contact,
          this.roleUser
        )
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }

  loginPage(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    if (this.user) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
