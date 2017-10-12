import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'gen-customerbag-address',
    templateUrl: 'genaddress.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagAddress {
    @Input() customerBagAddressData: any[] = [];
    @Input() customerData: any = {};
    @Output() selectAddress = new EventEmitter;
    @Output() changeManagement = new EventEmitter;
    selectObjAddress: any = {};
    formState = false;

    constructor() {
        this.selectObjAddress.AddressID = 0;
        this.selectObjAddress.Address = '';
    }

    showPhones(): void {
        this.selectObjAddress.AddressID = 0;
        this.selectObjAddress.Address = '';
        this.selectAddress.emit(this.selectObjAddress);
        this.changeManagement.emit(true);
    }

    setClickedRow = function(addressID: number, address: string) {
        this.selectObjAddress.AddressID = addressID;
        this.selectObjAddress.Address = 'Dirección ID: ' + addressID;
        this.selectAddress.emit(this.selectObjAddress);
    }

    newCustomerAddress(): void {
        this.formState = true;
    }

    editCustomerAddress(): void {
        this.formState = true;
    }

    saveCustomerAddress(): void {
        this.formState = false;
    }

    cancelCustomerAddress(): void {
        this.formState = false;
    }

}
