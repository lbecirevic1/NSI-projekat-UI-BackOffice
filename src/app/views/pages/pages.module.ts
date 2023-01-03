import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    CollapseModule, PaginationModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AnnouncementComponent } from './announcement/announcement.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegionComponent } from './region/region.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';

import { WidgetsModule } from '../widgets/widgets.module';

import { NotificationsModule } from '../notifications/notifications.module';
import { DocsComponentsModule } from '../../../components';
import { UsersComponent } from './users/users.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    AnnouncementComponent,
    RegionComponent,
    UsersComponent,
    UserSettingsComponent,
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
        NgMultiSelectDropDownModule,
        CollapseModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        PaginationModule
    ]
})
export class PagesModule {}
