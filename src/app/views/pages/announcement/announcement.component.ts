import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {Region} from "../../../models/region";
import {Street} from "../../../models/street";
import {UtilioProvider} from "../../../models/utilioProvider";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTimepicker,
  NgbTimeStruct,
  NgbTimepickerModule
} from "@ng-bootstrap/ng-bootstrap";
import {formatDate, JsonPipe} from "@angular/common";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector:    'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {


  @ViewChild('createForm', { static: false }) createForm!: NgForm;
  public notifications: Announcement[] = [];
  timeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

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
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsEditProviders:IDropdownSettings={
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsEditRegions:IDropdownSettings={
    singleSelection: false,
    idField: 'editRegions',
    textField: 'Name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };


  public modelStartDate: any;

  public modelEndDate:any;

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

  public editProviders:any[]=[]

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

  public editRegions:number[]=[]


  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  additionalInfoVisible = false;
  public openCoverages = false;
  public indexSelectedCoverage = 0;

    toggleCollapse(index : number): void {
    // @ts-ignore
    this.additionalInfoVisible = !this.additionalInfoVisible;
    this.indexSelectedCoverage = index;
  }


  constructor(private service: UtilioService ) {
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
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };

    this.dropdownSettingsEditProviders= {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };

    this.dropdownSettingsEditRegions= {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
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

  onDeselectEditProviders(item:any){
    const index:number=this.editProviders.indexOf(item.Id);
    this.editProviders.forEach((element,index)=>{
      if(element==item.Id)this.editProviders.splice(index,1);
    })
    console.log(this.editProviders)
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

  onProviderEditSelect(item: any) {
    console.log(item)
    if(this.editProviders.includes(item.Id)){
      console.log("ima")
      const index:number=this.editProviders.indexOf(item.Id);
      this.editProviders.forEach((element,index)=>{
        if(element==item.Id)this.editProviders.splice(index,1);
      })
      console.log(this.editProviders)
    }
    this.providerEditClicked(item)
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
    this.editAnnouncement = item;
    let tmp=[]
    tmp.push(this.getProvider(item.ProviderId))
    console.log(tmp)
    this.editProviders=tmp
    console.log(this.editProviders)
    this.toggleEditDemo();
  }

  getProvider(item:any){
      let returnProvider:any
    for(let i=0;i<this.providers.length;i++){
      if(this.providers.at(i)?.Id==item){
        returnProvider=this.providers.at(i)
      }
    }
    return {id:item,name:returnProvider.Name}
  }

  getRegions(item:any){
      let regionsEdit:[]

  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;
  }

  toggleCreateAnnouncementButton() {
    this.clickedProviders=[];
    this.clickedStreets=[];
    this.clickedRegions=[];
    this.modelEndDate='';
    this.modelStartDate='';
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
    let providerId=this.clickedProviders.at(0);
  let startDate='';
    let endDate='';
    let startTime='';
    let endTime='';
if(this.modelStartDate.day==undefined){
  startDate=(formatDate(new Date(), 'yyyy-MM-dd', 'en')).toString();
}else {
  startDate = this.modelStartDate.year + "-" + this.modelStartDate.month + "-" + this.modelStartDate.day;
}

if(this.modelEndDate.day==undefined){
      endDate=(formatDate(new Date(), 'yyyy-MM-dd', 'en')).toString();
}else {
  endDate = this.modelEndDate.year + "-" + this.modelEndDate.month + "-" + this.modelEndDate.day;
    }

startDate=this.dateFormat(this.modelStartDate)
endDate=this.dateFormat(this.modelEndDate)
startTime=this.timeFormat(this.timeStart)
endTime=this.timeFormat(this.timeEnd)
  if(providerId!=null)
this.service.postAnnouncement(providerId,values.newAnnouncTitle,
      values.newAnnouncUrl,values.newAnnouncDescription,values.newAnnouncContent,
      values.newAnnouncAddInfo,startDate,endDate,
      startTime,endTime,this.clickedRegions,this.clickedStreets).subscribe(data=>{
        this.handleCreateAnnouncement(false);

})

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

  providerEditClicked(provider:any){
    let providerId=provider.Id
    if(this.editProviders.includes(providerId)){
      const index:number=this.editProviders.indexOf(providerId);
      this.editProviders.forEach((element,index)=>{
        if(element==providerId)this.editProviders.splice(index,1);
      })
    }
    else this.editProviders.push(providerId);
    console.log(this.editProviders);
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

  providerName(itemId:number){
  let name=''
  for(let i=0;i<this.providers.length;i++){
    if(this.providers.at(i)?.Id==itemId){
      // @ts-ignore
      name=this.providers.at(i).Name;
    }

  }
  return name;
}

timeFormat(time:any){
  let finalTime=''
  if(time.hour.toString().length==1){
    finalTime='0'+time.hour+":"
  }
  else finalTime=time.hour+":"
  if(time.minute.toString().length==1){
    finalTime=finalTime+'0'+time.minute+":"
  }
  else finalTime=finalTime+time.minute+":"
  if(time.second.toString().length==1){
    finalTime=finalTime+'0'+time.second
  }
  else finalTime=finalTime+time.second

  return finalTime
}

dateFormat(date:any){
      let finalDate=''
  finalDate=date.year+"-"
  if(date.month.toString().length==1){
    finalDate=finalDate+'0'+date.month+"-"
  }
  else finalDate=finalDate+date.month+"-"
  if(date.day.toString().length==1){
    finalDate=finalDate+'0'+date.day
  }
  else finalDate=finalDate+date.day

  return finalDate
}

}

