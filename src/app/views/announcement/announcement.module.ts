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
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AnnouncementComponent, CustomAdapter, CustomDateParserFormatter} from "./announcement.component";


import {
  BadgeModule,
  AccordionModule,
  SharedModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {AnnouncementRoutingModule} from "./announcement-routing.module";
import {NgxPaginationModule} from "ngx-pagination";

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
        NgxPaginationModule,
    ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AnnouncementModule {}
