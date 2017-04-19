import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'modal-message',
    templateUrl: './modal-message.component.html'
})
export class ModalMessage {
    private Message: string;
    private MessageType: string;
    private RouteRedirect: string;
    public MessageIsVisible: boolean;

    constructor(private router: Router) { }

    showMessage(msg: string, type: string, routeRedirect?: string) {
        this.Message = msg;
        this.MessageType = type;
        this.RouteRedirect = routeRedirect;
        this.MessageIsVisible = true;
    }

    hideMessage() {
        this.Message = "";
        this.MessageType = ""; 
        this.MessageIsVisible = false;
       
        if (this.RouteRedirect != null) {
            if (this.RouteRedirect.length > 0) {
                this.router.navigate([this.RouteRedirect]);
            }
        }
    }
}