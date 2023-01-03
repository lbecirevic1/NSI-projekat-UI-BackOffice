import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../../service/utilio.service";
import { Announcement} from "../../../models/announcement";
import {FormBuilder, NgForm} from '@angular/forms';
import {Region} from "../../../models/region";
import {Street} from "../../../models/street";
import {UtilioProvider} from "../../../models/utilioProvider";
import {IDropdownSettings} from "ng-multiselect-dropdown";

@Component({
  selector:    'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
  export class RegionComponent implements OnInit {

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

  additionalInfoVisible = false;
  public openCoverages = false;
  public indexSelectedCoverage = 0;

    toggleCollapse(index : number): void {
    // @ts-ignore
    this.additionalInfoVisible = !this.additionalInfoVisible;
    this.indexSelectedCoverage = index;
  }


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
    
        // this.dropdownSettingsProviders= {
        //   singleSelection: false,
        //   idField: 'Id',
        //   textField: 'Name',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 5,
        //   allowSearchFilter: true
        // };
    
    
      }
  
  }