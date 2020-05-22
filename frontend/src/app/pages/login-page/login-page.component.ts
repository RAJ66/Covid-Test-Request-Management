import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  nif: number;
  password: string;

  constructor(public session: SessionService) {}

  ngOnInit(): void {}

  handleSubmit(event): void {
    console.log(this.nif, this.password);
    event.preventDefault();
    this.session.login(this.nif, this.password).subscribe();
  }
}
