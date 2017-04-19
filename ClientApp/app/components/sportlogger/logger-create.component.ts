import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMyOptions } from 'mydatepicker';
import { Resort } from './sportlogger.model';
import { SkiDay } from './sportlogger.model';
import { SkiDayService } from './services/sportlogger.service';
import { ModalMessage } from '../modalmsg/modal-message.component';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';

@Component({
    selector: 'logger-create',
    templateUrl: './logger-create.component.html'
})
export class LoggerCreateComponent implements OnInit {
    @ViewChild(ModalMessage) modalMsg: ModalMessage;
    
    public resorts: Resort[];
    public errorFound: boolean;
    postData: string;
    returnData: string;
    public sdayForm: FormGroup;
    
    
    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy',
        inputValueRequired: true
    };

    constructor(
        private formBuilder: FormBuilder,
        private service: SkiDayService,
        private router: Router) { }

    ngOnInit() {
        this.sdayForm = this.formBuilder.group({
            skiDate: [null, Validators.required],
            resort: [null, Validators.required],
            vertical: [null, [Validators.required, Validators.maxLength(5)]],
            partners: [null, Validators.required],
            newsnow24: ['0', [Validators.required, Validators.pattern('^[0-9]+'), Validators.maxLength(2)]],
            newsnow72: ['0', [Validators.required, Validators.pattern('^[0-9]+'), Validators.maxLength(2)]],
            temperature: ['0', [Validators.required, Validators.pattern('^[0-9]+'), Validators.maxLength(4)]],
            comments: [null]
        });

        this.service.getResorts()
            .subscribe(
                resp => this.resorts = resp as Resort[],
                respErr => this.modalMsg = respErr
            );
    }

    onSubmit() {
        var json = this.sdayForm.value;
        // the date value is part of a form object because of the datepicker
        // reset the value to the formatted version.
        var myDate = this.sdayForm.controls['skiDate'].value.formatted;
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                if (key == "skiDate") {
                    json[key] = myDate;
                    break;
                }
            }
        }
        console.log(json);         
        this.service.insertSkiDay(json)
            .subscribe(
                data => this.returnData = JSON.stringify(data),
                error => this.logError(error),
                () => {
                    console.log("Insert finished.");
                    this.reset();
                }
            );
    }

    reset() {
        //this.router.navigate(['logger-list']);
        //this.sdayForm.markAsPristine();
        //this.sdayForm.untouched = true;
        //this.sdayForm.untouched;
        //this.sdayForm.reset();
        this.modalMsg.showMessage("The form was submitted successfully.", "Success", "logger-list");
    }

    logError(err) {
        this.errorFound = true;
        this.modalMsg.showMessage(err, "Error");
    }
}
