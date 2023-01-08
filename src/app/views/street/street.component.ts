import {Component, getNgModuleById, OnInit, Provider, ViewChild} from '@angular/core';

import { UtilioService} from "../../service/utilio.service";
import { Announcement} from "../../models/announcement";
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {Region,RegionAll} from "../../models/region";
import {RegionType} from "../../models/regionType";
import {Street} from "../../models/street";
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
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.scss']
})
  export class StreetComponent implements OnInit {

    @ViewChild('createForm', { static: false }) createForm!: NgForm;
    @ViewChild('editStreetForm', { static: false }) editStreetForm!: NgForm;

  // public paging: Paging = {};
  // public pages: number[] = [];


  public createStreetVisible = false;

  public liveDemoVisible = false;
  public editFormVisible = false;
  public createFormVisible = false;
  public streets: Street[]=[];

  public regions: Region[]=[];

  public  selectedRegion : any;

  public formBuilder: any;

  title:any;


  public deleteItemId = 0;
  public editStreet: any;

  public recordsPerPage: number = 5;

 
  constructor(private service: UtilioService ) {
    this.formBuilder = FormBuilder;

  }
  ngOnInit() {
    this.service.getStreets().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let street=new Street(data[i].id,data[i].name,data[i].createDate,data[i].regionId);
        this.streets.push(street);
      }
    });

    this.service.getRegions().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let region=new Region(data[i].id,data[i].name,data[i].code,data[i].regionTypeId,data[i].parentRegionId,data[i].createDate);
        this.regions.push(region);
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
    console.log(item,"ITEM");
    this.editStreet = item;
    this.selectedRegion = item.regionId;
    this.toggleEditDemo();
  }

  toggleEditDemo() {
    this.editFormVisible = !this.editFormVisible;
  }

  toggleEditDemoClose() {
    this.editFormVisible = !this.editFormVisible;
  }
  toggleCreateStreetButton() {
    this.createFormVisible = !this.createFormVisible;
  }

  // showValue(event: any){

  //   var Title = event.target.value;
  //   console.log(Title);

  // }


  handleCreateStreet(event:boolean) {
    this.createStreetVisible=event;
  }
  handleEditModalChange(event: boolean) {
    this.editFormVisible = event;
  }

  deleteItem() {
    this.service.deleteStreet(this.deleteItemId).subscribe(data=>{
      this.deleteItemId = 0;
      this.liveDemoVisible = !this.liveDemoVisible;
      this.refreshStreet();
    });
    this.refreshStreet()
  }


  refreshStreet() {
    window.location.reload();
  }
  submitForm(values:any){
    this.service.postStreet(values.newName, values.regionId,"null")
    .subscribe(data=>{
      this.createFormVisible=!this.createFormVisible
      this.refreshStreet()
    },
    error=>{
      this.createFormVisible=false
    })
    

  }

  saveEdited(street:any,values:any){
    console.log(street,this.selectedRegion)
    // @ts-ignore
    let name=document.getElementById('regionTitleInput1').value;
   
    let streetId=street.Id;

    this.service.editStreet(streetId, name, this.selectedRegion ,"null").subscribe(data=>{
      this.handleEditModalChange(false);
      this.editFormVisible=!this.editFormVisible
      this.refreshStreet()
    })
  }

  
  }

  