import { Component, OnInit } from '@angular/core';
import { UtilioProvider } from 'src/app/models/utilioProvider';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount } from '../../../models/providerAccount';
import { ProviderAccountRole } from '../../../models/providerAccountRole';
import { FormBuilder, Validators } from '@angular/forms';
import { cilCheckCircle } from '@coreui/icons';
import { ProviderRegion } from 'src/app/models/providerRegion';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  accounts: ProviderAccount[] = [];
  providers: UtilioProvider[] = [];
  roles: ProviderAccountRole[] = [];

  accountReaderRoles: any[] = [];
  accountEditorRoles: any[] = [];
  accountAdminRoles: any[] = [];

  selectedAccount?: ProviderAccount;
  accountForm: any;
  icons = { cilCheckCircle };

  formVisible = false;
  isEdit = false;
  alertVisible = false;

  readonly SAVE_CHANGES = 'Save changes';
  readonly CREATE_USER = 'Create new user';
  readonly EDIT_USER = 'Edit user';

  constructor(
    private service: UtilioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchAccounts();
    this.fetchProviders();
    this.buildAccountForm();
  }

  onEdit(id: number): void {
    this.toggleEditAccountForm(id);
  }

  onDelete(id: number): void {
    this.service.deleteProviderAccount(id);
    this.fetchAccounts();
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      if (this.isEdit) {
        this.updateAccount();
      } else {
        this.createAccount();
      }
    }
  }

  toggleAccountForm(): void {
    if (this.formVisible) {
      this.isEdit = false;
      this.emptyAccountForm();
      this.alertVisible = false;
    }

    this.formVisible = !this.formVisible;
  }

  handleAccountFormChange(event: any): void {
    this.formVisible = event;
  }

  changeProvider(e: any): void {
    this.accountForm.get('providerId')?.setValue(e.target.value, {
      onlySelf: true,
    });
    this.accountEditorRoles = [];
    this.accountAdminRoles = [];
    this.accountReaderRoles = [];
  }

  changeList(e: any): void {
    if (e.target.value != 'null'){
      this.service.getAccountsForProvider(e.target.value).subscribe((accounts: any) => {
        this.accounts = [...accounts];
      });
    }
    else {
      this.fetchAccounts();
    }
  }

  getProviderId(): number {
    return this.isEdit ? this.selectedAccount?.providerId : this.accountForm.value.providerId;
  }

  setReaderRoles(event: ProviderRegion[]) {
    this.accountReaderRoles = [];

    event.forEach(region => {
      this.accountReaderRoles.push({
        roleId: 2,
        providerId: this.getProviderId(),
        regionId: region.data.id
      })
    })
  }

  setEditorRoles(event: ProviderRegion[]) {
    this.accountEditorRoles = [];

    event.forEach(region => {
      this.accountEditorRoles.push({
        roleId: 3,
        providerId: this.getProviderId(),
        regionId: region.data.id
      })
    })
  }

  setAdminRoles(event: ProviderRegion[]) {
    this.accountAdminRoles = [];

    event.forEach(region => {
      this.accountAdminRoles.push({
        roleId: 1,
        providerId: this.getProviderId(),
        regionId: region.data.id
      })
    })
  }
  
  getAccountRoles(roleId: number) {
    return this.selectedAccount?.providerAccountRoles.filter(e => e.roleId === roleId);
  }

  private fetchAccounts(): void {
    this.service.getProviderAccounts().subscribe((accounts: any) => {
      this.accounts = [...accounts];
    });
  }

  private fetchProviders(): void {
    this.service.getProviders().subscribe((providers) => {
      providers.forEach(provider => this.providers.push(
        new UtilioProvider(
          provider.id, 
          provider.name, 
          provider.code, 
          provider.webSite
        )
      ))
    });
  }

  private createAccount(): void {
    const user = {...this.accountForm.value};
    user.providerAccountRoles = [...this.accountAdminRoles, ...this.accountEditorRoles, ...this.accountReaderRoles];
    this.service
      .postProviderAccount(user)
      .subscribe(() => {
        this.fetchAccounts();

        this.alertVisible = true;
        setTimeout(() => {
          this.toggleAccountForm();
        }, 2000);
      });
  }

  private updateAccount(): void {
    const user = {...this.accountForm.value};
    user.providerAccountRoles = [...this.accountAdminRoles, ...this.accountEditorRoles, ...this.accountReaderRoles];
    if (this.selectedAccount)
      this.service
        .updateProviderAccount(this.selectedAccount.id, user)
        .subscribe(() => {
          this.alertVisible = true;
          this.fetchAccounts();
        });
  }

  private buildAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      providerId: [null, [Validators.required]],
      providerAccountRoles: [],
    });
  }
  
  private toggleEditAccountForm(id: number): void {
    this.service.getProviderAccount(id).subscribe((account: any) => {
      this.selectedAccount = account;

      this.isEdit = true;
      this.fillAccountForm();
      this.toggleAccountForm();
    });
  }

  private fillAccountForm(): void {
    this.accountForm.patchValue({
      firstName: this.selectedAccount?.firstName,
      lastName: this.selectedAccount?.lastName,
      email: this.selectedAccount?.email,
      providerId: this.selectedAccount?.providerId,
    });

    this.accountForm.get('providerId')?.disable();
  }
  
  private emptyAccountForm(): void {
    this.accountForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      providerId: null,
    });

    this.accountForm.get('providerId')?.enable();
  }

  searchText:string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
}
