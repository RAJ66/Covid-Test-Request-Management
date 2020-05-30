import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-request-page',
  templateUrl: './create-request-page.component.html',
  styleUrls: ['./create-request-page.component.css'],
})
export class CreateRequestPageComponent implements OnInit {
  request: any = {};
  riskGroup: string;
  riskProfession: string;
  saude24: string;

  constructor() {}

  ngOnInit(): void {}

  submitRequest() {
    this.request.riskGroup = String(true) == this.riskGroup;
    this.request.riskProfession = String(true) == this.riskProfession;
    this.request.saude24 = String(true) == this.saude24;
  }
}
