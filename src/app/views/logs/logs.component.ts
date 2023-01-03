import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Log } from '../../models/log';

import { UtilioService } from '../../service/utilio.service';

const logss = {
  "paging": {
    "page": 1,
    "totalRecords": 20,
    "recordsPerPage": 5,
    "pages": 4
  },
  "data": [
    {
      "id": 1,
      "requestStartTime": "2022-12-29T19:21:20.347675",
      "requestEndTime": "2022-12-29T19:21:20.3476895",
      "success": false,
      "providerId": 1,
      "providerName": "JP Elektorprivreda BiH"
    },
    {
      "id": 2,
      "requestStartTime": "2022-12-29T19:21:20.347691",
      "requestEndTime": "2022-12-29T19:21:20.347692",
      "success": false,
      "providerId": 2,
      "providerName": "KJKP Vodovod i kanalizacija Sarajevo"
    },
    {
      "id": 3,
      "requestStartTime": "2022-12-29T19:21:20.3476923",
      "requestEndTime": "2022-12-29T21:21:20.4656375",
      "success": true,
      "providerId": 3,
      "providerName": "KJKP Rad Sarajevo"
    },
    {
      "id": 4,
      "requestStartTime": "2022-12-29T19:21:20.4678872",
      "requestEndTime": "2022-12-29T20:21:20.4679072",
      "success": false,
      "providerId": 4,
      "providerName": "KJKP Sarajevogas Sarajevo"
    },
    {
      "id": 5,
      "requestStartTime": "2022-12-29T19:21:20.4679084",
      "requestEndTime": "2022-12-29T22:21:20.4679151",
      "success": false,
      "providerId": 5,
      "providerName": "KJKP Toplane Sarajevo"
    }
  ],
  "error": null,
  "success": true
}


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  public logs: any[] = [];
  public paging: any = {page: 1,
  totalRecords: 20,
  recordsPerPage: 5,
  pages: 4};
  public pages: any[] = Array.from({length: this.paging.pages}, (value, key) => key + 1);
  constructor(private service: UtilioService) {}

  ngOnInit() {
    // this.service.getLogs(1, 5).subscribe((data: any) => {
    //   this.logs = data.data;
    //   this.paging = data.paging;
    //   console.log('fetch logs', data);
    // });

    this.logs = logss.data;
    this.logs = this.logs.map((log: any) => {return {
      id: log.id,
      requestStartDate: dayjs(log.requestStartTime).format("MMM D, YYYY"),
      requestStartTime: dayjs(log.requestStartTime).format("HH:mm"),
      requestEndDate: dayjs(log.requestEndTime).format("MMM D, YYYY"),
      requestEndTime: dayjs(log.requestEndTime).format("HH:mm"),
      status: log.success ? 'Success' : 'Failure',
      providerName: log.providerName
    }}) 
    console.log('fetch logs', this.logs, this.paging, this.pages);
  }
  onPageChange(page: number) {
    this.paging.page = page;
    // this.service.getLogs(this.paging.page, 5).subscribe((data: any) => {
    //   this.logs = data.data;
    //   this.paging = data.paging;
    //   console.log('fetch logs', data);
    // });

    // this.logs = logss.data;
    // this.logs = this.logs.map((log: any) => {return {
    //   id: log.id,
    //   requestStartDate: dayjs(log.requestStartTime).format("MMM D, YYYY"),
    //   requestStartTime: dayjs(log.requestStartTime).format("HH:mm"),
    //   requestEndDate: dayjs(log.requestEndTime).format("MMM D, YYYY"),
    //   requestEndTime: dayjs(log.requestEndTime).format("HH:mm"),
    //   status: log.success ? 'Success' : 'Failure',
    //   providerName: log.providerName
    // }}) 

   console.log('page change!!', this.paging.page);
  }
  onPageChangeNext(next: boolean) {
    next ? this.paging.page += 1 : this.paging.page -= 1;

    // this.service.getLogs(this.paging.page, 10).subscribe((data: any) => {
    //   this.logs = data.data;
    //   console.log('fetch logs', data);
    // });

    // this.logs = logss.data;
    // this.logs = this.logs.map((log: any) => {return {
    //   id: log.id,
    //   requestStartDate: dayjs(log.requestStartTime).format("MMM D, YYYY"),
    //   requestStartTime: dayjs(log.requestStartTime).format("HH:mm"),
    //   requestEndDate: dayjs(log.requestEndTime).format("MMM D, YYYY"),
    //   requestEndTime: dayjs(log.requestEndTime).format("HH:mm"),
    //   status: log.success ? 'Success' : 'Failure',
    //   providerName: log.providerName
    // }}) 

    console.log('page change!!', this.paging);

  }
}
