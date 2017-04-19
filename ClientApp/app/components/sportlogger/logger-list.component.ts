import { Component, OnInit } from '@angular/core';
import { SkiDay } from './sportlogger.model';
import { SkiDayService } from './services/sportlogger.service';

@Component({
    selector: 'logger-list',
    templateUrl: './logger-list.component.html',
})
export class LoggerListComponent implements OnInit {
    public skidays: SkiDay[];
    public loading: boolean;
    private errorMsg: string;
    public orderResultsBy: string = "-skiDate";

    constructor(private service: SkiDayService) {
        
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading = true;
        this.service.getSkiDays()
            .subscribe(
                resp => this.skidays = resp,
                error => this.errorMsg = error,
                () => {
                    console.log("Data load complete");
                    this.loading = false;
                }
            );
    }

    fieldChange(optionValue) {
        this.orderResultsBy = optionValue;
        console.log(this.orderResultsBy);
        this.loadData();
    }
}