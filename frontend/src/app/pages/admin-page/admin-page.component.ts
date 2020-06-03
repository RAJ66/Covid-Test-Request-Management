import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  firstDates = [];
  firstValues = [];
  secondDates = [];
  secondValues = [];

  constructor(public requests: RequestsService) {}

  ngOnInit(): void {
    this.requests.requestsStats().subscribe((res) => {
      this.firstDates = res.firstDates;
      this.firstValues = res.firstValues;
      this.secondDates = res.secondDates;
      this.secondValues = res.secondValues;

      for (let i = 0; i < this.firstDates.length; i++) {
        this.firstDates[i] = "'" + this.firstDates[i] + "'";

        if (this.firstDates[i] === "'null'") {
          this.firstDates[i] = "'Undefined'";
        }
      }

      for (let i = 0; i < this.firstDates.length; i++) {
        this.secondDates[i] = "'" + this.secondDates[i] + "'";

        if (this.secondDates[i] === "'null'") {
          this.secondDates[i] = "'Undefined'";
        }
      }

      console.log(this.secondDates[0]);
    });
  }
}
