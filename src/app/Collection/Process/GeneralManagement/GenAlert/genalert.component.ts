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
        this.lstNotificationType = this._collectionService.getGeneralCode(21);
        this.oAlert.NotificationType = 1;
        this.value = new Date();
    }

    saveAlert(): void {
        this.blockUI.start('Cargando...');
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
    }
}
