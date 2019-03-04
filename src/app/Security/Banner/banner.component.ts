import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { CollectionService } from '../../Services/collection.service';
import { Observable } from 'rxjs/Observable';

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
    agentData: any={};

    lstAlertNow:any[]=[];
    @Input() blnVisibleAlert = true;

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
                this.agentData = JSON.parse(sessionStorage.getItem('agentData'));

                Observable.interval(1000).subscribe(res=>{
                    this.showAlert();
                });
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

    showAlert(){
        let oRequest:any={};
        let dtDay = new Date().getDate();
        let dtMon = new Date().getMonth() + 1;
        let dtYear = new Date().getFullYear();
        let tmHour = new Date().getHours();
        let timMin = new Date().getMinutes();
        let tmSec = new Date().getSeconds();
        let strDate = this.FN_CompleteZero(dtDay) + '/' + this.FN_CompleteZero(dtMon) + '/' + this.FN_CompleteZero(dtYear);
        let strTime = this.FN_CompleteZero(tmHour) + ':' + this.FN_CompleteZero(timMin) + ':' + this.FN_CompleteZero(tmSec);
        let lstAlert = this._collectionService.getListAlert();

        if(lstAlert!=undefined){
            if(lstAlert.length>0){
                this.lstAlertNow = lstAlert.filter(x => x.AlertDate == strDate && x.AlertTime == strTime && x.AlertStatusID == 1);
        
                if(this.lstAlertNow.length > 0) {
                    oRequest.blnVisible=true;
                    oRequest.lstAlert=this.lstAlertNow;
                    this._collectionService.showModalAlert(oRequest);
                }
            }
        }

        
    }

    FN_CompleteZero(value):string{
        let strValue = value.toString();
        strValue = (strValue.length < 2)? ('0' + strValue):strValue;
        return strValue;
    }
}
