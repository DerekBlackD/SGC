import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';

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
    @BlockUI() blockUI: NgBlockUI;
    lstDepartment: any[] = [];
    lstProvince: any[] = [];
    lstSelectProvince: any[] = [];
    lstDistrict: any[] = [];
    lstSelectDistrict: any[] = [];
    lstOrigin: any[] = [];
    lstSituation: any[] = [];
    selectObjAddress: any = {};
    oAddress: any = {};
    selectDepartment: string;
    selectProvince: string;
    // Forms variables
    submitted = false;
    formState = false;
    editOrNewAddress = false; // false = edit, true = new
    showUbigeo = true;
    // Global Data
    userData: any = {};

    constructor(private _collectionService: CollectionService) {
        this.userData = this._collectionService.getUserData();
        this.selectObjAddress.AddressID = 0;
        this.selectObjAddress.Address = '';
        this.resetVariables();
        this.loadData();

        this._collectionService.changeEmitted$.subscribe(
        response => {
            if (response) {
                this.formState = false;
                this.submitted = false;
                this.oAddress = {};
            }
        });
    }

    resetVariables(): void {
        this.selectDepartment = '';
        this.selectProvince = '';
        this.oAddress.Address = '';
        this.oAddress.Department = '';
        this.oAddress.Province = '';
        this.oAddress.District = '';
        this.oAddress.Origin = 0;
        this.oAddress.Sector = '';
        this.oAddress.Reference = '';
        this.oAddress.Observation = '';
        this.oAddress.QuadrantX = '';
        this.oAddress.QuadrantY = '';
        this.oAddress.City = '';
        this.oAddress.Urbanization = '';
        this.oAddress.Ubigeo = '';
    }

    loadData(): void {
        this.lstDepartment = this._collectionService.getGeneralCode(17);
        this.lstProvince = this._collectionService.getGeneralCode(18);
        this.lstDistrict = this._collectionService.getGeneralCode(19);
        this.lstOrigin = this._collectionService.getGeneralCode(2);
        this.lstSituation = this._collectionService.getGeneralCode(15);
    }

    loadAddress(): void {
        this.blockUI.start('Cargando...');
        const request: any = {};
        request.CustomerBagID = this.customerData.CustomerBagID;
        this._collectionService.getData('api/sgc/customerbag/getcustomerbagaddress/get', request)
            .subscribe(data => {
                this.customerBagAddressData = data.lstCustomerAddress;
                this.blockUI.stop();
            })
    }

    changeDepartment(val: string): void {
        this.selectProvince = '';
        this.oAddress.Ubigeo = '';
        this.lstSelectDistrict = [];
        this.lstSelectProvince = this.lstProvince.filter(x => x.Code.substring(0, 2) === val);
    }

    changeProvince(val: string): void {
        this.oAddress.Ubigeo = '';
        this.lstSelectDistrict = this.lstDistrict.filter(x => x.Code.substring(0, 4) === val);
    }

    showPhones(): void {
        this.selectObjAddress.AddressID = 0;
        this.selectObjAddress.Address = '';
        this._collectionService.restartData(1);
        this.selectAddress.emit(this.selectObjAddress);
        this.changeManagement.emit(true);
    }

    setClickedRow = function(addressID: number, address: string) {
        this.selectObjAddress.AddressID = addressID;
        this.selectObjAddress.Address = 'Dirección: ' + addressID;
        this.selectAddress.emit(this.selectObjAddress);
    }

    newCustomerAddress(): void {
        this.formState = true;
        this.submitted = false;
        this.editOrNewAddress = true;
        this.showUbigeo = true;
        this.resetVariables();
    }

    editCustomerAddress(address: any): void {
        this.oAddress = address;
        console.log(this.oAddress);
        this.formState = true;
        this.submitted = false;
        this.editOrNewAddress = false;

        if (this.oAddress.Ubigeo === '') {
            if (this.oAddress.Department === '' && this.oAddress.Province === '' && this.oAddress.District === '') {
                this.showUbigeo = true;
            } else {
                this.showUbigeo = false;
            }
        } else {
            this.showUbigeo = true;
            const ubiDepartment = this.oAddress.Ubigeo.substring(0, 2);
            const ubiProvince = this.oAddress.Ubigeo.substring(0, 4);
            const ubiDistrict = this.oAddress.Ubigeo;
            this.selectDepartment = ubiDepartment;
            this.lstSelectProvince = this.lstProvince.filter(x => x.Code.substring(0, 2) === ubiDepartment);
            this.selectProvince = ubiProvince;
            this.lstSelectDistrict = this.lstDistrict.filter(x => x.Code.substring(0, 4) === ubiProvince);
            this.oAddress.Ubigeo = ubiDistrict;
        }
    }

    saveCustomerAddress(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.blockUI.start('Cargando...');
            let urlRest = '';
            this.oAddress.CustomerBagID = this.customerData.CustomerBagID;
            if (this.editOrNewAddress) {
                this.oAddress.ID = 0;
                this.oAddress.Department = this.lstDepartment.find(x => x.Code === this.selectDepartment).Value;
                this.oAddress.Province = this.lstProvince.find(x => x.Code === this.selectProvince).Value;
                this.oAddress.District = this.lstDistrict.find(x => x.Code === this.oAddress.Ubigeo).Value;
                this.oAddress.Situation = 1;
                urlRest = 'api/sgc/customerbag/postinsertcustomerbagaddress/post';
            } else {
                if (this.oAddress.Ubigeo !== '') {
                    this.oAddress.Department = this.lstDepartment.find(x => x.Code === this.selectDepartment).Value;
                    this.oAddress.Province = this.lstProvince.find(x => x.Code === this.selectProvince).Value;
                    this.oAddress.District = this.lstDistrict.find(x => x.Code === this.oAddress.Ubigeo).Value;
                }
                urlRest = 'api/sgc/customerbag/postupatecustomerbagaddress/post';
            }

            this.oAddress.User = this.userData.UserName;

            this._collectionService.getData(urlRest, this.oAddress).subscribe(res => {
                if(res.strResponseCode=='0'){
                    this.formState = false;
                    this.submitted = false;
                    this.loadAddress();
                }else{
                    alert(res.strResponseMsg);
                }
                this.blockUI.stop();
            }, err => {
                console.log(err);
            });
        }
    }

    cancelCustomerAddress(): void {
        this.formState = false;
        this.submitted = false;
        this.oAddress = {};
    }

}
