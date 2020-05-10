import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
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
