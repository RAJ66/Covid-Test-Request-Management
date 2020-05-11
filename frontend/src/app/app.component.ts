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
  list = [];
  displayedColumns: string[] = ['position', 'name'];
  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
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

    this.http
      .get('http://localhost:3333/apiv1/requests')
      .subscribe((res: any) => {
        this.list = res.requestList;
      });
  }
}
