import { Component, OnInit } from '@angular/core';
import { BlockUIService } from '../services/blockui.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public blockUI: Boolean;

    constructor(private blockUIService: BlockUIService) {
    }

    public ngOnInit() {
        this.blockUIService.blockUIEvent.subscribe(event => this.blockUnBlockUI(event));

        
    }

    private blockUnBlockUI(event) {
        this.blockUI = event.value;
    }
}
