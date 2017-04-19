import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { LoggerListComponent } from './components/sportlogger/logger-list.component';
import { LoggerCreateComponent } from './components/sportlogger/logger-create.component';
import { PagedLoggerListComponent } from './components/sportlogger/paged-logger-list.component';
import { PagedLoggerList2Component } from './components/sportlogger/paged-logger-list2.component';
import { SkiDayService } from './components/sportlogger/services/sportlogger.service';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalMessage } from './components/modalmsg/modal-message.component';
import { PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance } from 'ng2-paginate'
import { PagerService } from './components/sportlogger/services/pager.service';
import { OrderByPipe } from './components/pipes/orderBy'

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        LoggerListComponent,
        LoggerCreateComponent,
        ModalMessage,
        OrderByPipe,
        PaginatePipe,
        PaginationControlsCmp,
        PagedLoggerListComponent,
        PagedLoggerList2Component,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        MyDatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'logger-list', component: LoggerListComponent },
            { path: 'logger-create', component: LoggerCreateComponent },
            { path: 'paged-logger-list', component: PagedLoggerListComponent },
            { path: 'paged-logger-list2', component: PagedLoggerList2Component },
            { path: '**', redirectTo: 'home' }
        ])
    ],

    providers: [SkiDayService, PagerService, PaginationService]
})
export class AppModule {
}
