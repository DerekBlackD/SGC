import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'gen-customerbag-account',
    templateUrl:'genaccount.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagAccount{
    @Input() CustBagAccountData: any[] = [];
    @Input() accountTotal: any = {};

    constructor() {
        this.accountTotal.totalCapital = 0;
        this.accountTotal.totalCampaign1 = 0;
        this.accountTotal.totalCampaign2 = 0;
    }
}
