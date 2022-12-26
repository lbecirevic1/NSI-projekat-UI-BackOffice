import { Component, OnInit } from '@angular/core';

import { UtilioService } from '../../../service/utilio.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  public logs = [
    { col1: 'X', col2: 'Y', col3: 'Z' },
    { col1: 'X', col2: 'Y', col3: 'Z' },
    { col1: 'X', col2: 'Y', col3: 'Z' },
    { col1: 'X', col2: 'Y', col3: 'Z' },
  ];
  constructor(private service: UtilioService) {}

  ngOnInit() {
    console.log('fetch logs', this.logs);
  }
}
