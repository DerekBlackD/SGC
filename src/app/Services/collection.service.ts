import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollectionService{
    constructor(private http: Http,
                private authenticationService: AuthenticationService){
                }

    getAllData(url: string): Observable<any[]>{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
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

    getAllDataByID(url: string, ID: string ): Observable<any[]>{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        let api = `${this.authenticationService.urlBase}${url}/${this.authenticationService.businessID}/${ID}`;
        
        return this.http.get(api , options)
        .map((response: Response) => {
            return response.json();
        })
        .catch((error: Response | any) => {
            let errMsg: string;
            if(error instanceof Response){
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg =`${error.status} - ${error.statusText || ''} ${err}`;
            }else{
                errMsg = error.message ? error.message : error.string();
            }

            return Observable.throw(errMsg);
        })
        .share();

    }

    postManagementData(url: string, data: any): Observable<any>{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let api = `${this.authenticationService.urlBase}${url}`
        return this.http.post(api, JSON.stringify(data), options)
        .map((response: Response) => {
            return response.json();
        })
    }

    postFileUpload(url:string, file:any):string{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let api = `${this.authenticationService.urlBase}${url}`;

        //let fileList: FileList = event.target.files;
        let fileList: FileList = file.target.files;
        if (fileList.length > 0) {  
            let file: File = fileList[0];  
            let formData: FormData = new FormData();  
            formData.append('uploadFile', file, file.name);  
            let headers = new Headers()  
            let options = new RequestOptions({ headers: headers });  
            let apiUrl1 = api;
            this.http.post(apiUrl1, formData, options)  
            .map(res => res.json())  
            .catch(error => Observable.throw(error))  
            .subscribe(  
                data => console.log(data)                
            )  
        }

        return api;
    }

    postProcess(url:string): void{
        console.log('entro');

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let api = `${this.authenticationService.urlBase}${url}`
        this.http.post(api, options)
        //.toPromise()
        .subscribe(data => console.log(data))

        //.subscribe( books => this.books = books, error => this.errorMessage = <any>error); 
/*
        .map(response => response.json())
        .subscribe(
            data => console.log('Success uploading the opinion ', data),
            error => console.error(`Error: ${error}`)
        )
  */      
        console.log('salio');
        
    }
}