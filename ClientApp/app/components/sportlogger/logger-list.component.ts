import { Component, OnInit } from '@angular/core';
import { SkiDay } from '../models/sportlogger.model';
import { SkiDayService } from '../services/sportlogger.service';
import { BlockUIService } from '../services/blockui.service';

@Component({
    selector: 'logger-list',
    templateUrl: './logger-list.component.html',
})
export class LoggerListComponent implements OnInit {
    public skidays: SkiDay[];
    public loading: boolean;
    private errorMsg: string;
    public orderResultsBy: string = "-skiDate";
    public orderDirection: string = "-";

    constructor(private service: SkiDayService,
            private blockUIService: BlockUIService) {
        
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.blockUIService.blockUIEvent.emit({
            value: true
        });

        this.service.getSkiDays()
            .subscribe(
                resp => this.skidays = resp,
                error => this.logError(error),
                () => {
                    console.log("Data load complete");
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

    fieldChange(optionValue) {
        this.orderResultsBy = optionValue;
        console.log(this.orderResultsBy);
        this.loadData();
    }
}