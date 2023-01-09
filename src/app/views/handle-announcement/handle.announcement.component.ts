import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IAnnouncementHandler } from 'src/app/models/announcement-handler';
import { UtilioService } from 'src/app/service/utilio.service';

@Component({
  selector: 'app-handle-announcement',
  templateUrl: './handle.announcement.component.html',
  styleUrls: ['./handle.announcement.component.scss'],
})
export class AnnouncementHandlerComponent implements OnInit {

  public announcements: IAnnouncementHandler[] = [];

  public displayedAnnouncements: IAnnouncementHandler[] = [];

  public enableFiltering: boolean = false;

  @Input() public startDate: any;
  @Input() public endDate: any;
  @Input() public dateType: number = 1;

  @Input() public filterType: boolean = false;
  @Input() public identifyPart: string = "";

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
    this.displayedAnnouncements = this.announcements;
  }

  public handleFiltering() {
    if (this.filterType) {
      if (this.dateType == 1) this.displayedAnnouncements = this.announcements.filter(element => this.endDate > new Date(element.createDate.split('/').reverse().join('/')) && this.startDate <= new Date(element.createDate.split('/').reverse().join('/')));
      else if (this.dateType == 2) this.displayedAnnouncements = this.announcements.filter(element => this.endDate > new Date(element.modifiedDate.split('/').reverse().join('/')) && this.startDate <= new Date(element.modifiedDate.split('/').reverse().join('/')));
      else if (this.dateType == 3) this.displayedAnnouncements = this.announcements.filter(element => this.endDate > new Date(element.lastTimeNotified.split('/').reverse().join('/')) && this.startDate <= new Date(element.lastTimeNotified.split('/').reverse().join('/')));
    }
    else this.filterByIdentifier();
  }

  public startDateChange(event: any) {
    this.startDate = new Date(event.target.value);
  }

  public endDateChange(event: any) {
    this.endDate = new Date(event.target.value);
  }

  public showFiltering() {
    if (this.enableFiltering) {
      this.displayedAnnouncements = this.announcements;
      this.dateType = 1
      this.filterType = false;
    }
    this.enableFiltering = !this.enableFiltering;
  }

  public changeFilterDateType(option: number) {
    this.dateType = option;
  }

  public setFilterType(type: boolean) {
    this.filterType = type;
  }

  public changeIdentifierInput(event: any) {
    this.identifyPart = event.target.value;
  }

  public filterByIdentifier() {
    this.displayedAnnouncements = this.announcements.filter(element => element.identifier.toLowerCase().includes(this.identifyPart.toLowerCase()) || element.subscriberIdentifier.toLowerCase().includes(this.identifyPart.toLowerCase()) || element.id.toString().toLowerCase().includes(this.identifyPart.toLowerCase()) || element.subscriptionEntryIdentifier.toLowerCase().includes(this.identifyPart.toLowerCase()) || element.subscriptionIdentifier.toLowerCase().includes(this.identifyPart.toLowerCase()))
  }
}
