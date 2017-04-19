import { Injectable, DebugElement } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { SkiDay } from '../sportlogger.model';

@Injectable()
export class SkiDayService {
    public skiDayUrl: string = 'https://sportlogger.azurewebsites.net/api/SkiDayApi';
    //public skiDayUrl: string = 'http://localhost:63978/api/SkiDayApi';
    constructor(private http: Http) { }

    getSkiDays() {
        return this.http.get(this.skiDayUrl)
            .map((resp: Response) => resp.json())
            .catch(this.errorHandler);
    }
    
    getSkiDaysPaged(page: number): Observable<SkiDay> {
        return this.http.get("https://sportlogger.azurewebsites.net/api/PagedSkiDayAp/" + page + "/5")
            .catch(this.errorHandler);
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
        let errMsg = `HTTP ERROR accessing '${error.url}': ${error.status} - ${error.statusText || ''}`;
        console.error(error);
        
        return Observable.throw(errMsg + ': ' + JSON.stringify(body))
    }
}

