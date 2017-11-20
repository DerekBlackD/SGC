import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-customerbag-phone',
    templateUrl: 'genphone.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagPhone {
    @Input() customerBagPhoneData: any[] = [];
    @Input() customerBagAddressData: any[] = [];
    @Input() customerData: any = {};
    @Output() selectPhone = new EventEmitter;
    @Output() changeManagement = new EventEmitter;
    @BlockUI() blockUI: NgBlockUI;
    // form variables
    formState = false;
    submitted = false;
    errorService = false;
    messageServiceError: string;
    editOrNewPhone = false; // false = edit, true = new

    // list of select control
    lstOrigin: any[] = [];
    lstClass: any[] = [];
    lstProvider: any[] = [];
    lstSituation: any[] = [];
    custBagPhone: any = {}; // Model
    selectObjPhone: any = {}; // Selected phone

    // Global Data
    userData: any = {};

    constructor(private _collectionService: CollectionService) {
        this.userData = this._collectionService.getUserData();
        this.loadData();
        this._collectionService.changeEmitted$.subscribe(
        response => {
            if (response) {
                this.formState = false;
                this.submitted = false;
            }
        });
        this.cleanData();
    }

    cleanData(): void {
        this.selectObjPhone.phoneID = 0;
        this.selectObjPhone.phoneNumber = '';
        this.custBagPhone.Class = '';
        this.custBagPhone.Provider = '';
        this.custBagPhone.Origin = '';
        this.custBagPhone.Phone = '';
        this.custBagPhone.Annexed = '';
        this.custBagPhone.ProvinceCode = '';
        this.custBagPhone.AddressID = '0';
        this.custBagPhone.Observation = '';
    }

    showAddress(): void {
        this.selectObjPhone.phoneID = 0;
        this.selectObjPhone.phoneNumber = '';
        this.selectPhone.emit(this.selectObjPhone);
        this.changeManagement.emit(false);
    }

    loadPhones(): void {
        this.blockUI.start('Cargando...');
        const request: any = {};
        request.CustomerBagID = this.customerData.CustomerBagID;
        this._collectionService.getData('api/sgc/customerbag/getcustomerbagphone/get', request)
            .subscribe(data => {
                this.customerBagPhoneData = data.lstCustomerBagPhone;
                this.blockUI.stop();
            })
    }

    loadData(): void {
        this.lstProvider = this._collectionService.getGeneralCode(1);
        this.lstOrigin = this._collectionService.getGeneralCode(2);
        this.lstClass = this._collectionService.getGeneralCode(3);
        this.lstSituation = this._collectionService.getGeneralCode(15);
    }

    setClickedRow = function(phoneID: number, phoneNumber: string){
        this.selectObjPhone.phoneID = phoneID;
        this.selectObjPhone.phoneNumber = phoneNumber;
        this.selectPhone.emit(this.selectObjPhone);
    }

    newCustomerPhone(): void {
        this.cleanData();
        this.formState = true;
        this.submitted = false;
        this.editOrNewPhone = true;
    }

    editCustomerPhone(phone: any): void {
        this.custBagPhone = phone;
        this.formState = true;
        this.submitted = false;
        this.editOrNewPhone = false;
    }

    saveCustomerPhone(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.blockUI.start('Cargando...');
            let urlRest = '';
            const data: any = {};

            data.CustomerBagID = this.customerData.CustomerBagID;
            data.Phone = this.custBagPhone.Phone;
            data.Annexed = this.custBagPhone.Annexed;
            data.Origin = this.custBagPhone.Origin;
            data.Class = this.custBagPhone.Class;
            data.Provider = this.custBagPhone.Provider;
            data.AddressID = this.custBagPhone.AddressID;
            data.Observation = this.custBagPhone.Observation;
            data.ProvinceCode = this.custBagPhone.ProvinceCode;
            data.User = this.userData.UserName;

            if (this.editOrNewPhone) {
                data.ID = 0;
                data.Situation = 1;
                data.Priority = 99;
                data.SubPriority = 99;
                urlRest = 'api/sgc/customerbag/postinsertcustomerbagphone/post';
            } else {
                data.ID = this.custBagPhone.ID;
                data.Situation = this.custBagPhone.Situation;
                urlRest = 'api/sgc/customerbag/postupdatecustomerbagphone/post';
            }

            this._collectionService.getData(urlRest, data)
                .subscribe(res => {
                    if (res.strResponseCode === '1') {
                        alert('Error: ' + res.strResponseMsg);
                    } else {
                        this.formState = false;
                        this.submitted = false;
                        this.loadPhones();
                    }
                    this.blockUI.stop();
            }, err => {
                this.messageServiceError = err;
            });
        }
    }

    cancelCustomerPhone(): void {
        this.formState = false;
        this.submitted = false;
        this.custBagPhone = {};
        this.cleanData();
    }
}
