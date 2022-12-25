import {Component, getNgModuleById, OnInit, ViewChild} from '@angular/core';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";
import {FormBuilder, NgForm} from '@angular/forms';
import {Region} from "../../../models/region";
import {Street} from "../../../models/street";


@Component({
  selector:    'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {

  @ViewChild('createForm', { static: false }) createForm!: NgForm;

  public notifications: Announcement[] = [];

  public liveDemoVisible = false;
  public editFormVisible = false;
  public createFormVisible = false;

  public regions: Region[]=[];

  public streets:Street[]=[];

  public clickedStreets:number[]=[];

  public clickedRegions:number[]=[];

  public formBuilder: any;

  title:any;

  public doubleAnnouncementVisible=false;

  public createAnnouncementVisible=false;

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
    this.formBuilder = FormBuilder;

  }


  ngOnInit() {
    this.service.getAnnouncements().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let notification = new Announcement(data[i].id,data[i].providerId, data[i].title, data[i].sourceUrl, data[i].description, data[i].content, data[i].rawLog,data[i].uniqueIdentifier, data[i].additionalInformation,data[i].publishDate,data[i].referenceStartDate, data[i].referenceEndDate)
        this.notifications.push(notification);
      }

    })

    this.service.getRegions().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let region=new Region(data[i].id,data[i].name,data[i].code,data[i].regionTypeId,data[i].parentRegionId,data[i].createDate);
        this.regions.push(region);
      }
    })

    this.service.getStreets().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let street=new Street(data[i].id,data[i].name,data[i].createDate,data[i].regionId);
        this.streets.push(street);
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

  toggleCreateAnnouncementButton() {
    this.createFormVisible = !this.createFormVisible;
  }

  showValue(event: any){

    var Title = event.target.value;
    console.log(Title);

  }


  handleCreateAnnouncement(event:boolean) {
    this.createAnnouncementVisible=event;

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

  submitForm(values:any){
    this.service.postAnnouncement(values.newAnnouncProviderId,values.newAnnouncTitle,
      values.newAnnouncUrl,values.newAnnouncDescription,values.newAnnouncContent,
      values.newAnnouncAddInfo,values.newAnnouncStartDate,values.newAnnouncEndDate,
      values.newAnnouncStartTime,values.newAnnouncEndTime,this.clickedRegions,this.clickedStreets);
  }

streetClicked(streetId:number){
    if(this.clickedStreets.includes(streetId)){
      const index: number = this.clickedStreets.indexOf(streetId);
      if (index !== -1) {
        this.clickedStreets.splice(index, 1);
      }
    }
    this.clickedStreets.push(streetId);
    console.log(this.clickedStreets);

}

regionClicked(regionId:number){
    this.clickedRegions.push(regionId);
    console.log(regionId);
}


}

