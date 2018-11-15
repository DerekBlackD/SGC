import { Component, Input, OnInit } from '@angular/core';
import { CalendarModule, DialogModule } from 'primeng/primeng';
import { CollectionService } from '../../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-pay',
    templateUrl: 'genpay.component.html'
})

export class GenPay implements OnInit{
    @Input() customerData: any = {};
    @Input() customerBagPay: any[]=[];
    @BlockUI() blockUI: NgBlockUI;

    blnShow = false;

    constructor(private _collectionService: CollectionService){
        
    }

    ngOnInit(){
        this._collectionService.showPayListEmitted.subscribe(
            response => {
                this.blnShow = response;
            }
        );
    }
}