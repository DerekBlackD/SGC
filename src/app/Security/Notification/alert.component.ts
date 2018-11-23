import { Component, Input } from '@angular/core';
import { CollectionService } from '../../Services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-alert-component',
    templateUrl: 'alert.component.html',
})

export class AlertComponent {
    blnVisibleAlert = false;
    lstAlert:any[]=[];

    constructor(
        private _collectionService:CollectionService,
        private router: Router
    ){
        this._collectionService.showAlertEmitted.subscribe(
            response => {
                this.blnVisibleAlert = response.blnVisible;
                this.lstAlert= response.lstAlert;
            }
        );
    }

    GoToCustomerBag(CustomerBagID: number, AlertID:number, CustomerID:number, BagID:number): void {
        this.router.navigate(['Cobranza/GestionGeneral', CustomerBagID, CustomerID, BagID, AlertID]);
        this.blnVisibleAlert = false;
    }
}
