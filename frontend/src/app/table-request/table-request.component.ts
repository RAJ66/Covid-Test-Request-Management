import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.css'],
})
export class TableRequestComponent implements OnInit {
  list = [];
  displayedColumns: string[] = ['position', 'name'];
  constructor(public requests: RequestsService) {}

  ngOnInit(): void {
    this.requests.getRequests(null).subscribe((res: any) => {
      this.list = res.requestList;
    });
  }
}
