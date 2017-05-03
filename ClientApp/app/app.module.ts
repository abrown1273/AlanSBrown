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
import { SkiDayService } from './components/services/sportlogger.service';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalMessage } from './components/modalmsg/modal-message.component';
import { PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance } from 'ng2-paginate'
import { PagerService } from './components/services/pager.service';
import { OrderByPipe } from './components/pipes/orderBy'
import { BlockUIService } from './components/services/blockui.service';
import { AlertService } from './components/services/alert.service';

import { YouTubeSearchComponent } from './components/you-tube-search/you-tube-search.component';
import { SearchResultComponent } from './components/you-tube-search/search-result.component';
import { SearchBoxComponent } from './components/you-tube-search/search-box.component';
import { youTubeSearchInjectables } from './components/you-tube-search/you-tube-search.injectables';


import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        LoggerListComponent,
        LoggerCreateComponent,
        ModalMessage,
        NavMenuComponent,
        OrderByPipe,
        PaginatePipe,
        PaginationControlsCmp,
        PagedLoggerListComponent,
        PagedLoggerList2Component,
        SearchResultComponent,
        SearchBoxComponent,
        YouTubeSearchComponent,
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
            { path: 'you-tube-search', component: YouTubeSearchComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],

    providers: [
        SkiDayService, PagerService, PaginationService,
        BlockUIService, AlertService, youTubeSearchInjectables
        , { provide: 'API_URL', useValue: 'https://sportlogger.azurewebsites.net/api/SkiDayApi/' }
        //, { provide: 'API_URL', useValue: 'https://localhost:44382/api/SkiDayApi/' }
    ]
})
export class AppModule {
}
