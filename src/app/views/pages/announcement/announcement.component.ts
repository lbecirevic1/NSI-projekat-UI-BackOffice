import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit{

  constructor(private service:UtilioService) { }
  notifications:Announcement[]=[
  ];

  public liveDemoVisible = false;
  public editFormVisible = false;

  public deleteItemId=0;
  public editAnnouncement:any;

  ngOnInit(){
    this.service.getAnnouncements().subscribe(data=>{

      for(let i=0;i<data.length;i++){
        let notification=new Announcement(data[i].id,data[i].title,data[i].sourceUrl,data[i].description,data[i].content,data[i].publishDate,data[i].additionalInformation,
          data[i].referenceStartDate,data[i].referenceEndDate)
        this.notifications.push(notification);
      }})

  //  let nova=new Announcement(1,"test","test","test",'test',new Date(2022,12,17),"test",new Date(2022,12,17),new Date(2022,12,17));
  ///this.notifications.push(nova);
  }


  toggleDeleteButton(itemId:number) {
    this.liveDemoVisible = !this.liveDemoVisible;
    this.deleteItemId=itemId;
  }

  closeDeleteButton() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }
  toggleEditButtonDemo(item:any){
    this.toggleEditDemo();
    this.editAnnouncement=item;
  }
  toggleEditDemo(){
    this.editFormVisible = !this.editFormVisible;

  }

  handleEditModalChange(event: boolean){
    this.editFormVisible = event;
  }

  refreshAnnouncements(){
    this.service.getAnnouncements().subscribe(data=>{
      console.log(data[0]);
      for(let i=0;i<data.length;i++){
        this.notifications.push(data[i]);
      }
    })
  }

  deleteItem() {
    this.service.deleteAnnouncement(this.deleteItemId).subscribe();
    this.deleteItemId = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  editItem(){
    //to do
  }
}
