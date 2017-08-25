import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
    @BlockUI() blockUI: NgBlockUI;
    model: any = {};
    submitted = false;
    errorService = false;
    messageLoginError: string;

    constructor(private router: Router,
                private _sharedService: SharedService,
                private _authenticationService: AuthenticationService){

    }

    ngOnInit() {
        // reset login status
        this._sharedService.emitChange(false);
        this._authenticationService.logout();
    }

    Login(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.blockUI.start('Cargando...');
            this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === '0') {
                    this._sharedService.emitChange(true);
                    this.router.navigateByUrl('/Cobranza/Home');
                } else {
                    console.log(result);
                }
                this.blockUI.stop();
            }, err => {
                this.errorService = true;
                this.messageLoginError = err;
                this.blockUI.stop();
            });
        }
    }
}