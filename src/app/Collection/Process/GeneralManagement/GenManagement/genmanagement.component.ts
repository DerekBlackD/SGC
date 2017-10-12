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
export class GenManagement {
     // Input Output Variables
     @Input() selectPhone: any = {};
     @Input() selectAddress: any = {};
     @Input() customerData: any = {};
     @Output() loadmanagements = new EventEmitter;
     @BlockUI() blockUI: NgBlockUI;
     // Data Variables
     selectResult: any = {}; // Result code selected
     oManagement: any = {}; // Model of managements
     CampMngtDate: string; // Model of Camp managemente date
     CustBagManagementsData: any[] = []; // List of managements of customer bag
     oResultCodes: any[] = []; // List of management result codes
     lstMngtType: any; // Drop down management type
     lstContact: any; // Drop down conctact customer
     lstLocation: any; // Drop down location customer
     lstTypeComp: any; // Drop down compromise type
     lstCurrency: any; // Drop down currency type
     startDate: string;
     // Control Handlers Variables
     showPayComp = false; // Flag for show compromise type
     todayDate: string; // Today date in string format
     submitted = false; // Flag for submit form validation
     showInputDate = true; // Flag for show or hide input date
     // User/Agent Info
     mngtAgentID: number;
     userData: any = {};
     agentData: any = {};

     constructor(private _collectionService: CollectionService,
                private _util: UtilitesService) {
        this.mngtAgentID = this._collectionService.getAgentID();
        this.userData = this._collectionService.getUserData();
        this.agentData = this._collectionService.getAgentData();

        if (this.agentData.Type === 1) {
            this.showInputDate = true;
        }

        if (this.agentData.Type === 2) {
            this.showInputDate = false;
        }

        this.CampMngtDate = this._util.getDateForInput();

        this.resetVariables();
        this.loadResult();
        this.loadData();
     }

     resetVariables(): void {
        this.oManagement.ResultID = '';
        this.oManagement.LocationContact = '';
        this.oManagement.ContactID = '';
        this.oManagement.Observation = '';
        this.oManagement.TypeComp = '';
        this.oManagement.DateCompString = this._util.getDateForInput();
        this.oManagement.Currency = '';
        this.oManagement.Amount = '0.00';

        if (this.agentData.Type === 1) {
            this.oManagement.MngtType = 1;
        }

        if (this.agentData.Type === 2) {
            this.oManagement.MngtType = 4;
        }

        this.showPayComp = false;
        this.oManagement.ApplyPayComp = 0;
        this.startDate = this._util.getDateTime();
        this.todayDate = this._util.getDate();
        this.selectPhone.phoneID = 0;
        this.selectPhone.phoneNumber = '';
        this.selectAddress.AddressID = 0;
        this.selectAddress.Address = '';
        this.submitted = false;
     }

     loadResult(): void {
        this._collectionService.getAllData('api/Result/getResult/1')
            .subscribe(result => {
                if (this.agentData.Type === 1) {
                    result = result.filter(x => x.Class === 'CALL')
                }

                if (this.agentData.Type === 2) {
                    result = result.filter(x => x.Class === 'CAMPO')
                }
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
            this._collectionService.getData('api/common/getallcodebygroupID', dataMngtType),
            this._collectionService.getData('api/common/getallcodebygroupID', dataContact),
            this._collectionService.getData('api/common/getallcodebygroupID', dataLocation),
            this._collectionService.getData('api/common/getallcodebygroupID', dataTypeComp),
            this._collectionService.getData('api/common/getallcodebygroupID', dataCurrency)
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
        this._collectionService.getData('api/customerbag/getcustbagmanagements', this.oManagement)
            .subscribe(result => {
                this.CustBagManagementsData = result.lstCustomerBagManagements;
                this.loadmanagements.emit(this.CustBagManagementsData);
            })
    }

    changeResult(val: number): void {
        this.selectResult = this.oResultCodes.find(x => x.ResultID == val);
        if (val == 1 || val == 21) {
            this.showPayComp = true;
            this.oManagement.ApplyPayComp = 1;
        } else {
            this.showPayComp = false;
            this.oManagement.ApplyPayComp = 0;
        }
    }


    saveManagement(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            console.log(this.CampMngtDate);
            let classMngt: string;
            if (this.mngtAgentID === 0 || this.mngtAgentID == null) {
                alert('No puede gestionar. No tiene asociado ningún código de gestor.');
                return;
            }

            if (this.agentData.Type === 1) {

                if (this.selectAddress.AddressID) {
                    alert('Usted no puede realizar gestiones de campo.');
                    return;
                }

                if (this.selectPhone == null || this.selectPhone.phoneID === 0) {
                    alert('Seleccionar un teléfono.');
                    return;
                }

                classMngt = '1';
                this.oManagement.MngtDateString = this._util.getDateTime();
            }

            if (this.agentData.Type === 2) {
                if (this.CampMngtDate === '') {
                    alert('Seleccionar una fecha de gestión');
                    return;
                }

                if (this.selectPhone.phoneID) {
                    alert('Usted no puede realizar gestiones telefónicas.');
                    return;
                }

                if (this.selectAddress == null || this.selectAddress.AddressID === 0) {
                    alert('Seleccionar una dirección.');
                    return;
                }

                classMngt = '2';
                this.oManagement.MngtDateString = this.CampMngtDate;
            }

            this.blockUI.start('Cargando...');
            this.oManagement.CustomerBagID = this.customerData.CustomerBagID;
            this.oManagement.CustomerID = this.customerData.CustomerID;
            this.oManagement.AgentID = this._collectionService.getAgentID();
            this.oManagement.BagID = this.customerData.BagID;
            // this.oManagement.MngtDateString = this._util.getDateTime();
            this.oManagement.MngtClass = classMngt;
            this.oManagement.AgentTypist = 0;
            this.oManagement.AddressID = this.selectAddress.AddressID;
            this.oManagement.PhoneID = this.selectPhone.phoneID;
            this.oManagement.MngtReason = '';
            this.oManagement.MngtNormalize = '';
            this.oManagement.Priority = this.selectResult.Priority;
            this.oManagement.SubPriority = this.selectResult.SubPriority;
            this.oManagement.StartDateString = this.startDate;
            this.oManagement.EndDateString = this._util.getDateTime();
            this.oManagement.User = this.userData.UserName;

            this._collectionService.getData('api/customerbag/postcustbagmanagement', this.oManagement)
                .subscribe(result => {
                    this.loadManagements();
                    this.resetVariables();
                    this.todayDate = this._util.getDate();
                    this.blockUI.stop();
                })
        }
    }

    // validateManagement(): void {
    //     if (this.selectPhone == null || this.selectPhone.phoneID == null){
    //         alert('Seleccionar un teléfono');
    //         return;
    //     }
    // }
}
