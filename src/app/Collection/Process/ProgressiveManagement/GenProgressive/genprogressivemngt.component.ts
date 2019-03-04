import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CalendarModule } from 'primeng/primeng';

@Component({
    selector: 'app-gen-progressivemngt',
    templateUrl: 'genprogressivemngt.component.html',
    styleUrls: ['../../GeneralManagement/general.component.css']
})
export class GenProgressiveMngtComponent {
     // Input Output Variables
     @Input() selectPhone: any = {};
     @Input() customerData: any = {};
     @Output() loadmanagements = new EventEmitter;
     @BlockUI() blockUI: NgBlockUI;
     // Data Variables
     selectResult: any = {}; // Result code selected
     selectLocation: any = {}; // Location code selected
     oManagement: any = {}; // Model of managements
     CustBagManagementsData: any[] = []; // List of managements of customer bag
     oResultCodes: any[] = []; // List of management result codes
     lstAllResultCodes: any[] = []; // List of all result code of app
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
     // Global Data
     mngtAgentID: number;
     userData: any = {};
     agentData: any = {};
     PhoneOrCamp: boolean;

     // Config Variables
     filterContactPlace: string;

     constructor(private _collectionService: CollectionService,
                private _util: UtilitesService) {
        this.mngtAgentID = this._collectionService.getAgentID();
        this.userData = this._collectionService.getUserData();
        this.agentData = this._collectionService.getAgentData();

        this.resetVariables();
        this.loadResult();
        this.loadData();

        this._collectionService.getConfigFile().subscribe(res => {
            this.filterContactPlace = res[0].FiltroLugarContacto;
        });

        this.managementPhone();

        // if (this.agentData.Type === 1 || this.agentData.Type === 3) {
        //     this.managementPhone();
        // }

        // if (this.agentData.Type === 2 || this.agentData.Type === 4) {
        //     this.managementAddress();
        // }

        // this._collectionService.changeEmitted$.subscribe(
        // response => {
        //     this.resetVariables();
        //     if (response) {
        //         if (response === 2) {
        //             this.managementAddress();
        //         }

        //         if (response === 1) {
        //             this.managementPhone();
        //         }
        //     }
        // });


     }

     managementPhone(): void {
        this.lstMngtType = this._collectionService.getGeneralCode(28);
        this.lstLocation = this._collectionService.getGeneralCode(26);
        this.oManagement.MngtType = this.lstMngtType[0].ID;
        this.oResultCodes = this.lstAllResultCodes.filter(x => x.Class === 'CALL');
        this.PhoneOrCamp = true;
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
        this.showPayComp = false;
        this.oManagement.ApplyPayComp = 0;
        this.startDate = this._util.getDateTime();
        this.todayDate = this._util.getDate();
        this.selectPhone.phoneID = 0;
        this.selectPhone.phoneNumber = '';
        this.submitted = false;
     }

     loadResult(): void {
        const data: any = {};
        data.Option = 'AllData';

        this._collectionService.getData('api/Result/getResult', data)
            .subscribe(response => {
                this.lstAllResultCodes = response.lstResult;
                this.oResultCodes = this.lstAllResultCodes.filter(x => x.Class === 'CALL');
        })
    }

    loadData(): void {
        this.lstTypeComp = this._collectionService.getGeneralCode(11);
        this.lstCurrency = this._collectionService.getGeneralCode(12);
    }

    loadManagements(): void {
        const request: any = {};
        request.CustomerBagID = this.customerData.CustomerBagID
        this.loadmanagements.emit(this.CustBagManagementsData);
        // this._collectionService.getData('api/customerbag/getcustbagmanagements', this.oManagement)
        //     .subscribe(result => {
        //         this.CustBagManagementsData = result.lstCustomerBagManagements;
        //         this.loadmanagements.emit(this.CustBagManagementsData);
        //     })
    }

    changeResult(val: number): void {
        this.selectResult = this.oResultCodes.find(x => x.ResultID == val);

        //Generar pago por resultado
        if(this.selectResult.blnPayment){
            this.showPayComp = true;
            this.oManagement.ApplyPayComp = 1;
        }else{
            this.showPayComp = false;
            this.oManagement.ApplyPayComp = 0;
        }

        //Generar alerta por resultado
        if(this.selectResult.Alert){
            if (this.customerData.CustomerBagID !== 0) {
                this._collectionService.showModal('alert');
            } else {
                alert('Debe de seleccionar un cliente');
            }
        }
    }

    changeLocation(locationIDSel: any): void {
        this.selectLocation = this.lstLocation.find(x => x.ID == locationIDSel);
        this.lstContact = this._collectionService.getGeneralCode(this.selectLocation.SubRelation);
    }


    saveManagement(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            let classMngt: string;
            if (this.mngtAgentID === 0 || this.mngtAgentID == null) {
                alert('No puede gestionar. No tiene asociado ningún código de gestor.');
                return;
            }

            if (this.PhoneOrCamp) {
                if (this.agentData.Type === 2 || this.agentData.Type === 4) {
                    alert('Usted no puede realizar gestiones telefónicas.');
                    return;
                }

                if (this.selectPhone == null || this.selectPhone.phoneID === 0) {
                    alert('Seleccionar un teléfono.');
                    return;
                }

                classMngt = '1';
                this.oManagement.MngtDateString = this._util.getDateTime();
            }

            this.blockUI.start('Cargando...');
            this.oManagement.CustomerBagID = this.customerData.CustomerBagID;
            this.oManagement.CustomerID = this.customerData.CustomerID;
            this.oManagement.AgentID = this._collectionService.getAgentID();
            this.oManagement.BagID = this.customerData.BagID;
            this.oManagement.MngtClass = classMngt;
            this.oManagement.AgentTypist = 0;
            this.oManagement.AddressID = 0;
            this.oManagement.PhoneID = this.selectPhone.phoneID;
            this.oManagement.MngtReason = '';
            this.oManagement.MngtNormalize = '';
            this.oManagement.Priority = this.selectResult.Priority;
            this.oManagement.SubPriority = this.selectResult.SubPriority;
            this.oManagement.StartDateString = this.startDate;
            this.oManagement.EndDateString = this._util.getDateTime();
            this.oManagement.User = this.userData.UserName;
            this.oManagement.FilterID = this.customerData.FilterID;
            this.oManagement.FilterLine = this.customerData.FilterLine;

            const oRequest:any={};
            oRequest.CustomerBagManagement = this.oManagement;
            oRequest.oResult = this.selectResult;

            this._collectionService.getData('api/customerbag/PostManagementAsync/post', oRequest)
                .subscribe(result => {
                    this.blockUI.stop();
                    this.loadManagements();
                    this.resetVariables();
                    this.todayDate = this._util.getDate();
                })
        }
    }
}
