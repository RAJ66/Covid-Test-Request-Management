import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(public session: SessionService, public router: Router) {}

  ngOnInit(): void {
    /*
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate(['/home']);
    } else {
      if (this.user.role == 'Admin') {
        this.router.navigate(['/dashboard']);
      } else if (this.user.role == 'Employee') {
        this.router.navigate(['/table']);
      } else {
        this.router.navigate(['/home']);
      }
    }*/
  }

  logout() {
    this.session.logout().subscribe();
  }
}
