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
  public sortCriteria: any = [];
  public asc: number = 0;
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

  setLogs(page: number) {
    this.service.getLogs(page, this.recordsPerPage, this.logParameters, this.sortCriteria).subscribe((data: LogsResponse) => {
      this.logs = this.createLogsArray(data);
      this.paging = data.paging;
      this.pages = Array.from({length: data.paging.pages || 1}, (value, key) => key + 1)

    });
  }
  ngOnInit() {
    this.setLogs(1);
    this.service.getProviders().subscribe(data=>{
     this.providers = data?.map((provider: any) => {return {id: provider.id, name: provider.name}});
    })
  }

  onPageChange(page: number) {
    this.paging.page = page;
    this.setLogs(this.paging.page!);
  }

  onPageChangeNext(next: boolean) {
    next && this.paging.page ? this.paging.page += 1 : this.paging.page! -= 1;
    this.setLogs(this.paging.page!);
  }

  onChange(event: any, isProvider: boolean) {
    this.cleared = false;
    isProvider ? this.providerId = Number(event.target.value) : 
    this.status = event.target.value === 'true' ? true :  
    event.target.value === 'false' ? false : -1;

    this.logParameters = {}
    this.providerId !== -1 && event.target.value !== -1 && Object.assign(this.logParameters, {providerId: this.providerId});
    this.status !== -1 && Object.assign(this.logParameters, {success: this.status});
    this.setLogs(this.paging.page!);
  }

  onChangeNumberOfRows(event: any) {
    this.recordsPerPage = Number(event.target.value);
    this.setLogs(this.paging.page!)
  }

  onClearFilter() {
    this.logParameters = {};
    this.cleared = true;
    this.setLogs(this.paging.page!);
  }

  onSortColumn(name: string) {
    this.sortCriteria = [{
      column: name,
      order: this.asc,
      priority: 0
    }]

    this.setLogs(this.paging.page!);
    this.asc = !!this.asc ? 0 : 1;
  }
}
