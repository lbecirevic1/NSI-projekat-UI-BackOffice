import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilioService{
  readonly apiUrl='https://localhost:7069/api/';

  constructor(private http: HttpClient) {
  }

  getAnnouncements(): Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7069/api/announcement');
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/regions');
  }

  getStreets(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7069/api/streets')
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
    return this.http.get<any[]>(this.apiUrl + 'Subscriber/GetSubscribers');
  }
  getSubscriberById(id:number): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'Subscriber/GetSubscriber/' + id );
  }
  getSubscribtionsBySubscriberId(id:number): Observable<any>{
    return this.http.get<any>(this.apiUrl + 'Subscriber/GetSubscribtionsBySubscriberId/' + id );
  }
  getProviders():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'providers');
  }
  addSubscriptionForUser(subscription:any ): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'Subscription/Post', subscription);
  }
}
