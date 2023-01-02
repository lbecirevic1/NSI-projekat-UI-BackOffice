import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";
import {FormBuilder, NgForm} from '@angular/forms';
import {Region} from "../../../models/region";
import {Street} from "../../../models/street";
import {UtilioProvider} from "../../../models/utilioProvider";
import {IDropdownSettings} from "ng-multiselect-dropdown";


@Component({
  selector:    'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {

  @ViewChild('createForm', { static: false }) createForm!: NgForm;

  public notifications: Announcement[] = [];
  dropdownSettingsRegions:IDropdownSettings={
    singleSelection: false,
    idField: 'regions',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsStreets:IDropdownSettings={
    singleSelection: false,
    idField: 'streets',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsProviders:IDropdownSettings={
    singleSelection: false,
    idField: 'providers',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };


  public liveDemoVisible = false;
  public editFormVisible = false;
  public createFormVisible = false;

  public contentDemoVisible=false;

  public addInfoDemoVisible=false;

  public descriptionDemoVisible=false;

  public regions: Region[]=[];

  public streets:Street[]=[];

  public providers:UtilioProvider[]=[];

  public clickedStreets:number[]=[];

  public clickedRegions:number[]=[];

  public clickedProviders:number[]=[]

  public formBuilder: any;

  title:any;

  public announcementDescription:any;

  public announcementAddInfo:any;

  public announcementContent:any;

  public doubleAnnouncementVisible=false;

  public createAnnouncementVisible=false;

  public deleteItemId = 0;
  public editAnnouncement: any;

  public AllRegions:number[]=[];

  public AllStreets:number[]=[];

  public AllProviders:number[]=[];


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
        this.AllRegions.push(region.Id);
      }
    })

    this.service.getStreets().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let street=new Street(data[i].id,data[i].name,data[i].createDate,data[i].regionId);
        this.streets.push(street);
        this.AllStreets.push(street.Id);
      }
    });

    this.service.getProviders().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let provider=new UtilioProvider(data[i].id,data[i].name,data[i].code,data[i].webSite,data[i].createDate)
        this.providers.push(provider);
        this.AllProviders.push(provider.Id)
      }
    })
    //  let nova=new Announcement(1,"test","test","test",'test',new Date(2022,12,17),"test",new Date(2022,12,17),new Date(2022,12,17));
    ///this.notifications.push(nova);

    this.dropdownSettingsRegions= {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettingsStreets= {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettingsProviders= {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };


  }

  onDeselectRegions(item:any){
    const index:number=this.clickedRegions.indexOf(item.Id);
    this.clickedRegions.forEach((element,index)=>{
      if(element==item.Id)this.clickedRegions.splice(index,1);
    })
    console.log(this.clickedRegions)
  }

  onDeselectStreets(item:any){
    const index:number=this.clickedStreets.indexOf(item.Id);
    this.clickedStreets.forEach((element,index)=>{
      if(element==item.Id)this.clickedStreets.splice(index,1);
    })
    console.log(this.clickedStreets)
  }

  onDeselectProviders(item:any){
    const index:number=this.clickedProviders.indexOf(item.Id);
    this.clickedProviders.forEach((element,index)=>{
      if(element==item.Id)this.clickedProviders.splice(index,1);
    })
    console.log(this.clickedProviders)
  }



  onRegionSelect(item: any) {
    console.log(item)
    if(this.clickedRegions.includes(item.Id)){
      console.log("ima")
      const index:number=this.clickedRegions.indexOf(item.Id);
      this.clickedRegions.forEach((element,index)=>{
        if(element==item.Id)this.clickedRegions.splice(index,1);
      })
      console.log(this.clickedRegions)
    }
   this.regionClicked(item)
  }


  onStreetsSelect(item: any) {
    console.log(item)
    if(this.clickedStreets.includes(item.Id)){
      console.log("ima")
      const index:number=this.clickedStreets.indexOf(item.Id);
      this.clickedStreets.forEach((element,index)=>{
        if(element==item.Id)this.clickedStreets.splice(index,1);
      })
      console.log(this.clickedStreets)
    }
    this.streetClicked(item)
  }

  onProviderSelect(item: any) {
    console.log(item)
    if(this.clickedProviders.includes(item.Id)){
      console.log("ima")
      const index:number=this.clickedProviders.indexOf(item.Id);
      this.clickedProviders.forEach((element,index)=>{
        if(element==item.Id)this.clickedProviders.splice(index,1);
      })
      console.log(this.clickedProviders)
    }
    this.providerClicked(item)
  }


  onSelectAll(items: any) {
    console.log(items);
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
    this.clickedProviders=[];
    this.clickedStreets=[];
    this.clickedRegions=[];
    this.createFormVisible = !this.createFormVisible;
  }

  showValue(event: any){

    var Title = event.target.value;
    console.log(Title);

  }


  handleCreateAnnouncement(event:boolean) {
    console.log(this.regions)
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
let resp=this.service.postAnnouncement(values.newAnnouncProviderId,values.newAnnouncTitle,
      values.newAnnouncUrl,values.newAnnouncDescription,values.newAnnouncContent,
      values.newAnnouncAddInfo,values.newAnnouncStartDate,values.newAnnouncEndDate,
      values.newAnnouncStartTime,values.newAnnouncEndTime,this.clickedRegions,this.clickedStreets);
if(resp==true){
  this.createFormVisible = !this.createFormVisible;
  this.handleDoubleAnnouncement(true);
  this.doubleAnnouncementVisible=true;
}
  }

streetClicked(street:any){
    let streetId=street.Id;
    if(this.clickedStreets.includes(streetId)){
      const index: number = this.clickedStreets.indexOf(streetId);
     this.clickedStreets.forEach((element,index)=>{
       if(element==streetId)this.clickedStreets.splice(index,1);
     })
    }
    else this.clickedStreets.push(streetId);
    console.log(this.clickedStreets);

}

regionClicked(region:any){
    let regionId=region.Id
    if(this.clickedRegions.includes(regionId)){
      const index:number=this.clickedRegions.indexOf(regionId);
      this.clickedRegions.forEach((element,index)=>{
        if(element==regionId)this.clickedRegions.splice(index,1);
      })
    }
    else this.clickedRegions.push(regionId);
    console.log(this.clickedRegions);
}

  providerClicked(provider:any){
    let providerId=provider.Id
    if(this.clickedProviders.includes(providerId)){
      const index:number=this.clickedProviders.indexOf(providerId);
      this.clickedProviders.forEach((element,index)=>{
        if(element==providerId)this.clickedProviders.splice(index,1);
      })
    }
    else this.clickedProviders.push(providerId);
    console.log(this.clickedProviders);
  }

showDescription(description:string){
this.announcementDescription=description;
  this.descriptionDemoVisible = !this.descriptionDemoVisible;
}


showAddInfo(addInfo:string){
this.announcementAddInfo=addInfo;
this.addInfoDemoVisible=!this.addInfoDemoVisible;
}

showContent(content:string){
this.announcementContent=content;
this.contentDemoVisible=!this.contentDemoVisible;
}

handleContentVisible(event:boolean){
    this.contentDemoVisible=event;
}

handleAddInfoVisible(event:boolean){
    this.addInfoDemoVisible=event;
}

handleDescriptionVisible(event:boolean){
    this.descriptionDemoVisible=event;
}

parseDate(date:string){
    if(date==null){
      return "/"
    }
  let start=date.indexOf("-")
  let start2=date.lastIndexOf("-")
  let time=date.indexOf("T")
  let godina=date.substring(0,start)
  let mjesec=date.substring(start+1,start2)
  let dan=date.substring(start2+1,time)

  if(dan.length==1){
    dan='0'+dan;
  }
  if(mjesec.length==1){
    mjesec='0'+mjesec;
  }
  let end;
   end=date.length;

  let startT=date.indexOf(":")
  let startT2=date.lastIndexOf(":")
  let startH=date.substring(time+1,startT)
  let startM=date.substring(startT+1,startT2)
  let startS=date.substring(startT2+1,end)

 let datum=dan+"-"+mjesec+"-"+godina+ " "+startH+":"+startM+":"+startS;
  return datum;
}

onSelectAllRegions(items:any){
 this.clickedRegions=this.AllRegions;
 console.log(this.clickedRegions);
}

onDeselectAllRegions(items:any){
    this.clickedRegions=[]
  console.log(this.clickedRegions)
}

  onSelectAllStreets(items:any){
    this.clickedStreets=this.AllStreets;
    console.log(this.clickedStreets);
  }

  onDeselectAllStreets(items:any){
    this.clickedStreets=[]
    console.log(this.clickedStreets)
  }

  onSelectAllProviders(items:any){
    this.clickedProviders=this.AllProviders;
    console.log(this.clickedProviders);
  }

  onDeselectAllProviders(items:any){
    this.clickedProviders=[]
    console.log(this.clickedProviders)
  }



}

