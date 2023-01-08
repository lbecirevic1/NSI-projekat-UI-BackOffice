import { NgModule } from '@angular/core';
import { AnnouncementHandlerComponent } from './handle.announcement.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AnnouncementHandlerComponent,
        data: {
            title: 'Announcement Handling',
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
