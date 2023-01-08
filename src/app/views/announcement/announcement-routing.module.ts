import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AnnouncementComponent} from "./announcement.component";

const routes: Routes = [
  {
    path: '',
    component: AnnouncementComponent,
    data: {
      title: 'Announcements Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementRoutingModule {}

