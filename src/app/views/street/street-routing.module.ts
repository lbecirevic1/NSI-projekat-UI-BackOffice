import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreetComponent } from './street.component';

const routes: Routes = [
  {
    path: '',
    component: StreetComponent,
    data: {
      title: 'Street',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreetRoutingModule {}

