import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;
    headers:Headers = new Headers;
    public data: string;
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    login(username: string, password: string): Observable<boolean> {
        //const headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        this.data = "username=" + username + "&password=" + password + "&grant_type=password";
        return this.http.post('http://localhost:9580/oauth/token', this.data, { headers: this.headers})
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(response);
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch((error: Response | any) => {
                let errMsg:string;
                if(error instanceof Response){
                    const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                    errMsg = body.error_description;
                }
                else{
                    errMsg = error.message ? error.message : error.toString();
                }
                
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}