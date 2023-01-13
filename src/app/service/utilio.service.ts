import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Announcement } from '../models/announcement';
import { IAnnouncementHandler } from '../models/announcement-handler';

import { formatDate } from '@angular/common';
import { randomInt } from 'crypto';
import { end } from '@popperjs/core';
import { ProviderAccount } from '../models/providerAccount';
import { ProviderRegion } from '../models/providerRegion';

@Injectable({
  providedIn: 'root',
})
export class UtilioService {
  readonly apiUrl = 'https://localhost:7069/api';
  readonly realAPIUrl='https://utilio-core-service.azurewebsites.net/api/'


  private headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
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
    let referenceStartDate = '';
    let day='';
    let month='';
    let year='';

    let referenceEndDate = '';
    let date=startDate.split("-")
    let dateEnd=endDate.split("-")
    if(date[0].length==1) day='0'+date[0]
    else day=date[0]

    if(date[1].length==1)month='0'+date[1]
    else month=date[1]

    year=date[2]


    referenceStartDate=year+"-"+month+"-"+day+"T"+startTime

    if(dateEnd[0].length==1) day='0'+dateEnd[0]
    else day=dateEnd[0]

    if(dateEnd[1].length==1)month='0'+dateEnd[1]
    else month=dateEnd[1]

    year=dateEnd[2]
    referenceEndDate=year+"-"+month+"-"+day+"T"+endTime

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


    return this.http.put(
      'https://localhost:7069/api/announcement?id=' + announcementId,
      body
    );
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/regions');
  }
  getRegionsAll(typeId : number){
    let body = {
      regionTypeId : typeId
    };
    return this.http.post<any[]>('https://localhost:7069/api/regions/all', body);
  }
  getRegionTypes(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/regions/regionTypes');
  }

  getStreets(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/streets');
  }

  postRegion(name: string, code: string, parentRegionId: number, regionTypeId: number,createDate: string) {
    let body = {
      name: name,
      code: code,
      parentRegionId: parentRegionId,
      regionTypeId: regionTypeId
    }
    return this.http.post<any>('https://localhost:7069/api/regions', body)
  }
  editRegion(regionId:number, name: string, code: string, parentRegionId: number, regionTypeId: number,createDate: string) {
    let body = {
      id:regionId,
      name: name,
      code: code,
      parentRegionId: parentRegionId,
      regionTypeId: regionTypeId
    }
    return this.http.put('https://localhost:7069/api/regions?id='+regionId,body)
  }
  deleteRegion(regionId: number) {
    return this.http.delete<number>('https://localhost:7069/api/regions?id=' + regionId);
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

    let referenceStartDate = '';
    let day='';
    let month='';
    let year='';

    let referenceEndDate = '';
    let date=startDate.split("-")
    let dateEnd=endDate.split("-")
    if(date[0].length==1) day='0'+date[0]
    else day=date[0]

    if(date[1].length==1)month='0'+date[1]
    else month=date[1]

    year=date[2]

    referenceStartDate=year+"-"+month+"-"+day+"T"+startTime

    if(dateEnd[0].length==1) day='0'+dateEnd[0]
    else day=dateEnd[0]

    if(dateEnd[1].length==1)month='0'+dateEnd[1]
    else month=dateEnd[1]

    year=dateEnd[2]
    referenceEndDate=year+"-"+month+"-"+day+"T"+endTime

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
      content: content,
      rawLog: 'test',
      additionalInformation: adInfo,
      regions: regions,
      streets: streets,
    };
    let body2 = JSON.stringify(body);

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

  getProviderRegions(id: number): Observable<ProviderRegion[]> {
    return this.http
      .get<any>(`${this.apiUrl}/providerregion/${id}`, {
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

  postProvider(name: string, code: string, webSite: string,createDate: string) {
    let body = {
      name: name,
      code: code,
      webSite: webSite,
    }

    return this.http.post<any>('https://localhost:7069/api/providers', body)
  }

  editProvider(providerId:number,name: string, code: string, webSite: string,createDate: string) {
    let body = {
      id: providerId,
      name: name,
      code: code,
      webSite: webSite,
    }

    return this.http.put('https://localhost:7069/api/providers?id='+providerId,body)
  }
  deleteProvider(providerId: number) {
    return this.http.delete<number>('https://localhost:7069/api/providers?id=' + providerId);
  }

  getStreetAll(typeId : number){
    let body = {
      regionId : typeId
    };
    return this.http.post<any[]>('https://localhost:7069/api/streets/all', body);
  }

  postStreet(name: string, regionId: number,createDate: string) {
    let body = {
      name: name,
      regionId: regionId,
    }
    return this.http.post<any>('https://localhost:7069/api/streets', body)
  }

  createSubscriber(subscriber: any): Observable<any>{
    return this.http.post<any>(this.realAPIUrl + 'Subscriber', subscriber,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  getSubscribers(): Observable<any[]>{
    return this.http.get<any[]>(this.realAPIUrl + 'Subscriber',{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  getSubscriberById(id:number): Observable<any>{
    return this.http.get<any>(this.realAPIUrl + 'Subscriber/' + id ,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  getSubscribtionsBySubscriberId(id:number): Observable<any>{
    return this.http.get<any>(this.realAPIUrl + 'Subscription/user-id/' + id,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  addSubscriptionForUser(subscription:any ): Observable<any>{
    return this.http.post<any>(this.realAPIUrl + 'Subscription', subscription);
  }
  getRegionById(id:number): Observable<any> {
    return this.http.get<any>(this.realAPIUrl + 'regions' + id,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  getStreetById(id:number): Observable<any> {
    return this.http.get<any>(this.realAPIUrl + 'streets' + id,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  addSubscriptionEntry(subscriptionEntry:any){
    return this.http.post<any>(this.realAPIUrl + 'SubscriptionEntry', subscriptionEntry,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  deleteSubscription(id:number){
    return this.http.delete<any>(this.realAPIUrl + 'Subscription?id=' + id,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  updateSubscriber(user:any){
    return this.http.patch<any>(this.realAPIUrl + 'Subscriber?id=' + user.id, user,{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  editStreet(streetId:number, name: string, regionId: number,createDate: string) {
    let body = {
      id:streetId,
      name: name,
      regionId: regionId,
    }
    return this.http.put('https://localhost:7069/api/streets?id='+streetId,body)
  }
  deleteStreet(streetId: number) {
    return this.http.delete<number>('https://localhost:7069/api/streets?id=' + streetId);
  }


}
