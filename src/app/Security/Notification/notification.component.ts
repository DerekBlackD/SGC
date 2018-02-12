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
                    this.getNotifications();
                }
            });
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

    GoToCustomerBag(CustomerBagID: number, CustomerID: number, BagID: number): void {
        this.router.navigate(['Cobranza/GestionGeneral', CustomerBagID, CustomerID, BagID]);
        this.blnShow = false;
    }
}
