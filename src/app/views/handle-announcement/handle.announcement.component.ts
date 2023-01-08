import { Component, OnInit } from '@angular/core';
import { IAnnouncementHandler } from 'src/app/models/announcement-handler';
import { UtilioService } from 'src/app/service/utilio.service';

@Component({
  selector: 'app-handle-announcement',
  templateUrl: './handle.announcement.component.html',
  styleUrls: ['./handle.announcement.component.scss'],
})
export class AnnouncementHandlerComponent implements OnInit {

  public announcements: IAnnouncementHandler[] = [];

  public enableFiltering: boolean = false;

  constructor(private service: UtilioService) { }

  ngOnInit() {
    this.service.handleAnnouncements().then(response => {
      response.forEach(data => {
        data.forEach(element => {
          var cDate = new Date(element.createDate);
          var mDate = new Date(element.modifiedDate);
          var nDate = new Date(element.lastTimeNotified);
          element.createDate = cDate.toLocaleDateString();
          element.modifiedDate = mDate.toLocaleDateString();
          element.lastTimeNotified = nDate.toLocaleDateString();
          this.announcements.push(element);
        });
      })
    });
  }

  public handleFiltering() {
    this.enableFiltering = !this.enableFiltering;
  }
}
