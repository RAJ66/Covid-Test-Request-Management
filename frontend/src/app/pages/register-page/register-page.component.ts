import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  nif: number;
  email: string;
  name: string;
  password: string;
  contact: number;
  birthDate: Date;
  role: string = 'User';

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit(): void {}

  handleRegister(event): void {
    event.preventDefault();
    this.users
      .createUser(
        this.nif,
        this.password,
        this.email,
        this.name,
        this.birthDate,
        this.contact,
        this.role
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  loginPage(): void {
    this.router.navigate(['/login']);
  }
}
