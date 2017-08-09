import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'gen-management',
    templateUrl: 'genmanagement.component.html',
    styleUrls: ['../general.component.css']
})
export class GenManagement{
     @Input() selectPhone: any = {};
     @Input() customerData: any = {};
     @Output() loadmanagements = new EventEmitter;
     @BlockUI() blockUI: NgBlockUI;
     selectResult: any = {};
     oManagement: any = {};
     CustBagManagementsData: any[] = [];
     oResultCodes: any[] = [];
     lstMngtType: any;
     lstContact: any;
     lstCondition: any;
     lstTypeComp: any;
     lstCurrency: any;
     startDate: string;
     showPayComp: boolean = false;

     constructor(private _collectionService: CollectionService){
         this.oManagement.ResultID = '';
         this.oManagement.AgentTypeID = ''
         this.oManagement.MngtCondition = '';
         this.oManagement.ContactID = '';
         this.oManagement.TypeComp = '';
         this.oManagement.DateCompString = this.getDate();
         this.oManagement.Currency = '';
         this.oManagement.Amount = '0.00';
         this.startDate = this.getDateTime();
         this.loadResult();
         this.loadData();
     }

     loadResult(): void {
        this._collectionService.getAllData('api/Result/getResult/1')
            .subscribe(result =>{
                this.oResultCodes = result;
        })
    }

    loadData():void{
        let dataMngtType: any = {}; dataMngtType.GroupID = "5";
        let dataContact: any = {}; dataContact.GroupID = "4";
        let dataCondition: any = {}; dataCondition.GroupID = "10";
        let dataTypeComp: any = {}; dataTypeComp.GroupID = "11";
        let dataCurrency: any = {}; dataCurrency.GroupID = "12";
        Observable.forkJoin(
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataMngtType),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataContact),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataCondition),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataTypeComp),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataCurrency)
        ).subscribe(data => {
                this.lstMngtType = data[0].lstGeneralCode;
                this.lstContact = data[1].lstGeneralCode;
                this.lstCondition = data[2].lstGeneralCode;
                this.lstTypeComp = data[3].lstGeneralCode;
                this.lstCurrency = data[4].lstGeneralCode;
            }
        )
    }

    loadManagements(): void {
        const request: any = {};
        request.CustomerBagID = this.customerData.CustomerBagID
        this._collectionService.getAllDataByID('api/customerbag/getcustbagmanagements', this.oManagement)
            .subscribe(result => {
                this.CustBagManagementsData = result.lstCustomerBagManagements;
                this.loadmanagements.emit(this.CustBagManagementsData);
            })
    }

    changeResult(val: number): void{
        this.selectResult = this.oResultCodes.find(x => x.ResultID == val);
        if (val == 1){
            this.showPayComp = true;
            this.oManagement.ApplyPayComp = 1;
        }else{
            this.showPayComp = false;
            this.oManagement.ApplyPayComp = 0;
        }
    }

    getDateTime(): string{
        let today = new Date();
        var m = today.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var year = today.getFullYear();
        var day = today.getDate();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        let date = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        return date;
    }

    getDate(): string {
        const today = new Date();
        const m = today.getMonth() + 1;
        const month = (m < 10) ? '0' + m : m;
        const year = today.getFullYear();
        const d = today.getDate();
        const day = (d < 10) ? '0' + d : d;
        const date = `${year}-${month}-${day}`;
        return date;
    }

    saveManagement(): void{
        this.blockUI.start('Cargando...');

        this.oManagement.CustomerBagID = this.customerData.CustomerBagID;
        this.oManagement.CustomerID = this.customerData.CustomerID;
        this.oManagement.AgentID = 0;
        this.oManagement.BagID = this.customerData.BagID;
        this.oManagement.MngtDateString = this.getDateTime();
        this.oManagement.AgentTypist = 1;
        this.oManagement.AddressID = 0;
        this.oManagement.PhoneID = this.selectPhone.phoneID;
        this.oManagement.MngtReason = '';
        this.oManagement.MngtNormalize = '';
        this.oManagement.Priority = this.selectResult.Priority;
        this.oManagement.SubPriority = this.selectResult.SubPriority;
        this.oManagement.StartDateString = this.startDate;
        this.oManagement.EndDateString = this.getDateTime();
        this.oManagement.User = 'jpena';

        this._collectionService.getAllDataByID('api/customerbag/postcustbagmanagement', this.oManagement)
            .subscribe(result => {
                this.loadManagements();
                this.blockUI.stop();
            })
    }
}