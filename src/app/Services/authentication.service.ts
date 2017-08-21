import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public urlBase: string;
    public token: string;
    public businessID: string;
    headers: Headers = new Headers;
    public data: string;
    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // this.urlBase = 'http://54.233.102.195/SGC-BE/';
        this.urlBase = 'http://localhost:9580/';
        this.businessID = this.getPayLoad().BusinessID;
    }

    login(username: string, password: string): Observable<string> {
        this.data = 'username=' + username + '&password=' + password + '&grant_type=password';
        return this.http.post(this.urlBase + 'oauth/token', this.data, { headers: this.headers})
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(response);
                const token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return '0';
                } else {
                    // return false to indicate failed login
                    return '1';
                }
            })
            .catch((error: Response | any) => {
                let errMsg: string;
                if (error instanceof Response) {
                    const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    errMsg = body.error_description;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                return Observable.throw(errMsg);
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getPayLoad(): any {
        const token = localStorage.getItem('currentUser')

        if (token) {
            if (token && token.split('.').length === 3) {
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    return JSON.parse(this.decodeBase64(base64));
                } catch (e) {
                }
            }
        } else {
            return JSON.parse('{"BusinessID": "0"}');
        }
    }

    decodeBase64(str: string){
        var buffer;
        var fromCharCode = String.fromCharCode;
        var re_btou = new RegExp([
            '[\xC0-\xDF][\x80-\xBF]',
            '[\xE0-\xEF][\x80-\xBF]{2}',
            '[\xF0-\xF7][\x80-\xBF]{3}'
        ].join('|'), 'g');
        var cb_btou = function (cccc) {
            switch (cccc.length) {
                case 4:
                    var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                        | ((0x3f & cccc.charCodeAt(1)) << 12)
                        | ((0x3f & cccc.charCodeAt(2)) << 6)
                        | (0x3f & cccc.charCodeAt(3));
                    var offset = cp - 0x10000;
                    return (fromCharCode((offset >>> 10) + 0xD800)
                        + fromCharCode((offset & 0x3FF) + 0xDC00));
                case 3:
                    return fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12)
                        | ((0x3f & cccc.charCodeAt(1)) << 6)
                        | (0x3f & cccc.charCodeAt(2)));
                default:
                    return fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6)
                        | (0x3f & cccc.charCodeAt(1)));
            }
        };
        var btou = function (b) {
            return b.replace(re_btou, cb_btou);
        };
        var _decode = buffer ? function (a) {
            return (a.constructor === buffer.constructor
                ? a : new buffer(a, 'base64')).toString();
        }
            : function (a) {
                return btou(atob(a));
            };
        return _decode(String(str).replace(/[-_]/g, function (m0) {
            return m0 === '-' ? '+' : '/';
        })
            .replace(/[^A-Za-z0-9\+\/]/g, ''));
    }
}
