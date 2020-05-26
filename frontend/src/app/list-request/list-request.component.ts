import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css'],
})
export class ListRequestComponent implements OnInit {
  list = [];
  constructor(public requests: RequestsService) {}

  ngOnInit(): void {
    this.requests.getRequests(null).subscribe((res: any) => {
      this.list = res.requestList;
    });
  }
}
