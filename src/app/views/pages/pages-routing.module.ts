import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { RegisterComponent } from './register/register.component';
import { RegionComponent } from './region/region.component';
import { AnnouncementHandlerComponent } from './handle-announcement/handle.announcement.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'handle-announcements',
    component: AnnouncementHandlerComponent,
    data: {
      title: 'Announcement handle & review',
    },
  },
  {
    path: 'region',
    component: RegionComponent,
    data: {
      title: 'Region Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
