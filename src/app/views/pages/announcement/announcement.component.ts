import { Component, OnInit } from '@angular/core';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";


@Component({
  selector:    'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  public notifications: Announcement[] = [];

  public liveDemoVisible = false;
  public editFormVisible = false;

  public doubleAnnouncementVisible=false;

  public deleteItemId = 0;
  public editAnnouncement: any;

  time: Date = new Date();

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  constructor(private service: UtilioService) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.service.getAnnouncements().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let notification = new Announcement(data[i].id, data[i].title, data[i].sourceUrl, data[i].description, data[i].content, data[i].rawLog,data[i].uniqueIdentifier, data[i].additionalInformation,data[i].publishDate,data[i].referenceStartDate, data[i].referenceEndDate)
        this.notifications.push(notification);
      }

    })

    //  let nova=new Announcement(1,"test","test","test",'test',new Date(2022,12,17),"test",new Date(2022,12,17),new Date(2022,12,17));
    ///this.notifications.push(nova);
  }


  toggleDeleteButton(itemId: number) {
    this.liveDemoVisible = !this.liveDemoVisible;
    this.deleteItemId = itemId;
  }

  closeDeleteButton() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }

  toggleEditButtonDemo(item: any) {
    this.toggleEditDemo();
    this.editAnnouncement = item;
  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;

  }

  handleEditModalChange(event: boolean) {
    this.editFormVisible = event;
  }

  refreshAnnouncements() {
    this.service.getAnnouncements().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.notifications.push(data[i]);
      }
    })
  }

  deleteItem() {
    this.service.deleteAnnouncement(this.deleteItemId).subscribe();
    this.deleteItemId = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  doubleAnnouncement(){
    this.doubleAnnouncementVisible=!this.doubleAnnouncementVisible;
  }

  handleDoubleAnnouncement(event: boolean){
    this.doubleAnnouncementVisible=event;
  }



}
