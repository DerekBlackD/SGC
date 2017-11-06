import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollectionService {
    public userData: any = {};
    public agentData: any = {};

    private restartComponent = new Subject<any>();
    changeEmitted$ = this.restartComponent.asObservable();

    private selectCustomerBag = new Subject<any>();
    selectEmiited$ = this.selectCustomerBag.asObservable();

    constructor(private http: Http,
                private authenticationService: AuthenticationService) { }

    restartData(change: any) {
        this.restartComponent.next(change);
    }

    selectData(select: any) {
        this.selectCustomerBag.next(select);
    }

    getAgentID(): number {
        const agentID: number = this.authenticationService.getPayLoad().AgentID;
        return agentID;
    }

    getUserData(): any {
        this.userData = JSON.parse(sessionStorage.getItem('userData'));
        return this.userData;
    }

    getAgentData(): any {
        if (sessionStorage.getItem('agentData')) {
            this.agentData = JSON.parse(sessionStorage.getItem('agentData'));
        }
        return this.agentData;
    }

    getAllData(url: string): Observable<any[]> {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(this.authenticationService.urlBase + url, options)
        .map((response: Response) => {
            return response.json();
        })
        .catch((error: Response | any) => {
            let errMsg: string;
            if (error instanceof Response) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }

            return Observable.throw(errMsg);
        });
    }

    getData(url: string, data: any ): Observable<any> {
        const headers = new Headers ({
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.token
        });

        const optionsRequest = new RequestOptions({  headers: headers });

        const apiUrl = this.authenticationService.urlBase + url;

        data.BusinessID = this.authenticationService.getPayLoad().BusinessID; // this.authenticationService.businessID;

        return this.http.post(apiUrl, JSON.stringify(data), optionsRequest)
        .map((response: Response) => {
            return response.json();
        })
        .catch((error: Response | any) => {
            let errMsg: string;
            if (error instanceof Response) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.string();
            }

            return Observable.throw(errMsg);
        })
        .share();

    }

    postManagementData(url: string, data: any): Observable<any>{
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });
        const api = `${this.authenticationService.urlBase}${url}`
        return this.http.post(api, JSON.stringify(data), options)
        .map((response: Response) => {
            return response.json();
        })
    }

    postFileUpload(url: string, file: any): Observable<any>{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        const api = `${this.authenticationService.urlBase}${url}`;

        const fileList: FileList = file.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            headers = new Headers();
            options = new RequestOptions({ headers: headers });
            const apiUrl1 = api;
            return this.http.post(apiUrl1, formData, options)
            .map((response: Response) => {
                return response.json();
            })
            // .map(res => res.json())
            // .catch(error => Observable.throw(error))
            // .subscribe(
                // data => console.log(data)
            // )
        }else {
            return null;
        }
    }

    postProcess(url: string, data: any): void {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });
        data.BusinessID = this.authenticationService.getPayLoad().BusinessID;
        const api = `${this.authenticationService.urlBase}${url}`
        data.BusinessID = this.authenticationService.getPayLoad().BusinessID;
        this.http.post(api, JSON.stringify(data), options)
        .subscribe(data => console.log(data))
    }
}