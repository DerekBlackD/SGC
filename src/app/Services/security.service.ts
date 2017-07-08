import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SecurityService{
    private urlBase: string;
    constructor(private http: Http,
                private authenticationService: AuthenticationService){
                }

    getAllData(url: string): Observable<any[]>{
        let headers = new Headers({ 
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token
         });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.authenticationService.urlBase + url, options)
        .map((response: Response) => {
            return response.json();
        })
        .catch((error: Response | any) => {
            let errMsg:string;
            if(error instanceof Response){
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
            else{
                errMsg = error.message ? error.message : error.toString();
            }
            
            return Observable.throw(errMsg);
        });
    }
}