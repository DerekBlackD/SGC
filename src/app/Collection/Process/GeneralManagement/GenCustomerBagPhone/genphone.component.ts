import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../../../../Models/phone.model';
import { CollectionService } from '../../../../Services/collection.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'gen-customerbag-phone',
    templateUrl: 'genphone.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagPhone implements OnInit{
    @Input() customerBagPhoneData : any[] = [];
    formState: boolean = false;
    customerPhones: Phone[] = [];
    lstOrigin: any[] = [];
    lstClass: any[] = [];
    lstProvider: any[] = [];
    custBagPhone: any = {};
    ID: number = 0;

    constructor(private _collectionService: CollectionService){
    }

    ngOnInit() {
        //this.loadPhones();
        this.loadData();
    }

    loadPhones():void{
        this._collectionService.getAllData('api/CustomerPhone')
            .subscribe(phones =>{
            this.customerPhones = phones;
        })
    }

    loadData():void{
        let dataProv: any = {};
        dataProv.GroupID = "1";
        let dataOrigin: any = {};
        dataOrigin.GroupID = "2";
        let dataClass: any = {};
        dataClass.GroupID = "3";
        Observable.forkJoin(
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataProv),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataOrigin),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataClass),
        ).subscribe(data => {
                this.lstProvider = data[0].lstGeneralCode;
                this.lstOrigin = data[1].lstGeneralCode;
                this.lstClass = data[2].lstGeneralCode;
            }
        )
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
        let data: any = {};

        data.Option = "I";
        data.BusinnesID = "1";
        data.CustomerBagID = "1";
        data.ID = "1";
        data.Phone = this.custBagPhone.number;
        data.Annexed = this.custBagPhone.annexed;
        data.Origin = this.custBagPhone.origin;
        data.Class = this.custBagPhone.classes;
        data.Provider = this.custBagPhone.provider;
        data.Condition = 0;
        data.AddressID = this.custBagPhone.AddressID;
        data.Situation = 1;
        data.DateMngt = null;
        data.Ubiquity = 1;
        data.Result = 1;
        data.Priority = 99;
        data.SubPriority = 99;
        data.Observation = this.custBagPhone.observation;
        data.ProvinceCode = this.custBagPhone.codeProvince;
        data.User = "jpena";

        this._collectionService.postManagementData('api/customerbag/PostCustomerBag', data)
            .subscribe(res =>{
            console.log(res);
        })
        // console.log(this.custBagPhone.number);
        // console.log(this.custBagPhone.annexed);
        // console.log(this.custBagPhone.classes);
        // console.log(this.custBagPhone.provider);
        // console.log(this.custBagPhone.origin);
        // console.log(this.custBagPhone.codeProvince);
        // console.log(this.custBagPhone.AddressID);
        // console.log(this.custBagPhone.observation);
    }

    cancelCustomerPhone(): void{
        this.formState = false;
    }
}