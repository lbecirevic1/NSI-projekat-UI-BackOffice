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

deleteAnnouncement(notificationId:number){
    return this.http.delete<number>(this.apiUrl+'announcement?id='+notificationId);
  }

  editAnnouncement(){
    //todo
  }
}
