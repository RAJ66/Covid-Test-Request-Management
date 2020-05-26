import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  nif: number;
  password: string;
  user;

  constructor(
    public session: SessionService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  handleSubmit(event): void {
    event.preventDefault();
    this.session.login(this.nif, this.password).subscribe(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.role);
      if (user.role === 'Admin') {
        this.router.navigate(['dashboard']);
      } else if (user.role === 'Employee') {
        this.router.navigate(['employee']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
