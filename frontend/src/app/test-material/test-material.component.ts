import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

const AdminUserTest = {
  nif: 100000010,
  password: 'password',
};

@Component({
  selector: 'app-test-material',
  templateUrl: './test-material.component.html',
  styleUrls: ['./test-material.component.css'],
})
export class TestMaterialComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .post('http://localhost:3333/apiv1/login', AdminUserTest, httpOptions)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
