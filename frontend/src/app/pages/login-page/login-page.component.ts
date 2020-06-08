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
    if (!this.nif || !this.password) {
      alert('Complete Form');
      return;
    }
    this.session.login(this.nif, this.password).subscribe(
      () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'Employee') {
          this.router.navigate(['employee']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        alert(error.error);
        console.log(error);
      }
    );
  }
}
