import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BadgeModule,
  CardModule,
  GridModule,
  TableModule,
  PaginationModule,
  FormModule,
  ButtonModule,
  AccordionModule,
  SharedModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';

import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
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
    NgxPaginationModule,
  ],
})
export class LogsModule {}
