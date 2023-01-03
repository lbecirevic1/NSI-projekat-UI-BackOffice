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
import {LogsResponse, Paging} from "../../../models/log";
@Component({
  selector:    'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {


  @ViewChild('createForm', { static: false }) createForm!: NgForm;
  @ViewChild('editAnnouncForm', { static: false }) editAnnouncForm!: NgForm;

  public paging: Paging = {};
  public pages: number[] = [];

  public notifications: Announcement[] = [];
  timeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeStartEdit: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeEndEdit: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
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

  dropdownSettingsEditStreets:IDropdownSettings={
    singleSelection: false,
    idField: 'editStreets',
    textField: 'Name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };


  public modelStartDate: any;

  public modelEndDate:any;

  public modelEditStartDate:any;

  public modelEditEndDate:any;

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

  public editStreets:number[]=[]
  public recordsPerPage: number = 5;

  additionalInfoVisible = false;
  public openCoverages = false;
  public indexSelectedCoverage = 0;

  toggleCollapse(index : number): void {
    // @ts-ignore
    this.additionalInfoVisible = !this.additionalInfoVisible;
    this.indexSelectedCoverage = index;
  }


  constructor(private service: UtilioService ) {
    this.formBuilder = FormBuilder;

  }
  setAnnouncements(page: number) {
    this.service
      .getPagesAnnouncement(page, this.recordsPerPage)
      .subscribe(data => {
        console.log(data.data)
        this.notifications=[];
        for (let i = 0; i < data.data.length; i++) {
          let notification = new Announcement(data.data[i].id, data.data[i].providerId, data.data[i].title,
            data.data[i].sourceUrl, data.data[i].description, data.data[i].content, data.data[i].rawLog,
            data.data[i].uniqueIdentifier, data.data[i].additionalInformation, data.data[i].publishDate,
            data.data[i].referenceStartDate, data.data[i].referenceEndDate)
          this.notifications.push(notification);
        }
        this.paging = data.paging;
        this.pages = Array.from(
          { length: data.paging.pages || 1 },
          (value, key) => key + 1
        );
      });
  }

  ngOnInit() {
    this.setAnnouncements(1);

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
      idField: 'Id',
      textField: 'Name',
      allowSearchFilter: true
    };

    this.dropdownSettingsEditProviders= {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettingsEditRegions= {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettingsEditStreets= {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };



  }
  onPageChange(page: number) {
    this.paging.page = page;
    this.setAnnouncements(this.paging.page!);
  }

  onPageChangeNext(next: boolean) {
    if(next && this.paging.page){
      this.paging.page=this.paging.page+1
    }
    else this.paging.page!-=1
    this.setAnnouncements(this.paging.page!);
  }
  onChangeNumberOfRows(event: any) {
    this.recordsPerPage = Number(event.target.value);
    this.setAnnouncements(this.paging.page!);
  }
  onDeselectRegions(item:any){
    const index:number=this.clickedRegions.indexOf(item.Id);
    this.clickedRegions.forEach((element,index)=>{
      if(element==item.Id)this.clickedRegions.splice(index,1);
    })
  }

  onDeselectStreets(item:any){
    const index:number=this.clickedStreets.indexOf(item.Id);
    this.clickedStreets.forEach((element,index)=>{
      if(element==item.Id)this.clickedStreets.splice(index,1);
    })
  }

  onDeselectProviders(item:any){
    const index:number=this.clickedProviders.indexOf(item.Id);
    this.clickedProviders.forEach((element,index)=>{
      if(element==item.Id)this.clickedProviders.splice(index,1);
    })
  }

  onDeselectEditProviders(item:any){
    const index:number=this.editProviders.indexOf(item.Id);
    this.editProviders.forEach((element,index)=>{
      if(element==item.Id)this.editProviders.splice(index,1);
    })
  }



  onRegionSelect(item: any) {
    console.log(item)
    if(this.clickedRegions.includes(item.Id)){
      const index:number=this.clickedRegions.indexOf(item.Id);
      this.clickedRegions.forEach((element,index)=>{
        if(element==item.Id)this.clickedRegions.splice(index,1);
      })
    }
    this.regionClicked(item)
  }


  onStreetsSelect(item: any) {
    console.log(item)
    if(this.clickedStreets.includes(item.Id)){
      const index:number=this.clickedStreets.indexOf(item.Id);
      this.clickedStreets.forEach((element,index)=>{
        if(element==item.Id)this.clickedStreets.splice(index,1);
      })
    }
    this.streetClicked(item)
  }

  onProviderSelect(item: any) {
    if(this.clickedProviders.includes(item.Id)){
      const index:number=this.clickedProviders.indexOf(item.Id);
      this.clickedProviders.forEach((element,index)=>{
        if(element==item.Id)this.clickedProviders.splice(index,1);
      })
    }
    this.providerClicked(item)
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
    console.log(item)
    let tmp=[]
    tmp.push(this.getProvider(item.ProviderId))
    this.editProviders=tmp
    this.toggleEditDemo();
  }

  getProvider(item:any){
    let returnProvider:any
    for(let i=0;i<this.providers.length;i++){
      if(this.providers.at(i)?.Id==item){
        returnProvider=this.providers.at(i)
      }
    }
    return returnProvider
  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;


  }

  toggleEditDemoClose() {
    this.editFormVisible = !this.editFormVisible;
    this.editProviders=[]
    this.editStreets=[]
    this.editRegions=[]
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
    window.location.reload();
  }

  deleteItem() {
    this.service.deleteAnnouncement(this.deleteItemId).subscribe(data=>{
      this.deleteItemId = 0;
      this.liveDemoVisible = !this.liveDemoVisible;
    });
    this.refreshAnnouncements()
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
      startDate=this.dateFormat(this.modelStartDate)
    }

    if(this.modelEndDate.day==undefined){
      endDate=(formatDate(new Date(), 'yyyy-MM-dd', 'en')).toString();
    }else {
      endDate=this.dateFormat(this.modelEndDate)
    }

    startTime=this.timeFormat(this.timeStart)
    endTime=this.timeFormat(this.timeEnd)
    console.log(startDate)
    if(providerId!=null)
      this.service.postAnnouncement(providerId,values.newAnnouncTitle,
        values.newAnnouncUrl,values.newAnnouncDescription,values.newAnnouncContent,
        values.newAnnouncAddInfo,startDate,endDate,
        startTime,endTime,this.clickedRegions,this.clickedStreets).subscribe(data=>{
          this.handleCreateAnnouncement(false);
          this.createFormVisible=!this.createFormVisible
          this.refreshAnnouncements()
        },
        error=>{
          this.createFormVisible=false
          this.handleCreateAnnouncement(false);
          this.doubleAnnouncementVisible=!this.doubleAnnouncementVisible
          this.handleDoubleAnnouncement(true);
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
  }

  providerEditClicked(provider:any){
    let providerId=provider.Id
    this.editProviders.splice(0,1);
    this.editProviders.push(this.getProvider(providerId))
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
  }

  onDeselectAllRegions(items:any){
    this.clickedRegions=[]
  }

  onSelectAllStreets(items:any){
    this.clickedStreets=this.AllStreets;
  }

  onDeselectAllStreets(items:any){
    this.clickedStreets=[]
  }

  onSelectAllProviders(items:any){
    this.clickedProviders=this.AllProviders;
  }

  onDeselectAllProviders(items:any){
    this.clickedProviders=[]
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

  onEditSelectAllRegions(items:any){
    this.editRegions=this.AllRegions;
  }

  onEditDeselectAllRegions(items:any){
    this.editRegions=[]
  }

  onEditDeselectRegions(item:any){
    const index:number=this.editRegions.indexOf(item.Id);
    this.editRegions.forEach((element,index)=>{
      if(element==item.Id)this.editRegions.splice(index,1);
    })
  }

  onEditRegionSelect(item: any) {
    if(this.editRegions.includes(item.Id)){
      const index:number=this.editRegions.indexOf(item.Id);
      this.editRegions.forEach((element,index)=>{
        if(element==item.Id)this.editRegions.splice(index,1);
      })
    }
    this.regionEditClicked(item)
  }
  regionEditClicked(region:any){
    let regionId=region.Id
    if(this.editRegions.includes(regionId)){
      const index:number=this.editRegions.indexOf(regionId);
      this.editRegions.forEach((element,index)=>{
        if(element==regionId)this.editRegions.splice(index,1);
      })
    }
    else this.editRegions.push(regionId);
  }


  onEditSelectAllStreets(items:any){
    this.editStreets=this.AllStreets;
  }

  onEditDeselectAllStreets(items:any){
    this.editStreets=[]
  }

  onEditDeselectStreets(item:any){
    const index:number=this.editStreets.indexOf(item.Id);
    this.editStreets.forEach((element,index)=>{
      if(element==item.Id)this.editStreets.splice(index,1);
    })
  }

  onEditStreetSelect(item: any) {
    if(this.editStreets.includes(item.Id)){
      const index:number=this.editStreets.indexOf(item.Id);
      this.editStreets.forEach((element,index)=>{
        if(element==item.Id)this.editStreets.splice(index,1);
      })
    }
    this.streetEditClicked(item)
  }
  streetEditClicked(street:any){
    let streetId=street.Id
    if(this.editStreets.includes(streetId)){
      const index:number=this.editStreets.indexOf(streetId);
      this.editStreets.forEach((element,index)=>{
        if(element==streetId)this.editStreets.splice(index,1);
      })
    }
    else this.editStreets.push(streetId);
  }


  saveEdited(announcement:any,values:any){
    console.log(announcement)
    // @ts-ignore
    let title=document.getElementById('announcementTitleInput1').value;
    // @ts-ignore
    let url=document.getElementById('announcementTitleInput2').value
    // @ts-ignore
    let description=document.getElementById('announcementTitleInput3').value
    // @ts-ignore
    let content=document.getElementById('announcementTitleInput4').value
    // @ts-ignore
    let addInfo=document.getElementById('announcementTitleInput5').value
    let announcementId=announcement.Id;
    let announcementRaw=announcement.RawLog
    let announcementUnique=announcement.UniqueIdentifier

    let regionsEdit:number[]=[]
    for(let i=0;i<this.editRegions.length-1;i++){
      // @ts-ignore
      regionsEdit.push(this.editRegions.at(i).Id)
    }
    let streetsEdit:number[]=[]
    for(let i=0;i<this.editStreets.length-1;i++){
      // @ts-ignore
      streetsEdit.push(this.editStreets.at(i).Id)
    }

    let startDateEdit='';
    let endDateEdit='';
    let startTimeEdit='';
    let endTimeEdit='';
    if(this.modelEditStartDate==undefined){
      startDateEdit=(formatDate(new Date(), 'yyyy-MM-dd', 'en')).toString();
    }else {
      startDateEdit=this.dateFormat(this.modelEditStartDate)
    }

    if(this.modelEditEndDate==undefined){
      endDateEdit=(formatDate(new Date(), 'yyyy-MM-dd', 'en')).toString();
    }else {
      endDateEdit=this.dateFormat(this.modelEditEndDate)
    }

    startTimeEdit=this.timeFormat(this.timeStartEdit)
    endTimeEdit=this.timeFormat(this.timeEndEdit)

    let publishDate=(formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en')).toString();

    let providerId=this.editProviders.at(0).Id;
    this.service.editAnnouncement(announcementId,providerId,title,publishDate,startDateEdit,
      endDateEdit,startTimeEdit,endTimeEdit,url,description,announcementUnique,content,announcementRaw,addInfo,
      regionsEdit,streetsEdit).subscribe(data=>{
      this.handleEditModalChange(false);
      this.editFormVisible=!this.editFormVisible
      this.refreshAnnouncements()
    })
  }

}

