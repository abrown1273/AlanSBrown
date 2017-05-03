import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { SkiDayService } from '../services/sportlogger.service';
import { SkiDay } from '../models/sportlogger.model';
import { BlockUIService } from '../services/blockui.service';

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

    constructor(private http: Http,
                private service: SkiDayService,
                private blockUIService: BlockUIService,
                @Inject('API_URL') private apiUrl: string) {

    }

    ngOnInit() {
        this.loadData(1);        
    }

    loadData(p: number) {
        this.blockUIService.blockUIEvent.emit({
            value: true
        });

        this.data = this.http.get(this.apiUrl + "paged/" + p + "/10")
            .do((res: any) => {
                this.total = res.json().total;
                this.page = p;
                this.blockUIService.blockUIEvent.emit({
                    value: false
                });
            })
            .map((res: any) => res.json().data)
            .catch(this.errorHandler)
    }

    errorHandler(error: Response) {
        let errMsg = `HTTP ERROR accessing '${error.url}': ${error.status} - ${error.statusText || ''}`;
        console.error(errMsg);
        this.errorMsg = errMsg;

        return Observable.throw(errMsg);
    }
}