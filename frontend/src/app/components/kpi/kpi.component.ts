import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css'],
})
export class KpiComponent implements OnInit {
  @Input()
  icon: String;
  @Input()
  text: String;
  @Input()
  resolte: String;
  @Input()
  alt: String;

  constructor() {}

  ngOnInit(): void {}
}
