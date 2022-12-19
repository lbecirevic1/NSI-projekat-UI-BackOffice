import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

// CoreUI Modules
import {
  ModalModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  ButtonGroupModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import {SubscriberPageComponent} from './subscriber-page/subscriber-page.component'
import { DocsComponentsModule } from '@docs-components/docs-components.module';


// Theme Routing
import { SubscriptionRoutingModule } from './subscription-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    DocsComponentsModule,
    TableModule,
    ModalModule,
    ButtonModule,
    ButtonGroupModule,
    BreadcrumbModule,
    FormModule,
    PopoverModule
  ],
  declarations: [
    SubscriptionsComponent,
    SubscriberPageComponent
  ]
})
export class SubscriptionModule {
}
