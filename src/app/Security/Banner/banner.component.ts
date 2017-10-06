import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
    selector: 'banner-component',
    templateUrl: 'banner.component.html',
    styleUrls: ['banner.component.css']
})
export class BannerComponent{
    @Input() BannerControls = true;
    userData : any = {};

    constructor(private _sharedService: SharedService,
                private _authService: AuthenticationService,
                private _router: Router) {
        this._sharedService.changeEmitted$.subscribe(
        response => {
            if (response) {
                this.userData = JSON.parse(sessionStorage.getItem('userData'));
            }
        });
    }

    LogOut(): void {
        this._authService.logout();
        this._router.navigateByUrl('/');
    }
}