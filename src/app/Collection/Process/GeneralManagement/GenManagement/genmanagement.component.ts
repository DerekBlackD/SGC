import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'gen-management',
    templateUrl: 'genmanagement.component.html',
    styleUrls: ['../general.component.css']
})
export class GenManagement{
     // Input Output Variables
     @Input() selectPhone: any = {};
     @Input() customerData: any = {};
     @Output() loadmanagements = new EventEmitter;
     @BlockUI() blockUI: NgBlockUI;
     // Data Variables
     selectResult: any = {};
     oManagement: any = {};
     CustBagManagementsData: any[] = [];
     oResultCodes: any[] = [];
     lstMngtType: any;
     lstContact: any;
     lstLocation: any;
     lstTypeComp: any;
     lstCurrency: any;
     startDate: string;
     // Control Handlers Variables
     showPayComp = false;
     todayDate: string;

     constructor(private _collectionService: CollectionService,
                private _util: UtilitesService) {
         this.resetVariables();
         this.loadResult();
         this.loadData();
     }

     resetVariables(): void {
        this.oManagement.ResultID = '';
        this.oManagement.LocationContact = '';
        this.oManagement.ContactID = '';
        this.oManagement.TypeComp = '';
        this.oManagement.DateCompString = this._util.getDate();
        this.oManagement.Currency = '';
        this.oManagement.Amount = '0.00';
        this.oManagement.MngtType = 1;
        this.startDate = this._util.getDateTime();
        this.todayDate = this._util.getDate();
     }

     loadResult(): void {
        this._collectionService.getAllData('api/Result/getResult/1')
            .subscribe(result => {
                this.oResultCodes = result;
        })
    }

    loadData(): void {
        const dataMngtType: any = {}; dataMngtType.GroupID = '5';
        const dataContact: any = {}; dataContact.GroupID = '4';
        const dataLocation: any = {}; dataLocation.GroupID = '13';
        const dataTypeComp: any = {}; dataTypeComp.GroupID = '11';
        const dataCurrency: any = {}; dataCurrency.GroupID = '12';
        Observable.forkJoin(
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataMngtType),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataContact),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataLocation),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataTypeComp),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataCurrency)
        ).subscribe(data => {
                this.lstMngtType = data[0].lstGeneralCode;
                this.lstContact = data[1].lstGeneralCode;
                this.lstLocation = data[2].lstGeneralCode;
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

    changeResult(val: number): void {
        this.selectResult = this.oResultCodes.find(x => x.ResultID == val);
        if (val == 1) {
            this.showPayComp = true;
            this.oManagement.ApplyPayComp = 1;
        } else {
            this.showPayComp = false;
            this.oManagement.ApplyPayComp = 0;
        }
    }


    saveManagement(): void {
        this.blockUI.start('Cargando...');

        this.oManagement.CustomerBagID = this.customerData.CustomerBagID;
        this.oManagement.CustomerID = this.customerData.CustomerID;
        this.oManagement.AgentID = 1;
        this.oManagement.BagID = this.customerData.BagID;
        this.oManagement.MngtDateString = this._util.getDateTime();
        this.oManagement.MngtClass = '1';
        this.oManagement.AgentTypist = 1;
        this.oManagement.AddressID = 0;
        this.oManagement.PhoneID = this.selectPhone.phoneID;
        this.oManagement.MngtReason = '';
        this.oManagement.MngtNormalize = '';
        this.oManagement.Priority = this.selectResult.Priority;
        this.oManagement.SubPriority = this.selectResult.SubPriority;
        this.oManagement.StartDateString = this.startDate;
        this.oManagement.EndDateString = this._util.getDateTime();
        this.oManagement.User = 'jpena';

        this._collectionService.getAllDataByID('api/customerbag/postcustbagmanagement', this.oManagement)
            .subscribe(result => {
                this.loadManagements();
                this.resetVariables();
                this.todayDate = this._util.getDate();
                this.blockUI.stop();
            })
    }
}
