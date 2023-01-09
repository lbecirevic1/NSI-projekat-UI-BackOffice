import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionComponent } from './region.component';

const routes: Routes = [
  {
    path: '',
    component: RegionComponent,
    data: {
      title: 'Region',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionRoutingModule {}

