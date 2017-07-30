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
    btnprevState: boolean;
    btnnextState: boolean;
    customerBagData: any = {};
    customerBagPhoneData: any[] = [];
    customerBagManagementsData: any[] = [];
    customerBagAccountData: any[] = [];
    index: number = 0;
    lstAssign: any[] = [];
    selectPhone: any = {};
    constructor(private _collectionService: CollectionService){
    }

    ngOnInit() {
        this.loadAssignment();
    }

    loadAssignment(): void{
        this.blockUI.start("Cargando...");
        let data: any = {};

        data.AgentID = "1";
        data.Year = "2017";
        data.Month = "7";

        this._collectionService.getAllDataByID('api/GetAssign', data)
            .subscribe(assign =>{
            this.lstAssign = assign.lstAssignmentByAgent;
            if(assign.objCustomerBag != null){
                this.customerBagData = assign.objCustomerBag;
                if(this.customerBagData.Phones != null){
                    this.customerBagPhoneData = this.customerBagData.Phones;
                }
                if(this.customerBagData.Managements != null){
                    this.customerBagManagementsData = this.customerBagData.Managements;
                }
                if(this.customerBagData.Accounts != null){
                    this.customerBagAccountData = this.customerBagData.Accounts;
                    console.log(this.customerBagAccountData)
                }
            }
            
            this.valIndex();
            this.blockUI.stop();
        })
    }

    loadCustomerBagData(customerBagID: number):void{
        this.blockUI.start("Cargando...");
        let request : any = {};
        request.CustomerBagID = customerBagID;
        this._collectionService.getAllDataByID('api/customerbag/getcustomerbagbyid', request)
            .subscribe(data => {
                this.customerBagData = data.objCustomerBag;
                if(this.customerBagData.Phones != null){
                    this.customerBagPhoneData = this.customerBagData.Phones;
                }
                if(this.customerBagData.Managements != null){
                    this.customerBagManagementsData = this.customerBagData.Managements;
                }
                if(this.customerBagData.Accounts != null){
                    this.customerBagAccountData = this.customerBagData.Accounts;
                }
                this.blockUI.stop();
            })
    }

    handleSelectPhone(selectPhone: any):void{
       this.selectPhone = selectPhone;
    }

    valIndex(): void{
        if (this.index == 0){
            this.btnprevState = true;
        }else{
            this.btnprevState = false;
        }

        let maxIndex: number = this.lstAssign.length;
        if(this.index == maxIndex - 1){
            this.btnnextState = true;
        }else{
            this.btnnextState = false;
        }
    }

    nextCustomer(): void{
        this.index = this.index + 1;
        let custBagID : number = this.lstAssign[this.index].CustomerBagID;
        this.loadCustomerBagData(custBagID);
        this.valIndex();
    }

    prevCustomer(): void{
        this.index = this.index - 1;
        let custBagID : number = this.lstAssign[this.index].CustomerBagID;
        this.loadCustomerBagData(custBagID);
        this.valIndex();
    }
}