import { Injectable, DebugElement } from '@angular/core';
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
    public skiDayUrl: string = 'https://sportlogger.azurewebsites.net/api/SkiDayApi';
    //public skiDayUrl: string = 'https://localhost:44382/api/SkiDayApi';
    constructor(private http: Http, private blockUIService: BlockUIService) { }

    getSkiDays() {
        return this.http.get(this.skiDayUrl)
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }

    getPagedSkiDays(p: number) {
        return this.http.get("https://localhost:44382/api/PagedSkiDayApi/" + p + "/10")
            .map((res: any) => res.json())
            .catch(this.errorHandler)
    }
    
    getResorts() {
        return this.http.get('https://sportlogger.azurewebsites.net/api/ResortApi')
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }

    insertSkiDay(newSkiday: any) {
        var json = JSON.stringify(newSkiday);
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        return this.http.post(this.skiDayUrl, newSkiday, { headers: headers })
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

