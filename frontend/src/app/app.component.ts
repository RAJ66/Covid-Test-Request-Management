import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate(['/home']);
    } else {
      if (this.user.role == 'Admin') {
        this.router.navigate(['/dashboard']);
      } else if (this.user.role == 'Employee') {
        this.router.navigate(['/employee']);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }
}
