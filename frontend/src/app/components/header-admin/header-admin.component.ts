import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  constructor(public session: SessionService, public data: DataService) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }

  showProfile() {
    this.data.changeinformation(JSON.parse(localStorage.getItem('user')).nif);
  }
}
