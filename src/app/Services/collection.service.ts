import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
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

    private showModalDialog = new Subject<any>();
    showModalEmitted = this.showModalDialog.asObservable();

    private showPayList = new Subject<any>();
    showPayListEmitted = this.showPayList.asObservable();

    private showAlert = new Subject<any>();
    showAlertEmitted= this.showAlert.asObservable();

    private showFilter = new Subject<any>();
    showFilterEmitted = this.showFilter.asObservable();

    private showContact = new Subject<any>();
    showContactEmitted = this.showContact.asObservable();

    private showMail = new Subject<any>();
    showMailEmitted = this.showMail.asObservable();

    private showObservation = new Subject<any>();
    showObservationEmitted = this.showObservation.asObservable();

    constructor(private http: Http,
                private authenticationService: AuthenticationService,
                private _router: Router) { }

    restartData(change: any) {
        this.restartComponent.next(change);
    }

    selectData(select: any) {
        this.selectCustomerBag.next(select);
    }

    // inputParameter.modalName [Requiered]
    // inputParameter.lstData
    // inputParameter.oData
    showModal(inputParameter: any) {
        this.showModalDialog.next(inputParameter);
    }

    showModalPay(inputParameter:any){
        this.showPayList.next(inputParameter)
    }

    showModalAlert(inputParameter:any){
        this.showAlert.next(inputParameter);
    }

    showModalFilter(inputParameter:any){
        this.showFilter.next(inputParameter);
    }

    showModalContact(inputParameter:any){
        this.showContact.next(inputParameter);
    }

    showModalMail(inputParameter:any){
        this.showMail.next(inputParameter);
    }

    showModalObs(inputParameter:any){
        this.showObservation.next(inputParameter);
    }

    getAgentID(): number {
        const agentID: number = this.authenticationService.getPayLoad().AgentID;
        return agentID;
    }

    getListAlert():any[]{
        let lstAlert:any[];
        lstAlert = JSON.parse(localStorage.getItem('AlertList'));
        return lstAlert;
    }

    setAlert(intAgentID:number){
        let oRequest:any={};
        oRequest.AgentID=intAgentID;

        this.getData('api/sgc/customerbag/AllAlert/get', oRequest).subscribe(response=>{
            if(response.ResponseCode==='0'){
                 localStorage.setItem('AlertList', JSON.stringify(response.lstEntity));
            }else{
                console.log(response.ResponseMsg);
            }
        });
    }

    getUserData(): any {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        return this.userData;
    }

    getAgentData(): any {
        if (localStorage.getItem('agentData')) {
            this.agentData = JSON.parse(localStorage.getItem('agentData'));
        }
        return this.agentData;
    }

    getGeneralCode(groupID: number): any[] {
        let generalCodeList: any[];
        let selectGeneralCodeList: any[];
        generalCodeList = JSON.parse(localStorage.getItem('generalData'));
        selectGeneralCodeList = generalCodeList.filter(x => x.GroupID === groupID);
        return selectGeneralCodeList;
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
        console.log(optionsRequest);
        //const apiUrl = this.authenticationService.urlBase + url;
        const apiUrl = 'http://209.45.54.65/SGC-BE/' + url;

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

            //console.log(errMsg);
            //this._router.navigateByUrl('/');
            return Observable.throw(errMsg);
        })
        .share();

    }

    getConfigFile(): Observable<any> {
        return this.http.get('./assets/configApp.json')
                        .map((res: Response) => res.json())
    }

    postManagementData(url: string, data: any): Observable<any> {
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

    getCalendarLanguage(): any {
        return {
            firstDayOfWeek: 1,
            dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
            dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
            dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
            monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
             'octubre', 'noviembre', 'diciembre' ],
            monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
            today: 'Hoy',
            clear: 'Borrar'
        }
    }
}