import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  constructor(public session: SessionService) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }
}
