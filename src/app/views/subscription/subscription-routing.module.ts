import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import {SubscriberPageComponent} from './subscriber-page/subscriber-page.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Subscription',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'subscriptions',
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
        data: {
          title: 'Subscriptions',
        },
      },
      {
        path: 'subscriber/:id',
        component: SubscriberPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
