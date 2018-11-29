import { Component } from '@angular/core';
import { DialogModule } from 'primeng/primeng';
import { CollectionService } from '../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-notification-component',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent {
    blnShow = false;
    chkAll = false;
    es: any;
    value: Date;
    lstNotifications: any[] = [];
    @BlockUI() blockUI: NgBlockUI;

    constructor(private _collectionService: CollectionService,
                private route: ActivatedRoute,
                private router: Router) {
        this.es = this._collectionService.getCalendarLanguage();
        this._collectionService.showModalEmitted.subscribe(
            response => {
                if (response === 'listNotif') {
                    this.blnShow = true;
                    const lstActive = JSON.parse(sessionStorage.getItem('AlertList')).filter(x => x.AlertStatusID == 1);
                    this.lstNotifications = lstActive;
                    this.value=null;
                    this.chkAll=false;
                }
            });
    }

    FN_SelectDate(){
        let lstAlert:any[]=[];

        if(this.chkAll){
            lstAlert = JSON.parse(sessionStorage.getItem('AlertList'));    
        }else{
            lstAlert = JSON.parse(sessionStorage.getItem('AlertList')).filter(x => x.AlertStatusID == 1)
        }
        
        if(this.value!=undefined){
            let dtDay = this.value.getDate();
            let dtMon = this.value.getMonth() + 1;
            let dtYear = this.value.getFullYear();
            let strDate = this.FN_CompleteZero(dtDay) + '/' + this.FN_CompleteZero(dtMon) + '/' + this.FN_CompleteZero(dtYear);
            this.lstNotifications = lstAlert.filter(x => x.AlertDate == strDate);
        }else{
            this.lstNotifications = lstAlert;
        }
    }

    FN_CompleteZero(value):string{
        let strValue = value.toString();
        strValue = (strValue.length < 2)? ('0' + strValue):strValue;
        return strValue;
    }

    getNotifications(): void {
        this.blockUI.start('Cargando...');
        const request: any = {};
        request.AgentID = this._collectionService.getAgentID();
        request.SearchDate = '18/01/2018';
        this._collectionService.getData('api/sgc/notification/getnotifications/get', request)
            .subscribe(data => {
                this.lstNotifications = data.lstNotifications;
                this.blockUI.stop();
            })
    }

    GoToCustomerBag(CustomerBagID: number, AlertID:number, CustomerID:number,BagID:number, StatusID:number): void {
        if(StatusID==1){
            this.router.navigate(['Cobranza/GestionGeneral', CustomerBagID, CustomerID, BagID, AlertID]);
            this.blnShow = false;
        }else{
            alert('Alerta ya fue atendida');
        }
    }
}
