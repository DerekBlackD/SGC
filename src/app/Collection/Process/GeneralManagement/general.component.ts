import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'general-component',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralManagementComponent{
    @BlockUI() blockUI: NgBlockUI;
    customerBagData: any = {};
    customerBagPhoneData: any[] = [];
    customerBagManagementsData: any[] = [];
    customerBagManagementsDataBack: any[] = [];
    customerBagAccountData: any[] = [];
    lstAssign: any[] = [];
    selectPhone: any = {};
    customerData: any = {};
    btnprevState: boolean;
    btnnextState: boolean;
    indexAssign = 0;
    Val: string;
    constructor(private _collectionService: CollectionService){
        this.Val = 'Documento';
    }

    selectOption(val: string): void {
        this.Val = val;
    }

    ngOnInit() {
        this.loadAssignment();
    }

    loadAssignment(): void {
        this.blockUI.start("Cargando...");
        let data: any = {};

        data.AgentID = "1";
        data.Year = "2017";
        data.Month = "7";

        this._collectionService.getData('api/GetAssign', data)
            .subscribe(assign => {
            this.lstAssign = assign.lstAssignmentByAgent;
            if (this.lstAssign.length > 0) {
                this.customerData.CustomerBagID = this.lstAssign[0].CustomerBagID;
                this.customerData.CustomerID = this.lstAssign[0].CustomerID;
                this.customerData.BagID = this.lstAssign[0].BagID;
                if (assign.objCustomerBag != null) {
                    this.customerBagData = assign.objCustomerBag;
                    if (this.customerBagData.Phones != null) {
                        this.customerBagPhoneData = this.customerBagData.Phones;
                    }
                    if (this.customerBagData.Managements != null) {
                        this.customerBagManagementsData = this.customerBagData.Managements;
                        this.customerBagManagementsDataBack = this.customerBagManagementsData;
                    }
                    if (this.customerBagData.Accounts != null) {
                        this.customerBagAccountData = this.customerBagData.Accounts;
                    }
                }
            }
            this.valIndex();
            this.blockUI.stop();
        })
    }

    loadCustomerBagData(customerBag: any): void {
        this.blockUI.start('Cargando...');
        const request: any = {};
        request.CustomerBagID = customerBag.CustomerBagID;
        request.CustomerID = customerBag.CustomerID;
        request.BagID = customerBag.BagID;
        this.customerData.CustomerBagID = customerBag.CustomerBagID;
        this.customerData.CustomerID = customerBag.CustomerID;
        this.customerData.BagID = customerBag.BagID;
        this._collectionService.getData('api/customerbag/getcustomerbagbyid', request)
            .subscribe(data => {
                this.customerBagData = data.objCustomerBag;
                if (this.customerBagData.Phones != null) {
                    this.customerBagPhoneData = this.customerBagData.Phones;
                }
                if (this.customerBagData.Managements != null) {
                    this.customerBagManagementsData = this.customerBagData.Managements;
                    this.customerBagManagementsDataBack = this.customerBagManagementsData;
                }
                if (this.customerBagData.Accounts != null) {
                    this.customerBagAccountData = this.customerBagData.Accounts;
                }
                this.blockUI.stop();
            })
    }

    handleSelectPhone(selectPhone: any): void {
       this.selectPhone = selectPhone;
       const id = this.selectPhone.phoneID;
       this.customerBagManagementsDataBack = this.customerBagManagementsData.filter(x => x.PhoneID == id);
    }

    handleLoadManagement(loadManagement: any[]): void {
        this.customerBagManagementsData = loadManagement;
        this.customerBagManagementsDataBack = loadManagement;
    }

    valIndex(): void {
        if (this.indexAssign === 0) {
            this.btnprevState = true;
        } else {
            this.btnprevState = false;
        }

        const maxIndex: number = this.lstAssign.length;
        if (this.indexAssign === maxIndex - 1) {
            this.btnnextState = true;
        } else {
            this.btnnextState = false;
        }
    }

    nextCustomer(): void {
        this.indexAssign = this.indexAssign + 1;
        const CustBag: any = this.lstAssign[this.indexAssign];
        this.loadCustomerBagData(CustBag);
        this.valIndex();
    }

    prevCustomer(): void {
        this.indexAssign = this.indexAssign - 1;
        const CustBag : any = this.lstAssign[this.indexAssign];
        this.loadCustomerBagData(CustBag);
        this.valIndex();
    }
}