import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { PaginationInstance } from 'ngx-pagination';
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
  public providers: { name: string; id: number }[] = [];
  public providerId: number = -1;
  public status: boolean | number = -1;
  public recordsPerPage: number = 5;
  public logParameters: any = {};
  public sortCriteria: any = [];
  public reqStartDateAsc: number = 0;
  public asc: number = 0;
  public reqEndDateAsc: number = 0;
  public providerNameAsc: number = 0;
  public cleared: boolean = false;
  public req: string = '';
  public res?: string = '';

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 20,
  };

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  constructor(private service: UtilioService) {}

  createLogsArray(data: LogsResponse) {
    return data.data?.map((log: Log) => {
      return {
        id: log.id,
        requestStartDate: dayjs(log.requestStartTime).format(
          'MMM D, YYYY HH:mm:ss'
        ),
        requestEndDate: !!log.requestEndTime
          ? dayjs(log.requestEndTime).format('MMM D, YYYY HH:mm:ss')
          : '',
        status: log.success ? 'Success' : 'Failure',
        providerName: log.providerName,
        providerId: log.providerId,
        numberOfAnnouncements: log.numberOfAnnouncements,
        isRequestSent: log.isRequestSent,
        requestContent: log.requestContent,
        responseContent: log.responseContent,
        more: false,
      };
    });
  }

  setLogs(page: number) {
    this.service
      .getLogs(page, this.recordsPerPage, this.logParameters, this.sortCriteria)
      .subscribe((data: LogsResponse) => {
        this.logs = this.createLogsArray(data);
        this.paging = data.paging;
        this.pages = Array.from(
          { length: data.paging.pages || 1 },
          (value, key) => key + 1
        );
        this.config = {
          id: 'advanced',
          itemsPerPage: this.paging.recordsPerPage!,
          currentPage: this.paging.page!,
          totalItems: this.paging.totalRecords!,
        };
      });
  }
  ngOnInit() {
    this.setLogs(1);
    this.service.getProviders().subscribe((data) => {
      this.providers = data?.map((provider: any) => {
        return { id: provider.id, name: provider.name };
      });
    });
  }

  onPageChange(page: number) {
    this.paging.page = page;
    this.setLogs(this.paging.page!);
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }

  onPageChangeNext(next: boolean) {
    next && this.paging.page
      ? (this.paging.page += 1)
      : (this.paging.page! -= 1);
    this.setLogs(this.paging.page!);
  }

  onChange(event: any, isProvider: boolean) {
    this.cleared = false;
    isProvider
      ? (this.providerId = Number(event.target.value))
      : (this.status =
          event.target.value === 'true'
            ? true
            : event.target.value === 'false'
            ? false
            : -1);

    this.logParameters = {};
    this.providerId !== -1 &&
      event.target.value !== -1 &&
      Object.assign(this.logParameters, { providerId: this.providerId });
    this.status !== -1 &&
      Object.assign(this.logParameters, { success: this.status });
    this.setLogs(this.paging.page!);
  }

  onChangeNumberOfRows(event: any) {
    this.recordsPerPage = Number(event.target.value);
    this.setLogs(this.paging.page!);
  }

  onClearFilter() {
    this.logParameters = {};
    this.cleared = true;
    this.setLogs(this.paging.page!);
  }

  handleOrder(name: string) {
    switch (name) {
      case 'RequestStartTime':
        this.reqStartDateAsc = !!this.reqStartDateAsc ? 0 : 1;
        this.reqEndDateAsc = 0;
        this.providerNameAsc = 0;
        return this.reqStartDateAsc;
      case 'RequestEndTime':
        this.reqEndDateAsc = !!this.reqEndDateAsc ? 0 : 1;
        this.providerNameAsc = 0;
        this.reqStartDateAsc = 0;
        return this.reqEndDateAsc;
      case 'Provider.Name':
        this.providerNameAsc = !!this.providerNameAsc ? 0 : 1;
        this.reqStartDateAsc = 0;
        this.reqEndDateAsc = 0;
        return this.providerNameAsc;
      default:
        return 0;
    }
  }

  onSort(name: string) {
    this.sortCriteria = [
      {
        column: name,
        order: this.handleOrder(name),
        priority: 0,
      },
    ];

    this.setLogs(this.paging.page!);
  }
}
