import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule, TableModule, PaginationModule} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

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
    PaginationModule
  ]
})
export class LogsModule {
}
