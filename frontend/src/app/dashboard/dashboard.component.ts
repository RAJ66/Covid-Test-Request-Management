import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../services/dashboard.service';

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
  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.list().subscribe((res: any) => {
      this.total = res.requestTotal;
      this.neg = res.requestTotalNeg;
      this.pos = res.requestTotalPos;
      this.def = res.requestTotalUn;
      console.log(res);
    });
  }
}
