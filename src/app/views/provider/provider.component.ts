import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../service/utilio.service";
import { Announcement} from "../../models/announcement";
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {Region,RegionAll} from "../../models/region";
// import {Provider} from "../../models/provider";
import {RegionType} from "../../models/regionType";
import {Street} from "../../models/street";
import {UtilioProvider} from "../../models/utilioProvider";
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
import {LogsResponse, Paging} from "../../models/log";

@Component({
  selector:    'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
  export class ProviderComponent implements OnInit {

    @ViewChild('createForm', { static: false }) createForm!: NgForm;
  @ViewChild('editProviderForm', { static: false }) editProviderForm!: NgForm;

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


  public providers:UtilioProvider[]=[];
  public AllProviders:number[]=[];
  public modelStartDate: any;
  public createProviderVisible = false;

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
  public regionsAll: RegionAll[]=[];
  public regionsTypes: RegionType[]=[];
 

  public  selectedRegion : any;
  public selectedType: any ;



  public formBuilder: any;

  title:any;


  public deleteItemId = 0;
  public editProvider: any;

  public AllRegions:number[]=[];


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
  ngOnInit() {

    this.service.getProviders().subscribe(data=>{
        for(let i=0;i<data.length;i++){
          let provider=new UtilioProvider(data[i].id,data[i].name,data[i].code,data[i].webSite,data[i].createDate)
          this.providers.push(provider);
          this.AllProviders.push(provider.Id)
        }
      })
  }
  // onPageChange(page: number) {
  //   this.paging.page = page;
  //   this.setAnnouncements(this.paging.page!);
  // }

  // onPageChangeNext(next: boolean) {
  //   if(next && this.paging.page){
  //     this.paging.page=this.paging.page+1
  //   }
  //   else this.paging.page!-=1
  //   this.setAnnouncements(this.paging.page!);
  // }
  // onChangeNumberOfRows(event: any) {
  //   this.recordsPerPage = Number(event.target.value);
  //   this.setAnnouncements(this.paging.page!);
  // }



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
    this.editProvider = item;
    this.selectedRegion = item.ParentregionId;
    this.selectedType = item.RegionTypeId;
    this.toggleEditDemo();
  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;
  }

  toggleEditDemoClose() {
    this.editFormVisible = !this.editFormVisible;
    this.editStreets=[]
    this.editRegions=[]
  }
  toggleCreateProviderButton() {
    this.modelEndDate='';
    this.modelStartDate='';
    this.createFormVisible = !this.createFormVisible;
  }

  handleCreateProvider(event:boolean) {
    this.createProviderVisible=event;
  }
  handleEditModalChange(event: boolean) {
    this.editFormVisible = event;
  }

  deleteItem() {
    this.service.deleteProvider(this.deleteItemId).subscribe(data=>{
      this.deleteItemId = 0;
      this.liveDemoVisible = !this.liveDemoVisible;
      this.refreshProvider();
    });
    this.refreshProvider()
  }


  refreshProvider() {
    window.location.reload();
  }
  submitForm(values:any){
    this.service.postProvider(values.newName, values.newCode, values.newWebSite,"null")
    .subscribe(data=>{
      this.createFormVisible=!this.createFormVisible
      this.refreshProvider()
    },
    error=>{
      this.createFormVisible=false
    })
    

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


  saveEdited(provider:any,values:any){
    // @ts-ignore
    let name=document.getElementById('providerTitleInput1').value;
    // @ts-ignore
    let code=document.getElementById('providerTitleInput2').value;
    // @ts-ignore
    let webSite=document.getElementById('providerTitleInput3').value;
   
    let providerId=provider.Id;

    this.service.editProvider(providerId,name, code, webSite,"").subscribe(data=>{
      this.handleEditModalChange(false);
      this.editFormVisible=!this.editFormVisible
      this.refreshProvider()
    })
  }

  
  }

  