import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementHandlerComponent } from './handle.announcement.component';
import { AnnouncementHandlerRouterModule } from './handle-announcement-router.module'
import { TableModule } from '@coreui/angular';
import { Routes } from '@angular/router';


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
        CommonModule,
        TableModule,
        AnnouncementHandlerRouterModule
    ],
    declarations: [
        AnnouncementHandlerComponent
    ],
    exports: [AnnouncementHandlerComponent]
})
export class AnnouncementHandlerModule {
}
