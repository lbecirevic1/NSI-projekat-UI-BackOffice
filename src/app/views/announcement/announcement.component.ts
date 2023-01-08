import {Component, getNgModuleById, Injectable, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../service/utilio.service";
import {Announcement} from "../../models/announcement";
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {Region} from "../../models/region";
import {Street} from "../../models/street";
import {UtilioProvider} from "../../models/utilioProvider";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTimepicker,
  NgbTimeStruct,
  NgbTimepickerModule, NgbDateAdapter, NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import {formatDate, JsonPipe} from "@angular/common";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Paging} from "../../models/announcement";
import {parseDate} from "ngx-bootstrap/chronos";

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + '.' + date.month + '.' + date.year : '';
  }
}

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
  minuteStep = 1;
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

  public regions: Region[]=[];

  public streets:Street[]=[];

  public providers:UtilioProvider[]=[];

  public clickedStreets:number[]=[];

  public clickedRegions:number[]=[];

  public clickedProviders:number[]=[]

  public editProviders:any[]=[]

  public editStreetsAnnouncement:any[]=[]

  public editRegionsAnnouncement:any[]=[]

  public formBuilder: any;

  title:any;
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


  constructor(private service: UtilioService,private dateAdapter: NgbDateAdapter<string> ) {
    this.formBuilder = FormBuilder;

  }
  setAnnouncements(page: number) {
    this.service
      .getPagesAnnouncement(page, this.recordsPerPage)
      .subscribe(data => {
        this.notifications=[];
        for (let i = 0; i < data.data.length; i++) {
          let notification = new Announcement(data.data[i].id, data.data[i].providerId, data.data[i].title,
            data.data[i].sourceUrl, data.data[i].description, data.data[i].content, data.data[i].rawLog,
            data.data[i].uniqueIdentifier, data.data[i].additionalInformation, data.data[i].publishDate,
            data.data[i].referenceStartDate, data.data[i].referenceEndDate,data.data[i].streets,data.data[i].regions)
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
    if(this.clickedRegions.includes(item.Id)){
      const index:number=this.clickedRegions.indexOf(item.Id);
      this.clickedRegions.forEach((element,index)=>{
        if(element==item.Id)this.clickedRegions.splice(index,1);
      })
    }
    this.regionClicked(item)
  }


  onStreetsSelect(item: any) {
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
    let tmp=[]
    tmp.push(this.getProvider(item.ProviderId))
    this.editProviders=tmp
    for(let i=0;i<item.regions.length;i++){
      this.editRegionsAnnouncement.push({
        Id:item.regions.at(i).id,
        Name:item.regions.at(i).name
      })
    }
    for(let i=0;i<item.streets.length;i++){
      this.editStreetsAnnouncement.push({
        Id:item.streets.at(i).id,
        Name:item.streets.at(i).name
      })
    }

    let timeStart=this.parseDate(item.ReferenceStartDate,2)
    let timeEnd=this.parseDate(item.ReferenceEndDate,2)
    let dateStart=this.parseDate(item.ReferenceStartDate,1)
    let dateEnd=this.parseDate(item.ReferenceEndDate,1)

    if(timeStart!=undefined && timeStart!="/"){
      let hours=timeStart.substring(0,timeStart.indexOf(":"))
      let minutes=timeStart.substring(timeStart.indexOf(":")+1,timeStart.lastIndexOf(":"))
      let seconds=timeStart.substring(timeStart.lastIndexOf(":")+1,timeStart.length)

      this.timeStartEdit={hour:parseInt(hours),minute:parseInt(minutes),second:parseInt(seconds)}
    }

    if(timeEnd!=undefined && timeEnd!="/"){
      let hours=timeEnd.substring(0,timeEnd.indexOf(":"))
      let minutes=timeEnd.substring(timeEnd.indexOf(":")+1,timeEnd.lastIndexOf(":"))
      let seconds=timeEnd.substring(timeEnd.lastIndexOf(":")+1,timeEnd.length)

      this.timeEndEdit={hour:parseInt(hours),minute:parseInt(minutes),second:parseInt(seconds)}
    }

    if(dateStart!=undefined && dateStart!="/"){
      let day=dateStart.substring(0,dateStart.indexOf("."))
      let month=dateStart.substring(dateStart.indexOf(".")+1,dateStart.lastIndexOf("."))
      let year=dateStart.substring(dateStart.lastIndexOf(".")+1,dateStart.length)
      this.modelEditStartDate=day+"-"+month+"-"+year
    }

    if(dateEnd!=undefined && dateEnd!="/") {
      let day = dateEnd.substring(0, dateEnd.indexOf("."))
      let month = dateEnd.substring(dateEnd.indexOf(".") + 1, dateEnd.lastIndexOf("."))
      let year = dateEnd.substring(dateEnd.lastIndexOf(".") + 1, dateEnd.length)
      this.modelEditEndDate = day+"-"+month+"-"+year
    }

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
    this.editRegionsAnnouncement=[]
    this.editStreetsAnnouncement=[]
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

    if(this.modelStartDate==undefined || this.modelStartDate.length==0){
      startDate=formatDate(new Date(), 'dd-MM-yyyy', 'en').toString();
    }else {
      startDate=this.modelStartDate
    }

    if(this.modelEndDate==undefined || this.modelEndDate.length==0){
      endDate=formatDate(new Date(), 'dd-MM-yyyy', 'en').toString();
    }else {
      endDate=this.modelEndDate
    }

    startTime=this.timeFormat(this.timeStart)
    endTime=this.timeFormat(this.timeEnd)
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
          if(error.status==400) {
            this.createFormVisible = false
            this.handleCreateAnnouncement(false);
            this.doubleAnnouncementVisible = !this.doubleAnnouncementVisible
            this.handleDoubleAnnouncement(true);
          }
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


  parseDate(date:string,mode:number){
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

    if(mode==1){
      return dan+"."+mjesec+"."+godina
    }
    else if(mode==2){
      return startH+":"+startM+":"+startS
    }
    else
      return dan+"."+mjesec+"."+godina+ " "+startH+":"+startM+":"+startS;

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
    this.editRegionsAnnouncement=this.AllRegions;
  }

  onEditDeselectAllRegions(items:any){
    this.editRegionsAnnouncement=[]
  }

  onEditDeselectRegions(item:any){
    const index:number=this.editRegionsAnnouncement.indexOf(item.Id);
    this.editRegionsAnnouncement.forEach((element,index)=>{
      if(element==item.Id)this.editRegionsAnnouncement.splice(index,1);
    })
  }

  onEditRegionSelect(item: any) {
    if(this.editRegionsAnnouncement.includes(item.Id)){
      const index:number=this.editRegionsAnnouncement.indexOf(item.Id);
      this.editRegionsAnnouncement.forEach((element,index)=>{
        if(element==item.Id)this.editRegionsAnnouncement.splice(index,1);
      })
    }
    this.regionEditClicked(item)
  }
  regionEditClicked(region:any){
    let regionId=region.Id
    this.editRegionsAnnouncement.push(regionId);
    this.editRegionsAnnouncement.splice(this.editRegionsAnnouncement.length-1,1);
  }


  onEditSelectAllStreets(items:any){
    this.editStreetsAnnouncement=this.AllStreets;
  }

  onEditDeselectAllStreets(items:any){
    this.editStreetsAnnouncement=[]
  }

  onEditDeselectStreets(item:any){
    const index:number=this.editStreetsAnnouncement.indexOf(item.Id);
    this.editStreetsAnnouncement.forEach((element,index)=>{
      if(element==item.Id)this.editStreetsAnnouncement.splice(index,1);
    })
  }

  onEditStreetSelect(item: any) {
    if(this.editStreetsAnnouncement.includes(item.Id)){
      const index:number=this.editStreetsAnnouncement.indexOf(item.Id);
      this.editStreetsAnnouncement.forEach((element,index)=>{
        if(element==item.Id)this.editStreetsAnnouncement.splice(index,1);
      })
    }
    this.streetEditClicked(item)
  }
  streetEditClicked(street:any){
    let streetId=street.Id
    this.editStreetsAnnouncement.push(streetId);
    this.editStreetsAnnouncement.splice(this.editStreetsAnnouncement.length-1,1);
  }


  saveEdited(announcement:any,values:any){
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
    for(let i=0;i<this.editRegionsAnnouncement.length;i++){
      // @ts-ignore
      regionsEdit.push(this.editRegionsAnnouncement.at(i).Id)
    }
    let streetsEdit:number[]=[]
    for(let i=0;i<this.editStreetsAnnouncement.length;i++){
      // @ts-ignore
      streetsEdit.push(this.editStreetsAnnouncement.at(i).Id)
    }

    let startDateEdit='';
    let endDateEdit='';
    let startTimeEdit='';
    let endTimeEdit='';
    if(this.modelEditStartDate==undefined || this.modelEditStartDate.length==0){
      if(announcement.ReferenceStartDate!=undefined && announcement.ReferenceStartDate!="/" && announcement.ReferenceStartDate.length==0){
        startDateEdit=this.parseDate(announcement.ReferenceStartDate,1)
      }
      else
        startDateEdit=formatDate(new Date(), 'yyyy-MM-dd', 'en').toString();
    }else {
      startDateEdit=this.modelEditStartDate
    }

    if(this.modelEditEndDate==undefined || this.modelEditEndDate.length==0){
      if(announcement.ReferenceEndDate!=undefined && announcement.ReferenceEndDate!="/"){
        endDateEdit=this.parseDate(announcement.ReferenceEndDate,1)
      }
      else
        endDateEdit=formatDate(new Date(), 'yyyy-MM-dd', 'en').toString();
    }else {
      endDateEdit=this.modelEditEndDate
    }

    if(this.timeStartEdit==undefined){
      if(announcement.ReferenceStartDate!=undefined && announcement.ReferenceStartDate!="/"){
        startTimeEdit=this.parseDate(announcement.ReferenceStartDate,2)
      }
      else startTimeEdit=formatDate(new Date(), 'hh:mm:ss', 'en').toString();
    }
    else{
      startTimeEdit=this.timeFormat(this.timeStartEdit)
    }


    if(this.timeEndEdit==undefined){
      if(announcement.ReferenceEndDate!=undefined && announcement.ReferenceEndDate!="/"){
        endTimeEdit=this.parseDate(announcement.ReferenceEndDate,2)
      }
      else endTimeEdit=formatDate(new Date(), 'hh:mm:ss', 'en').toString();
    }
    else{
      endTimeEdit=this.timeFormat(this.timeEndEdit)
    }

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

