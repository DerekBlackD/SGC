import { Component, OnInit } from '@angular/core';
import { Phone } from '../../../../Models/phone.model';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'general-customer-phone',
    templateUrl: 'customerphone.component.html',
    styleUrls: ['../general.component.css']
})
export class GeneralCustomerPhoneComponent implements OnInit{
    formState: boolean = false;
    customerPhones: Phone[] = [];
    ID: number = 0;

    constructor(private _collectionService: CollectionService){
    }

    ngOnInit() {
        this.loadPhones();
    }

    loadPhones():void{
        this._collectionService.getAllData('api/CustomerPhone')
            .subscribe(phones =>{
            this.customerPhones = phones;
            console.log(this.customerPhones);
        })
    }

    newCustomerPhone():void{
        this.formState = true;
    }

    editCustomerPhone(ID: number):void{
        this.ID = ID;
        this.formState = true;
    }

    saveCustomerPhone(): void{
        this.formState = false;
    }

    cancelCustomerPhone(): void{
        this.formState = false;
    }
}