import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-customerbag-phone',
    templateUrl: 'genphone.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagPhone implements OnInit{
    @Input() customerBagPhoneData : any[] = [];
    @Input() customerData: any = {};
    @Output() selectPhone = new EventEmitter;
    @BlockUI() blockUI: NgBlockUI;
    formState: boolean = false;
    lstOrigin: any[] = [];
    lstClass: any[] = [];
    lstProvider: any[] = [];
    custBagPhone: any = {};
    ID: number = 0;
    selectObjPhone : any = {};

    constructor(private _collectionService: CollectionService){
        this.cleanData();
    }
    

    ngOnInit() {
        //this.loadPhones();
        this.loadData();
    }

    cleanData():void{
        this.custBagPhone.classes = '';
        this.custBagPhone.provider = '';
        this.custBagPhone.origin = '';
        this.custBagPhone.number = '';
        this.custBagPhone.annexed = '';
        this.custBagPhone.codeProvince = '';
        this.custBagPhone.AddressID = '0';
        this.custBagPhone.observation = '';
    }

    loadPhones():void{
        this.blockUI.start("Cargando...");
        let request: any = {};
        request.CustomerBagID = this.customerData.CustomerBagID;
        this._collectionService.getAllDataByID('api/customerbag/getcustomerbagphone', request)
            .subscribe(data => {
                this.customerBagPhoneData = data.lstCustomerBagPhone;
                this.blockUI.stop();
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

    setClickedRow = function(phoneID: number, phoneNumber: string){
        this.selectObjPhone.phoneID = phoneID;
        this.selectObjPhone.phoneNumber = phoneNumber;
        this.selectPhone.emit(this.selectObjPhone);
    }

    newCustomerPhone():void{
        this.cleanData();
        this.formState = true;
    }

    editCustomerPhone(ID: number):void{
        this.ID = ID;
        this.formState = true;
    }

    saveCustomerPhone(): void{
        this.blockUI.start("Cargando...");
        let data: any = {};

        data.CustomerBagID = this.customerData.CustomerBagID;
        data.ID = 0;
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

        this._collectionService.getAllDataByID('api/customerbag/postcustomerbagphone', data)
            .subscribe(res =>{
            console.log(res);
            this.formState = false;
            this.blockUI.stop();
            this.loadPhones();
        })
    }

    cancelCustomerPhone(): void{
        this.formState = false;
    }
}