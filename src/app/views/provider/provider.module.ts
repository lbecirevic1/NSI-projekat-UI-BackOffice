import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BadgeModule,
  CardModule,
  GridModule,
  TableModule,
  ButtonGroupModule,
  PaginationModule,
  FormModule,
  ButtonModule,
  AccordionModule,
  SharedModule,
  AvatarModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TabsModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { FormsModule }   from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

import { ProviderComponent } from './provider.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  declarations: [ProviderComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    FormsModule ,
    ButtonGroupModule,
    TableModule,
    PaginationModule,
    FormModule,
    ButtonModule,
    IconModule,
    AccordionModule,
    SharedModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    ModalModule,
    DocsComponentsModule,
    PaginationModule
  ],
})
export class ProviderModule {}
