import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  CollapseModule,
  PaginationModule,
  ModalModule,
  AvatarModule,
  ButtonGroupModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsComponentsModule } from '../../../components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AnnouncementComponent} from "./announcement.component";


import {
  BadgeModule,
  AccordionModule,
  SharedModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {AnnouncementRoutingModule} from "./announcement-routing.module";

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    TableModule,
    PaginationModule,
    FormModule,
    ButtonModule,
    IconModule,
    AccordionModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    ModalModule,
    FormsModule,
    NgbModule,
    ButtonGroupModule,
    CollapseModule,
  ],
})
export class AnnouncementModule {}
