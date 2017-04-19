import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { SkiDay } from './sportlogger.model';

export interface PagedResponse<T> {
    total: number;
    data: T[];
}

@Component({
    selector: 'paged-logger-list',
    templateUrl: './paged-logger-list.component.html',
    styleUrls: ['./paged-logger-list.component.css']

})
export class PagedLoggerListComponent implements OnInit {
    public loading: boolean;
    private errorMsg: string;

    private data: Observable<SkiDay[]>;
    private page: number = 1;
    private total: number;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.getPage(1);
    }

    getPage(p: number) {
        this.loading = true;
        this.data = this.http.get("https://sportlogger.azurewebsites.net/api/PagedSkiDayApi/" + p + "/5")
            .do((res: any) => {
                this.total = res.json().total;
                this.page = p;
                this.loading = false;
            })
            .map((res: any) => res.json().data);
    }
}