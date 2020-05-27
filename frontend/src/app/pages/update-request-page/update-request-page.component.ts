import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-update-request-page',
  templateUrl: './update-request-page.component.html',
  styleUrls: ['./update-request-page.component.css'],
})
export class UpdateRequestPageComponent implements OnInit {
  information: string;
  request: any;
  test: string;

  constructor(public data: DataService, public requests: RequestsService) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.requests.getOneRequest(this.information).subscribe((res) => {
      this.request = res.request;
    });
  }

  show() {
    console.log(this.test);
  }
}
