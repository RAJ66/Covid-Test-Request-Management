import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  login: boolean;

  constructor(public session: SessionService) {}

  ngOnInit(): void {}

  logout() {
    this.session.logout().subscribe();
  }
}
