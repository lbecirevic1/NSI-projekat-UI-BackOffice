import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UtilioProvider } from 'src/app/models/utilioProvider';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount } from '../../../models/providerAccount';
import { ProviderAccountRole } from '../../../models/providerAccountRole';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: ProviderAccount[] = [];
  providers: UtilioProvider[] = [];
  accountForm: any;
  providerId: any;
  formVisible = false;
  isEdit = false;
  roles: ProviderAccountRole[] = [];

  readonly SAVE_CHANGES = 'Save changes';
  readonly CREATE_USER = 'Create new user';
  readonly EDIT_USER = 'Edit user';

  selectedAccount?: ProviderAccount;

  constructor(
    private service: UtilioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setAccounts();
    this.fetchProviders();
    this.buildAccountForm();
  }

  onEdit(id: number): void {
    this.setSelectedAccount(id);

    this.isEdit = true;
    this.toggleAccountForm();
  }

  onDelete(id: number): void {
    console.log(id)
    this.service.deleteProviderAccount(id);
   // this.refreshAccounts()
  }

  
  refreshAccounts() {
    window.location.reload();
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

  changeList(e:any ) {
    this.users = [];
    if(e.target.value!='null'){
    this.service.getAccountsForProvider(e.target.value).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        let account = new ProviderAccount(
          data[i].id,
          data[i].firstName,
          data[i].lastName,
          data[i].email,
          data[i].providerId,
          data[i].providerAccountRoles
        );
        this.users.push(account);
      }
    });
  }
  else {
    this.setAccounts();
  }
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
          data[i].providerId,
          data[i].providerAccountRoles
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
        data.providerId,
        data.providerAccountRoles
      );

      this.fillAccountForm();
    });
  }
}
