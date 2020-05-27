import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RequestsService } from '../../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-request-page',
  templateUrl: './update-request-page.component.html',
  styleUrls: ['./update-request-page.component.css'],
})
export class UpdateRequestPageComponent implements OnInit {
  information: string;
  request: any;
  testResultPending: string = 'Pending';

  equal: boolean;

  constructor(
    public data: DataService,
    public requests: RequestsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.requests.getOneRequest(this.information).subscribe((res) => {
      this.request = res.request;
      this.equal = this.request.firstTestResult !== this.testResultPending;
    });
  }

  updateRequest(event) {
    event.preventDefault();
    this.requests
      .updateRequest(this.request._id, this.request)
      .subscribe(() => {
        this.router.navigate(['/employee/request']);
      });
  }
}
