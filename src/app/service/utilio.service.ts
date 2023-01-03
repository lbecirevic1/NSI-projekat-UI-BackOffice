import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from "../models/announcement";
import { IAnnouncementHandler } from "../models/announcement-handler"

import { formatDate } from '@angular/common';
import {randomInt} from "crypto";

@Injectable({
  providedIn: 'root'
})

export class UtilioService {
  readonly apiUrl = 'https://localhost:7069/api/';

  constructor(private http: HttpClient) {
  }

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

  postAnnouncement(providerId: number, title: string, url: any, description: string,
    content: string, adInfo: string, startDate: string, endDate: string, startTime: string,
    endTime: string, regions: number[],streets:number[]) {

    console.log(regions)
    console.log(streets)
    let referenceStartDate=startDate+"T"+startTime;

    let referenceEndDate =endDate+"T"+endTime;
    let body = {
      providerId: providerId,
      title: title,
      publishDate: (formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en')).toString(),
      referenceStartDate: referenceStartDate,
      referenceEndDate: referenceEndDate,
      sourceUrl: url,
      description: description,
      uniqueIdentifier: 'test26',
      content: content,
      rawLog: 'test',
      additionalInformation: adInfo,
      regions: regions,
      streets: streets

    }
    let body2 = JSON.stringify(body);
    console.log(JSON.stringify(body));
    return this.http.post<any>('https://localhost:7069/api/announcement', body)
  }

  //Handling announcements
  async handleAnnouncements() {
    return this.http.get<IAnnouncementHandler[]>("https://localhost:7069/api/handleAnnouncements");
  }

  getProviders():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7069/api/providers')
  }


}
