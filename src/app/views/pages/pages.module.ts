import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { AnnouncementComponent} from "./announcement/announcement.component";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule} from "@angular/common/http";
import { NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';


import { WidgetsModule } from '../widgets/widgets.module';

import { NotificationsModule} from "../notifications/notifications.module";
import {DocsComponentsModule} from "../../../components";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    AnnouncementComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    NotificationsModule,
    ModalModule,
    HttpClientModule,
    FormsModule,
    DocsComponentsModule,
    DropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class PagesModule {
}
