import { Component, Input } from '@angular/core';

@Component({
    selector: 'gen-customerbag-account',
    templateUrl:'genaccount.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagAccount{
    @Input() CustBagAccountData: any[] = [];

    constructor(){
        
    }
}