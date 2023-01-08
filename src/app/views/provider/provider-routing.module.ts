import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProviderComponent } from './provider.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderComponent,
    data: {
      title: 'Provider',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}

