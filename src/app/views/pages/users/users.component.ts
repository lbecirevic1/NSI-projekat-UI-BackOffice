import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilioProvider } from 'src/app/models/utilioProvider';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount} from "../../../models/providerAccount";
import {IDropdownSettings} from "ng-multiselect-dropdown";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: ProviderAccount[] = [];
  public clickedProviders:number[]=[]
  public accounts: ProviderAccount[] = [];
  public providers:UtilioProvider[]=[];

  constructor(private service: UtilioService, private router: Router ) {

  }
  setAccounts() {
    this.service
      .getProviderAccounts()
      .subscribe((data: any) => {
        console.log(data)
        this.accounts=[];
        for (let i = 0; i < data.length; i++) {
          let account = new ProviderAccount(data[i].id, data[i].firstName, data[i].lastName,
            data[i].email, data[i].providerId)
          this.users.push(account);
        }
      });
  }

  dropdownSettingsProviders:IDropdownSettings={
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  onDeselectProviders(item:any){
    const index:number=this.clickedProviders.indexOf(item.Id);
    this.clickedProviders.forEach((element,index)=>{
      if(element==item.Id)this.clickedProviders.splice(index,1);
    })
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
  
  ngOnInit() {
    this.setAccounts();
    this.setProviders();
    //this.setData();
    this.service.getProviders().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let provider=new UtilioProvider(data[i].id,data[i].name,data[i].code,data[i].webSite,data[i].createDate)
        this.providers.push(provider);
      }
      console.log(this.providers);
    })
  
    this.dropdownSettingsProviders= {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
      allowSearchFilter: true
    };

  
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

  setProviders():void {
    this.providers = [
      {Id: 1, Name: 'JP Elektorprivreda BiH', Code: 'EPBiH', webSite: 'https://www.epbih.ba/', createDate: '2022-12-23T07:23:36.3166667'},
      {Id: 2, Name: 'KJKP Vodovod i kanalizacija Sarajevo', Code: 'ViKSa', webSite: 'https://www.viksa.ba/', createDate: '2022-12-03T02:06:12.1266667'},
      {Id: 3, Name: 'KJKP Rad Sarajevo', Code: 'KJKPRadSarajevo', webSite: 'http://www.rad.com.ba/', createDate: '2022-12-03T02:06:12.1266667'},
      {Id: 4, Name: 'KJKP Sarajevogas Sarajevo', Code: 'KJKPSarajevoGas', webSite: 'https://www.sarajevogas.ba/', createDate: '2022-12-03T02:06:12.1266667'},
      {Id: 5, Name: 'KJKP Toplane Sarajevo', Code: 'KJKPToplaneSarajevo', webSite: 'https://www.toplanesarajevo.ba/', createDate: '2022-12-03T02:06:12.1266667'},
      {Id: 6, Name: 'BH Telecom', Code: 'BHTelecom', webSite: 'https://www.bhtelecom.ba/', createDate: '2022-12-03T02:06:12.1266667'}
    ]
  }

  setData(): void {
    this.users = [
      {
        Id: 2439,
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'johndoe@email.com',
        ProviderId:1
      },
      {
        Id: 2440,
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'janedoe@email.com',
        ProviderId:1
      },
      {
        Id: 2441,
        FirstName: 'Ime',
        LastName: 'Prezime',
        Email: 'imeprezime@email.com',
        ProviderId:1
      },
    ];
  }

  onClick(id: number): void {
    this.router.navigate(['/pages/user-settings', id]);
  }

  onDelete(id: number): void {

  }
}
