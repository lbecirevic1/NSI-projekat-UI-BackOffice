import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilioService{
  readonly apiUrl='https://localhost:7069/api/';
  readonly realAPIUrl='https://utilio-core-service.azurewebsites.net/api/'

  
  private headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
    
  };

  constructor(private http: HttpClient) {
  }

  getAnnouncements(): Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7069/api/announcement');
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.realAPIUrl + 'regions',{
      headers: new HttpHeaders(this.headerDict),
    });
  }

  getStreets(): Observable<any[]> {
    return this.http.get<any[]>(this.realAPIUrl + 'streets',{
      headers: new HttpHeaders(this.headerDict),
    })
  }

  deleteAnnouncement(notificationId:number){
    return this.http.delete<number>(this.apiUrl+'announcement?id='+notificationId);
  }

  editAnnouncement(){
    //todo
  }

  createSubscriber(subscriber: any): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'Subscriber/Post', subscriber);
  }
  updateSubscriber(subscriber:any): Observable<any>{
    return this.http.put<any>(this.apiUrl + 'Subscriber/Update', subscriber);
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
  getProviders():Observable<any[]>{
    return this.http.get<any[]>(this.realAPIUrl + 'providers',{
      headers: new HttpHeaders(this.headerDict),
    });
  }
  addSubscriptionForUser(subscription:any ): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'Subscription/Post', subscription);
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
}
