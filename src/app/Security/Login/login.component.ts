import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { CollectionService } from '../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    model: any = {};
    submitted = false;
    errorService = false;
    messageLoginError: string;
    loginLogo: string;

    constructor(private router: Router,
                private _sharedService: SharedService,
                private _authenticationService: AuthenticationService,
                private _collectionService: CollectionService) {
        this._collectionService.getConfigFile().subscribe(res => {
            this.loginLogo = res[0].RutaLogoLogin;
        });
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
                    this.getAgentData();
                    this.getUserData();
                    this.getGeneralCode();
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

    getUserData(): void {
        const request: any = {};
        request.ID = this._authenticationService.getPayLoad().ID;
        this._collectionService.getData('api/sgc/user/getuser/get', request)
        .subscribe(response => {
            sessionStorage.setItem('userData', JSON.stringify(response.objUser));
            this._sharedService.emitChange(true);
            this.router.navigateByUrl('/Cobranza/Home');
        });
    }

    getAgentData(): void {
        const request: any = {};
        request.AgentID = this._authenticationService.getPayLoad().AgentID;
        this._collectionService.getData('api/sgc/agent/getagentdata/get', request)
        .subscribe(response => {
            if (response.ListAgents != null || response.ListAgents.length > 0) {
                sessionStorage.setItem('agentData', JSON.stringify(response.ListAgents[0]))
            }
        })
    }

    getGeneralCode(): void {
        const request: any = {};
        this._collectionService.getData('api/sgc/common/getallgeneralcodedata/get', request)
        .subscribe(response => {
            sessionStorage.setItem('generalData', JSON.stringify(response.lstGeneralCode));
        })
    }
}
