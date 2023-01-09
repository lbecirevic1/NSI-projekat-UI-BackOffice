import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../service/utilio.service";
import { Announcement} from "../../models/announcement";
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {Region,RegionAll} from "../../models/region";
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
  selector:    'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
  export class RegionComponent implements OnInit {

    @ViewChild('createForm', { static: false }) createForm!: NgForm;
  @ViewChild('editRegionForm', { static: false }) editRegionForm!: NgForm;

  public regionTypeId: number = -1;
  public status: boolean | number = -1;
  public modelStartDate: any;
  public createAnnouncementVisible = false;

  public liveDemoVisible = false;
  public editFormVisible = false;
  public createFormVisible = false;

  public contentDemoVisible=false;

  public addInfoDemoVisible=false;

  public descriptionDemoVisible=false;

  public regions: Region[]=[];
  public regionsAll: RegionAll[]=[];
  public regionsTypes: RegionType[]=[];
  public cleared: boolean = false;
 

  public  selectedRegion : any;
  public selectedType: any ;

  public formBuilder: any;


  public deleteItemId = 0;
  public editRegion: any;

  public AllRegions:number[]=[];

  constructor(private service: UtilioService ) {
    this.formBuilder = FormBuilder;

  }
  ngOnInit() {
    this.setRegions(-1);
    this.service.getRegions().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let region=new Region(data[i].id,data[i].name,data[i].code,data[i].regionTypeId,data[i].parentRegionId,data[i].createDate);
        this.regions.push(region);
        this.AllRegions.push(region.Id);
      }
    })
    this.service.getRegionTypes().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let region=new RegionType(data[i].id,data[i].name,data[i].code);
        this.regionsTypes.push(region);
        
      }
    })
  }
  setRegions(typeId: number){
    this.regionsAll = [];
    this.regionsAll.length = 0;
    this.service.getRegionsAll(typeId).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let region=new RegionAll(data[i].id,data[i].name,data[i].code,data[i].regionTypeId,data[i].regionType,data[i].parentRegionId,data[i].parentRegion,data[i].createDate);
        this.regionsAll.push(region);
      }
    })
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
    this.editRegion = item;
    this.selectedRegion = item.ParentregionId;
    this.selectedType = item.RegionTypeId;
    this.toggleEditDemo();
  }
  onClearFilter() {
    this.cleared = true;
    this.refreshRegions();
  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;
  }

  toggleEditDemoClose() {
    this.editFormVisible = !this.editFormVisible;
  }
  toggleCreateRegionButton() {
    this.createFormVisible = !this.createFormVisible;
  }

  handleCreateRegion(event:boolean) {
    this.createAnnouncementVisible=event;
  }
  handleEditModalChange(event: boolean) {
    this.editFormVisible = event;
  }

  deleteItem() {
    this.service.deleteRegion(this.deleteItemId).subscribe(data=>{
      this.deleteItemId = 0;
      this.liveDemoVisible = !this.liveDemoVisible;
      this.refreshRegions();
    });
    this.refreshRegions()
  }


  refreshRegions() {
    window.location.reload();
  }
  submitForm(values:any){
    this.service.postRegion(values.newName, values.newCode, values.parentRegionId, values.regionTypeId,"null")
    .subscribe(data=>{
      this.createFormVisible=!this.createFormVisible
      this.refreshRegions()
    },
    error=>{
      this.createFormVisible=false
    })
    

  }
  onChange(event: any, isType: boolean) {
    this.cleared = false;
    isType
      ? (this.regionTypeId = Number(event.target.value))
      : (this.status =
          event.target.value === 'true'
            ? true
            : event.target.value === 'false'
            ? false
            : -1);
    
    if(this.regionTypeId == -1)
    this.setRegions(-1);
    else {
      this.setRegions(this.regionTypeId);
    }
  }

  saveEdited(region:any,values:any){
    // @ts-ignore
    let name=document.getElementById('regionTitleInput1').value;
    // @ts-ignore
    let code=document.getElementById('regionTitleInput2').value;
   
    let regionId=region.Id;

    this.service.editRegion(regionId,name, code, this.selectedRegion, this.selectedType,"").subscribe(data=>{
      this.handleEditModalChange(false);
      this.editFormVisible=!this.editFormVisible
      this.refreshRegions()
    })
  }

  
  }

  