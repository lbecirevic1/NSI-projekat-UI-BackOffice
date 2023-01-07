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
  accountForm: any;
  formVisible = false;
  isEdit = false;

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
  selectedAccount?: ProviderAccount;

  constructor(
    private service: UtilioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setAccounts();
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

    this.isEdit = true;
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
    if (this.formVisible) {
      this.isEdit = false;
      this.emptyAccountForm();
    }
    this.formVisible = !this.formVisible;
  }

  handleAccountFormChange(event: any): void {
    this.formVisible = event;
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      if (this.isEdit) {
        this.updateAccount();
      } else {
        this.createAccount();
      }
    }
  }

  changeProvider(e: any) {
    this.accountForm.get('providerId')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  private buildAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      providerId: [null, [Validators.required]],
      providerAccountRoles: this.formBuilder.array([]),
    });
  }

  private emptyAccountForm() {
    this.accountForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      providerId: null,
    });

    this.accountForm.get('providerId')?.enable();
  }

  private fillAccountForm() {
    this.accountForm.patchValue({
      firstName: this.selectedAccount?.firstName,
      lastName: this.selectedAccount?.lastName,
      email: this.selectedAccount?.email,
      providerId: this.selectedAccount?.providerId,
    });

    this.accountForm.get('providerId')?.disable();
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

  private updateAccount(): void {
    if (this.selectedAccount?.id === 9) return;
    if (this.selectedAccount)
      this.service
        .updateProviderAccount(this.selectedAccount.id, this.accountForm.value)
        .subscribe((data: any) => {
          this.setAccounts();
        });
  }

  private createAccount(): void {
    this.service
      .postProviderAccount(this.accountForm.value)
      .subscribe((data: any) => {
        this.toggleAccountForm();
        this.setAccounts();
      });
  }

  private setAccounts(): void {
    this.users = [];
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
      this.selectedAccount = new ProviderAccount(
        data.id,
        data.firstName,
        data.lastName,
        data.email,
        data.providerId
      );

      this.fillAccountForm();
    });
  }
}
