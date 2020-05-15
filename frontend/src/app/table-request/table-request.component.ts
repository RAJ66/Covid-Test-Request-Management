import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.css'],
})
export class TableRequestComponent implements OnInit {
  list = [];
  displayedColumns: string[] = ['position', 'name'];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3333/apiv1/requests', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.list = res.requestList;
      });
  }
}
