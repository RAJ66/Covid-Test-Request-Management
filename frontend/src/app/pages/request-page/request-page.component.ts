import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  information: string;
  request: any;

  constructor(public data: DataService, public requests: RequestsService) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.requests.getOneRequest(this.information).subscribe((res) => {
      this.request = res.request;
    });
  }
}
