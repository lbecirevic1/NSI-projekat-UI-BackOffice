import { Component, OnInit } from '@angular/core';
import { UtilioProvider } from 'src/app/models/utilioProvider';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderAccount } from '../../../models/providerAccount';
import { ProviderAccountRole } from '../../../models/providerAccountRole';
import { FormBuilder, Validators } from '@angular/forms';
import { cilCheckCircle } from '@coreui/icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  accounts: ProviderAccount[] = [];
  providers: UtilioProvider[] = [];
  roles: ProviderAccountRole[] = [];
  selectedAccount?: ProviderAccount;
  formVisible = false;
  isEdit = false;
  alertVisible = false;
  accountForm: any;
  icons = { cilCheckCircle };

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
    console.log(id)
    this.service.deleteProviderAccount(id);
    this.fetchAccounts();
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
  }

  changeList(e: any): void {
    if(e.target.value != 'null'){
      this.service.getAccountsForProvider(e.target.value).subscribe((accounts: any) => {
        this.accounts = [...accounts];
      });
    }
    else {
      this.fetchAccounts();
    }
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
    this.service
      .postProviderAccount(this.accountForm.value)
      .subscribe(() => {
        this.fetchAccounts();

        this.alertVisible = true;
        setTimeout(() => {
          this.toggleAccountForm();
        }, 2000);
      });
  }

  private updateAccount(): void {
    if (this.selectedAccount)
      this.service
        .updateProviderAccount(this.selectedAccount.id, this.accountForm.value)
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
      providerAccountRoles: this.formBuilder.array([]),
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

  private fillAccountForm() {
    this.accountForm.patchValue({
      firstName: this.selectedAccount?.firstName,
      lastName: this.selectedAccount?.lastName,
      email: this.selectedAccount?.email,
      providerId: this.selectedAccount?.providerId,
    });

    this.accountForm.get('providerId')?.disable();
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
}
