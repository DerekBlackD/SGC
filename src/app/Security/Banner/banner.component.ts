import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { CollectionService } from '../../Services/collection.service';

@Component({
    selector: 'app-banner-component',
    templateUrl: 'banner.component.html',
    styleUrls: ['banner.component.css']
})
export class BannerComponent {
    @Input() BannerControls = true;
    userData: any = {};
    businessName: string;
    businessLogoIco: string;

    constructor(private _sharedService: SharedService,
                private _authService: AuthenticationService,
                private _router: Router,
                private _collectionService: CollectionService) {
        this._collectionService.getConfigFile().subscribe(res => {
            this.businessName = res[0].NombreEmpresa;
            this.businessLogoIco = res[0].RutaLogo;
        });
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

    showNotifications(): void {
        this._collectionService.showModal('listNotif');
    }
}
