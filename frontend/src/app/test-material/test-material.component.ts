import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

const AdminUserTest = {
  nif: 100000012,
  password: 'password',
};

@Component({
  selector: 'app-test-material',
  templateUrl: './test-material.component.html',
  styleUrls: ['./test-material.component.css'],
})
export class TestMaterialComponent implements OnInit {
  errors: String;

  constructor(public session: SessionService) {}

  ngOnInit(): void {
    const request = this.session
      .login(AdminUserTest.nif, AdminUserTest.password)
      .subscribe();
  }
}
