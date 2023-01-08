import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Announcement } from '../models/announcement';
import { IAnnouncementHandler } from '../models/announcement-handler';

import { formatDate } from '@angular/common';
import { randomInt } from 'crypto';
import { end } from '@popperjs/core';
import { ProviderAccount } from '../models/providerAccount';

@Injectable({
  providedIn: 'root',
})
export class UtilioService {
  readonly apiUrl = 'https://localhost:7069/api';

  private headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/announcement');
  }

  getPagesAnnouncement(page: number, recordsPerPage: number) {
    let body = {
      paging: {
        page: page,
        totalRecords: 0,
        recordsPerPage: recordsPerPage,
        pages: 0,
      },
    };

    return this.http.post<any>(
      'https://localhost:7069/api/announcement/paged',
      body
    );
  }

  deleteAnnouncement(notificationId: number) {
    return this.http.delete<number>(
      this.apiUrl + '/announcement?id=' + notificationId
    );
  }

  editAnnouncement(
    announcementId: number,
    providerId: number,
    title: string,
    publishDate: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    url: any,
    description: string,
    uniqueIdentifier: string,
    content: string,
    rawLog: any,
    addInfo: string,
    regions: number[],
    streets: number[]
  ) {
    let referenceStartDate = startDate + 'T' + startTime;

    let referenceEndDate = endDate + 'T' + endTime;

    let body = {
      providerId: providerId,
      title: title,
      publishDate: publishDate,
      referenceStartDate: referenceStartDate,
      referenceEndDate: referenceEndDate,
      sourceUrl: url,
      description: description,
      uniqueIdentifier: uniqueIdentifier,
      content: content,
      rawLog: rawLog,
      additionalInformation: addInfo,
      regions: regions,
      streets: streets,
      id: announcementId,
    };
    console.log(body);
    return this.http.put(
      'https://localhost:7069/api/announcement?id=' + announcementId,
      body
    );
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/regions');
  }

  getStreets(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/streets');
  }

  postAnnouncement(
    providerId: number,
    title: string,
    url: any,
    description: string,
    content: string,
    adInfo: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    regions: number[],
    streets: number[]
  ) {
    console.log(regions);
    console.log(streets);
    let referenceStartDate = startDate + 'T' + startTime;

    let referenceEndDate = endDate + 'T' + endTime;
    let body = {
      providerId: providerId,
      title: title,
      publishDate: formatDate(
        new Date(),
        'yyyy-MM-ddThh:mm:ss',
        'en'
      ).toString(),
      referenceStartDate: referenceStartDate,
      referenceEndDate: referenceEndDate,
      sourceUrl: url,
      description: description,
      uniqueIdentifier:
        'test' + formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en').toString(),
      content: content,
      rawLog: 'test',
      additionalInformation: adInfo,
      regions: regions,
      streets: streets,
    };
    let body2 = JSON.stringify(body);
    console.log(JSON.stringify(body));
    return this.http.post<any>('https://localhost:7069/api/announcement', body);
  }
  getLogs(
    page: number,
    recordsPerPage: number,
    logParameters: any = {},
    sortCriteria: any = undefined
  ) {
    let body = {
      paging: {
        page: page,
        recordsPerPage: recordsPerPage,
      },
      logParameters: logParameters,
      sortCriteria: sortCriteria,
    };

    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(
      'https://localhost:7069/api/ProviderAggregator/pagedLogs',
      body,
      { headers }
    );
  }
  postAnnouncement2(values: any) {
    console.log(values);
  }

  //Handling announcements
  async handleAnnouncements() {
    return this.http.get<IAnnouncementHandler[]>(
      'https://localhost:7069/api/handleAnnouncements'
    );
  }

  getProviders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/providers`);
  }

  getProviderAccounts(): Observable<ProviderAccount[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/provideraccount`, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }

  getAccountsForProvider(id: number): Observable<ProviderAccount> {
    return this.http
      .get<ProviderAccount>(`${this.apiUrl}/provideraccount/provider/${id}`, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }


  getProviderAccount(id: number): Observable<ProviderAccount> {
    return this.http
      .get<ProviderAccount>(`${this.apiUrl}/provideraccount/${id}`, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }

  postProviderAccount(providerAccount: ProviderAccount): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/provideraccount`, providerAccount, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }

  deleteProviderAccount(userId: number) {
    return this.http
      .delete(`${this.apiUrl}/provideraccount/${userId}`, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }

  updateProviderAccount(
    id: number,
    providerAccount: ProviderAccount
  ): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/provideraccount/${id}`, providerAccount, {
        headers: new HttpHeaders(this.headerDict),
      })
      .pipe(catchError(() => of()));
  }
}
