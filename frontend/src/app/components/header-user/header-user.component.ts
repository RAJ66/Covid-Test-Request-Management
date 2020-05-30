import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css'],
})
export class HeaderUserComponent implements OnInit {
  constructor(public session: SessionService) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }
}
