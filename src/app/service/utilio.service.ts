import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from "../models/announcement";
import { IAnnouncementHandler } from "../models/announcement-handler"

import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilioService {
  readonly apiUrl = 'https://localhost:7069/api/';

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/announcement');
  }

  deleteAnnouncement(notificationId: number) {
    return this.http.delete<number>(this.apiUrl + 'announcement?id=' + notificationId);
  }

  editAnnouncement() {
    //todo
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/regions');
  }

  getStreets(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/streets')
  }

  postAnnouncement(providerId: string, title: string, url: any, description: string,
    content: string, adInfo: string, startDate: string, endDate: string, startTime: string,
    endTime: string, streets: number[],
    regions: number[]) {
    let start = startDate.indexOf("/")
    let start2 = startDate.lastIndexOf("/")
    let dan = startDate.substring(0, start)
    let mjesec = startDate.substring(start + 1, start2)
    let godina = startDate.substring(start2 + 1, startDate.length)

    if (dan.length == 1) {
      dan = '0' + dan;
    }
    if (mjesec.length == 1) {
      mjesec = '0' + mjesec;
    }

    let startT = startTime.indexOf(":")
    let startT2 = startTime.lastIndexOf(":")
    let startH = startTime.substring(0, startT)
    let startM = startTime.substring(startT + 1, startT2)
    let startS = startTime.substring(startT2 + 1, startTime.length)

    let end = endDate.indexOf("/")
    let end2 = endDate.lastIndexOf("/")
    let danEnd = endDate.substring(0, end)
    let mjesecEnd = endDate.substring(end + 1, end2)
    let godinaEnd = endDate.substring(end2 + 1, endDate.length)

    let endT = endTime.indexOf(":")
    let endT2 = endTime.lastIndexOf(":")
    let endH = endTime.substring(0, endT)
    let endM = endTime.substring(endT + 1, endT2)
    let endS = endTime.substring(endT2 + 1, endTime.length)

    let referenceStartDate = godina + '-' + mjesec + '-' + dan + 'T' + startH + ':' + startM + ':' + startS;

    let referenceEndDate = godinaEnd + '-' + mjesecEnd + '-' + danEnd + 'T' + endH + ':' + endM + ':' + endS;

    let body = {
      providerId: providerId,
      title: title,
      publishDate: (formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en')).toString(),
      referenceStartDate: referenceStartDate,
      referenceEndDate: referenceEndDate,
      sourceUrl: url,
      description: description,
      uniqueIdentifier: 'test',
      content: content,
      rawLog: 'test',
      additionalInformation: adInfo,
      regions: regions,
      streets: streets

    }
    let body2 = JSON.stringify(body);
    let errorR = false;
    console.log(JSON.stringify(body));
    this.http.post<any>('https://localhost:7069/api/announcement', body).subscribe(
      data => { },
      error => { console.log(error.status); errorR = true; }
    )
    return errorR;
  }
  getLogs(page: number, recordsPerPage: number) {
    let body = {
      paging: {
        page: page,
        recordsPerPage: recordsPerPage,
      },
      logParameters: {},
    };

    return this.http.post<any>(
      'https://localhost:7069/api/ProviderAggregator/pagedLogs',
      body
    );
  }
  postAnnouncement2(values: any) {
    console.log(values);
  }


  //Handling announcements
  async handleAnnouncements() {
    return this.http.get<IAnnouncementHandler[]>("https://localhost:7069/api/handleAnnouncements");
  }

  getProviders():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7069/api/providers')
  }


}
