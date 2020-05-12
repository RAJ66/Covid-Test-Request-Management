import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  total = 0;
  neg = 0;
  pos = 0;
  def = 0;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3333/apiv1/dashboard')
      .subscribe((res: any) => {
        this.total = res.requestTotal;
        this.neg = res.requestTotalNeg;
        this.pos = res.requestTotalPos;
        this.def = res.requestTotalUn;
        console.log(res);
      });
  }
}
