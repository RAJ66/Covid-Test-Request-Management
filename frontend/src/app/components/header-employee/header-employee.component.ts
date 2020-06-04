import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header-employee',
  templateUrl: './header-employee.component.html',
  styleUrls: ['./header-employee.component.css'],
})
export class HeaderEmployeeComponent implements OnInit {
  constructor(public session: SessionService, public data: DataService) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }

  showProfile() {
    this.data.changeinformation(JSON.parse(localStorage.getItem('user')).nif);
  }
}
