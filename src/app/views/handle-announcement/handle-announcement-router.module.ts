import { NgModule } from '@angular/core';
import { AnnouncementHandlerComponent } from './handle.announcement.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AnnouncementHandlerComponent,
        data: {
            title: 'Overview',
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AnnouncementHandlerRouterModule {
}
