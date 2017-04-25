import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import * as _ from 'underscore';
import { PagerService } from '../services/pager.service'
import { SkiDayService } from '../services/sportlogger.service';
import { BlockUIService } from '../services/blockui.service';

@Component({
    selector: 'paged-logger-list2',
    templateUrl: './paged-logger-list2.component.html',
})
export class PagedLoggerList2Component implements OnInit {
    public loading: boolean;
    private errorMsg: string;
    private allItems: any[];    // array of all items to be paged
    pager: any = {};            // pager object
    pagedItems: any[];          // paged items
    pageSize: number = 10;      // number of rec's per page

    constructor(private http: Http,
                private pagerService: PagerService,
                private skidayService: SkiDayService,
                private blockUIService: BlockUIService) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.blockUIService.blockUIEvent.emit({
            value: true
        });

        this.skidayService.getSkiDays()
            .subscribe(
                data => this.allItems = data,
                error => this.logError(error),
                () => {
                    this.setPage(1);
                    this.blockUIService.blockUIEvent.emit({
                        value: false
                    });
                }
            );
    }

    logError(err) {
        this.blockUIService.blockUIEvent.emit({
            value: false
        });
        this.errorMsg = err;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageSize);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}