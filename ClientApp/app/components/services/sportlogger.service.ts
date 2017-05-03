import { Inject, Injectable, DebugElement } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { SkiDay } from '../models/sportlogger.model';
import { BlockUIService } from './blockui.service';


@Injectable()
export class SkiDayService {

    constructor(private http: Http,
        private blockUIService: BlockUIService,
        @Inject('API_URL') private apiUrl: string) {
    }

    getSkiDays() {
        return this.http.get(this.apiUrl)
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }

    getPagedSkiDays(p: number) {
        return this.http.get(this.apiUrl + "paged/" + p + "/10")
            .map((res: any) => res.json())
            .catch(this.errorHandler)
    }
    
    getResorts() {
        return this.http.get(this.apiUrl + 'resort')
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }

    insertSkiDay(newSkiday: any) {
        var json = JSON.stringify(newSkiday);
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        return this.http.post(this.apiUrl, newSkiday, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        const body = error.json() || '';
        console.log(body);
        let errMsg = `HTTP ERROR accessing '${error.url}': ${error.status} - ${error.statusText || ''}`;
        console.error(error);
        
        return Observable.throw(errMsg + ': ' + JSON.stringify(body))
    }
}

