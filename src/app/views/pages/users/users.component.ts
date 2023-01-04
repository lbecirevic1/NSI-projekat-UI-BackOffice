import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount} from "../../../models/providerAccount";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: ProviderAccount[] = [];

  public accounts: ProviderAccount[] = [];

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

  ngOnInit() {
    this.setAccounts();
    //this.setData();
  
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
