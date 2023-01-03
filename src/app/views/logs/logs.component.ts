import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Log, LogsResponse, LogWithTime, Paging } from '../../models/log';

import { UtilioService } from '../../service/utilio.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})

export class LogsComponent implements OnInit {
  public logs: LogWithTime[] = [];
  public paging: Paging = {};
  public pages: number[] = [];
  public providers: {name: string, id: number}[] = [];
  public providerId: number = -1;
  public status: boolean | number = -1;
  public recordsPerPage: number = 5;
  public logParameters: any = {};
  public cleared: boolean = false;
  constructor(private service: UtilioService) {}

  createLogsArray(data: LogsResponse) {
    return data.data?.map((log: Log) => {return {
      id: log.id,
      requestStartDate: dayjs(log.requestStartTime).format("MMM D, YYYY"),
      requestStartTime: dayjs(log.requestStartTime).format("HH:mm:ss"),
      requestEndDate: dayjs(log.requestEndTime).format("MMM D, YYYY"),
      requestEndTime: dayjs(log.requestEndTime).format("HH:mm:ss"),
      status: log.success ? 'Success' : 'Failure',
      providerName: log.providerName,
      providerId: log.providerId,
    }});
  }

  ngOnInit() {
    this.service.getLogs(1, this.recordsPerPage).subscribe((data: LogsResponse) => {
      this.logs = this.createLogsArray(data);
      this.paging = data.paging;
      this.pages = Array.from({length: data.paging.pages || 1}, (value, key) => key + 1)

    });
    this.service.getProviders().subscribe(data=>{
     this.providers = data?.map((provider: any) => {return {id: provider.id, name: provider.name}});
    })
  }

  onPageChange(page: number) {
    this.paging.page = page;
    this.service.getLogs(this.paging.page, this.recordsPerPage).subscribe((data: any) => {
      this.logs = this.createLogsArray(data);
    });
  }

  onPageChangeNext(next: boolean) {
    next && this.paging.page ? this.paging.page += 1 : this.paging.page! -= 1;

    this.service.getLogs(this.paging.page!, this.recordsPerPage).subscribe((data: any) => {
      this.logs = this.createLogsArray(data);
    });

  }

  onChange(event: any, isProvider: boolean) {
    isProvider ? this.providerId = Number(event.target.value) : 
    this.status = event.target.value === 'true' ? true :  
    event.target.value === 'false' ? false : -1;

    this.logParameters = {}
    this.providerId !== -1 && event.target.value !== -1 && Object.assign(this.logParameters, {providerId: this.providerId});
    this.status !== -1 && Object.assign(this.logParameters, {success: this.status});

    this.service.getLogs(this.paging.page!, this.recordsPerPage, this.logParameters).subscribe((data: any) => {
      this.logs = this.createLogsArray(data);
      this.paging = data.paging;
      this.pages = Array.from({length: data.paging.pages || 1}, (value, key) => key + 1)
    });
  }

  onChangeNumberOfRows(event: any) {
    this.recordsPerPage = Number(event.target.value);
    this.service.getLogs(this.paging.page!, this.recordsPerPage, this.logParameters).subscribe((data: any) => {
      this.logs = this.createLogsArray(data);
      this.paging = data.paging;
      this.pages = Array.from({length: data.paging.pages || 1}, (value, key) => key + 1)
    });
  }

  onClearFilter() {
    console.log("CLICKED!");
    this.logParameters = {};
    this.cleared = true;
    this.service.getLogs(this.paging.page!, this.recordsPerPage, this.logParameters).subscribe((data: any) => {
      this.logs = this.createLogsArray(data);
      this.paging = data.paging;
      this.pages = Array.from({length: data.paging.pages || 1}, (value, key) => key + 1)
    });
  }

}
