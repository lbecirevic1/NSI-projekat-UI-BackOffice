import { Component, OnInit } from '@angular/core';
import { Log } from '../../../models/log';

import { UtilioService } from '../../../service/utilio.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  public logs: Log[] = [];
  constructor(private service: UtilioService) {}

  ngOnInit() {
    this.service.getLogs(1, 10).subscribe((data: any) => {
      this.logs = data.data;
      console.log('fetch logs', data);
    });
    console.log('fetch logs', this.logs);
  }
}
