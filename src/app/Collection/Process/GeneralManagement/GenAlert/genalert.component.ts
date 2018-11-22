import { Component, Input } from '@angular/core';
import { CalendarModule, DialogModule } from 'primeng/primeng';
import { CollectionService } from '../../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-alert',
    templateUrl: 'genalert.component.html'
})
export class GenAlert{
    @Input() customerData: any = {};
    @BlockUI() blockUI: NgBlockUI;
    blnShow = false;
    value: Date;
    es: any;
    lstAlert:any[]=[];

    // list of select control
    lstNotificationType: any[] = [];

    oAlert: any = {}; // Model

    // Global Data
    userData: any = {};

    constructor(private _collectionService: CollectionService) {
        this.es = this._collectionService.getCalendarLanguage();

        this._collectionService.showModalEmitted.subscribe(
            response => {
                if (response === 'alert') {
                    this.blnShow = true;
                }
            });

        this.userData = this._collectionService.getUserData();
        //this.lstNotificationType = this._collectionService.getGeneralCode(21);
        //this.oAlert.NotificationType = 1;
        this.value = new Date();
    }

    saveAlert(): void {
        this.blockUI.start('Cargando...');

        let oRequest:any={};
        let oEntity:any={};

        let tmHour =this.value.getHours();
        let timMin = this.value.getMinutes();
        let strTime = this.FN_CompleteZero(tmHour) + ':' + this.FN_CompleteZero(timMin);

        oEntity.AgentID = this._collectionService.getAgentID();
        oEntity.CustomerBagID = this.customerData.CustomerBagID;
        oEntity.TypeID = 1;
        oEntity.Alert = this.value;
        oEntity.AlertDate = this.value.toLocaleDateString();
        oEntity.AlertTime = strTime;
        oEntity.User = this.userData.UserName;

        oRequest.oEntity = oEntity;

        this._collectionService.getData('api/sgc/customerbag/InsertAlert/post', oRequest)
        .subscribe(result => {
            this.lstAlert = JSON.parse(sessionStorage.getItem('AlertList'));
            this.lstAlert.push(result.oEntity);
            sessionStorage.setItem('AlertList', JSON.stringify(this.lstAlert));

            this.blockUI.stop();
            this.blnShow = false;
        })

        /*
        this.oAlert.AgentID = this._collectionService.getAgentID();
        this.oAlert.NotificationID = 0;
        this.oAlert.NotificationDate = this.value;
        this.oAlert.CustomerID = this.customerData.CustomerID;
        this.oAlert.BagID = this.customerData.BagID;
        this.oAlert.CustomerBagID = this.customerData.CustomerBagID;
        this.oAlert.Situation = 1;
        this.oAlert.User = this.userData.UserName;
        this._collectionService.getData('api/sgc/notification/postinsertnotification/post', this.oAlert)
                .subscribe(result => {
                    this.blockUI.stop();
                    this.blnShow = false;
                })
                */
    }

    FN_CompleteZero(value):string{
        let strValue = value.toString();
        strValue = (strValue.length < 2)? ('0' + strValue):strValue;
        return strValue;
    }
}
