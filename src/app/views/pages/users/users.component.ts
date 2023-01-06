import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UtilioProvider } from 'src/app/models/utilioProvider';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount } from '../../../models/providerAccount';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: ProviderAccount[] = [];
  clickedProviders: number[] = [];
  providers: UtilioProvider[] = [];
  formVisible = false;
  accountForm: any;

  readonly SAVE_CHANGES = 'Save changes';
  readonly CREATE_USER = 'Create new user';
  readonly EDIT_USER = 'Edit user';

  dropdownSettingsProviders: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true,
  };

  constructor(
    private service: UtilioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setAccounts();
    this.setProviders();
    this.fetchProviders();

    this.dropdownSettingsProviders = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
      allowSearchFilter: true,
    };

    this.buildAccountForm();
  }

  onEdit(id: number): void {
    this.setSelectedAccount(id);

    this.toggleAccountForm();
  }

  onDelete(id: number): void {}

  onProviderSelect(item: any): void {
    if (this.clickedProviders.includes(item.Id)) {
      const index: number = this.clickedProviders.indexOf(item.Id);

      this.clickedProviders.forEach((element, index) => {
        if (element == item.Id) this.clickedProviders.splice(index, 1);
      });
    }

    this.providerClicked(item);
  }

  onDeselectProviders(item: any): void {
    const index: number = this.clickedProviders.indexOf(item.Id);

    this.clickedProviders.forEach((element, index) => {
      if (element == item.Id) this.clickedProviders.splice(index, 1);
    });
  }

  toggleAccountForm(): void {
    if (this.formVisible) this.emptyAccountForm();

    this.formVisible = !this.formVisible;
  }

  handleAccountFormChange(event: any): void {
    this.formVisible = event;
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
    }
  }

  private buildAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private emptyAccountForm() {
    this.accountForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  private fillAccountForm(account: ProviderAccount) {
    this.accountForm.patchValue({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
    });
  }

  private providerClicked(provider: any): void {
    let providerId = provider.id;
    if (this.clickedProviders.includes(providerId)) {
      const index: number = this.clickedProviders.indexOf(providerId);
      this.clickedProviders.forEach((element, index) => {
        if (element == providerId) this.clickedProviders.splice(index, 1);
      });
    } else this.clickedProviders.push(providerId);
  }

  private setAccounts(): void {
    this.service.getProviderAccounts().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        let account = new ProviderAccount(
          data[i].id,
          data[i].firstName,
          data[i].lastName,
          data[i].email,
          data[i].providerId
        );
        this.users.push(account);
      }
    });
  }

  private fetchProviders(): void {
    this.service.getProviders().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let provider = new UtilioProvider(
          data[i].id,
          data[i].name,
          data[i].code,
          data[i].webSite,
          data[i].createDate
        );
        this.providers.push(provider);
      }
    });
  }

  private setSelectedAccount(id: number): void {
    this.service.getProviderAccount(id).subscribe((data: any) => {
      const selectedAccount = new ProviderAccount(
        data.id,
        data.firstName,
        data.lastName,
        data.email,
        data.providerId
      );

      this.fillAccountForm(selectedAccount);
    });
  }

  private setData(): void {
    this.users = [
      {
        id: 2439,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        providerId: 1,
      },
      {
        id: 2440,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
        providerId: 1,
      },
      {
        id: 2441,
        firstName: 'Ime',
        lastName: 'Prezime',
        email: 'imeprezime@email.com',
        providerId: 1,
      },
    ];
  }

  private setProviders(): void {
    this.providers = [
      {
        Id: 1,
        Name: 'JP Elektorprivreda BiH',
        Code: 'EPBiH',
        webSite: 'https://www.epbih.ba/',
        createDate: '2022-12-23T07:23:36.3166667',
      },
      {
        Id: 2,
        Name: 'KJKP Vodovod i kanalizacija Sarajevo',
        Code: 'ViKSa',
        webSite: 'https://www.viksa.ba/',
        createDate: '2022-12-03T02:06:12.1266667',
      },
      {
        Id: 3,
        Name: 'KJKP Rad Sarajevo',
        Code: 'KJKPRadSarajevo',
        webSite: 'http://www.rad.com.ba/',
        createDate: '2022-12-03T02:06:12.1266667',
      },
      {
        Id: 4,
        Name: 'KJKP Sarajevogas Sarajevo',
        Code: 'KJKPSarajevoGas',
        webSite: 'https://www.sarajevogas.ba/',
        createDate: '2022-12-03T02:06:12.1266667',
      },
      {
        Id: 5,
        Name: 'KJKP Toplane Sarajevo',
        Code: 'KJKPToplaneSarajevo',
        webSite: 'https://www.toplanesarajevo.ba/',
        createDate: '2022-12-03T02:06:12.1266667',
      },
      {
        Id: 6,
        Name: 'BH Telecom',
        Code: 'BHTelecom',
        webSite: 'https://www.bhtelecom.ba/',
        createDate: '2022-12-03T02:06:12.1266667',
      },
    ];
  }
}
