import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
    model: any = {};

    constructor(private router: Router,
                private _sharedService: SharedService,
                private _authenticationService: AuthenticationService){

    }

    ngOnInit() {
        // reset login status
        this._authenticationService.logout();
        this._sharedService.emitChange(false);
    }

    Login():void{
        this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this._sharedService.emitChange(true);
                    this.router.navigateByUrl("/Home");
                } else {
                    console.log('Error');
                }
            });
    }
}