import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-employee',
  templateUrl: './header-employee.component.html',
  styleUrls: ['./header-employee.component.css'],
})
export class HeaderEmployeeComponent implements OnInit {
  constructor(public session: SessionService, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }
}
