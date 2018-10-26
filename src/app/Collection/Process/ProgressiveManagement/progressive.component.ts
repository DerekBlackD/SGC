import { Component } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-progressive-component',
    templateUrl: 'progressive.component.html',
    styleUrls: ['progressive.component.css']
})
export class ProgressiveManagementComponent {
    @BlockUI() blockUI: NgBlockUI;
    customerBagData: any = {};
    customerBagPhoneData: any[] = [];
    customerBagAddressData: any[] = [];
    customerBagManagementsData: any[] = [];
    customerBagManagementsDataBack: any[] = [];
    customerBagAccountData: any[] = [];

    lstCustBagProgressive: any[] = [];
    lstProgressive: any[] = []; // List of Progressive options
    oProgressive: any = {};
    lstAssign: any[] = []; // Array of customer bags
    selectPhone: any = {}; // Phone selected
    selectAddress: any = {}; // Address selected
    customerData: any = {};
    accountTotal: any = {}; // Summary of account
    progressiveModel: any = {}; // Model
    // form variables
    showPhoneOrAddress = true; // Show phones or addresses
    btnprevState: boolean; // Style class of previus assignment button
    btnnextState: boolean; // Style class of next assignment button
    btnFilter: boolean; // Style class of filter button
    indexAssign = 0; // Index of arrays of customer bags
    // Agent info
    mngtAgentID: number;
    agentData: any = {};

    intIndex = 0;
    intCountList = 0;

    constructor(private _collectionService: CollectionService) {
        this.resetVariables();
        this.mngtAgentID = this._collectionService.getAgentID();
        if (this.mngtAgentID !== 0) {
            this.agentData = this._collectionService.getAgentData();
            if (this.agentData.Type === 1 || this.agentData.Type === 3) {
                this.showPhoneOrAddress = true;
            } else {
                this.showPhoneOrAddress = false;
            }
        } else {
            alert('No tiene asociado ningún código de gestor.');
        }

        this.loadProgressiveOption();
    }

    resetVariables(): void {
        this.customerBagPhoneData = [];
        this.customerBagAddressData = [];
        this.customerBagManagementsData = [];
        this.customerBagManagementsDataBack = [];
        this.customerBagAccountData = [];
        this.selectPhone.phoneID = 0;
        this.selectPhone.phoneNumber = '';
        this.selectAddress.AddressID = 0;
        this.selectAddress.Address = '';
        this.customerData.CustomerBagID = 0;
        this.customerData.CustomerID = 0;
        this.customerData.BagID = 0;
        this.progressiveModel.OptionProg = '';
    }

    AddAmounts(customerBagAccountData: any[]): void {
        let totalCapital = 0;
        let totalCampaign1 = 0;
        let totalCampaign2 = 0;
        let totalCapitalDol = 0;
        let totalCampaign1Dol = 0;
        let totalCampaign2Dol = 0;
        for (const item of customerBagAccountData) {
            if (item.Money === 1) {
                totalCapital = totalCapital + item.TotalDebt;
                totalCampaign1 = totalCampaign1 + item.Amount1;
                totalCampaign2 = totalCampaign2 + item.Amount2;
            }
            if (item.Money === 2) {
                totalCapitalDol = totalCapital + item.TotalDebt;
                totalCampaign1Dol = totalCampaign1 + item.Amount1;
                totalCampaign2Dol = totalCampaign2 + item.Amount2;
            }
        }
        this.accountTotal.totalCapital = totalCapital;
        this.accountTotal.totalCampaign1 = totalCampaign1;
        this.accountTotal.totalCampaign2 = totalCampaign2;
        this.accountTotal.totalCapitalDol = totalCapitalDol;
        this.accountTotal.totalCampaign1Dol = totalCampaign1Dol;
        this.accountTotal.totalCampaign2Dol = totalCampaign2Dol;
    }

    loadCustomerBagData(customerBag: any): void {
        
        this.resetVariables();
        const request: any = {};
        this._collectionService.restartData(3);
        request.CustomerBagID = customerBag.CustomerBagID;
        request.CustomerID = customerBag.CustomerID;
        request.BagID = customerBag.BagID;
        this.customerData.CustomerBagID = customerBag.CustomerBagID;
        this.customerData.CustomerID = customerBag.CustomerID;
        this.customerData.BagID = customerBag.BagID;
        this.customerData.FilterID = this.oProgressive.FilterID;
        this.customerData.FilterLine = this.lstCustBagProgressive[this.intIndex].FilterLine;
        this._collectionService.getData('api/customerbag/getcustomerbagbyid', request)
            .subscribe(data => {
                this.customerData.DocNumber = data.objCustomerBag.DocNumber;
                this.customerData.Name = data.objCustomerBag.Name;
                this.customerBagData = data.objCustomerBag;
                if (this.customerBagData.Phones != null) {
                    this.customerBagPhoneData = this.customerBagData.Phones;
                }
                if (this.customerBagData.Addresses != null) {
                    this.customerBagAddressData = this.customerBagData.Addresses;
                }
                if (this.customerBagData.Managements != null) {
                    this.customerBagManagementsData = this.customerBagData.Managements;
                    this.customerBagManagementsDataBack = this.customerBagManagementsData;
                }
                if (this.customerBagData.Accounts != null) {
                    this.customerBagAccountData = this.customerBagData.Accounts;
                    this.AddAmounts(this.customerBagAccountData);
                }

                this.selectPhone.phoneID = this.lstCustBagProgressive[this.intIndex].PhoneID;
                this.selectPhone.phoneNumber = this.lstCustBagProgressive[this.intIndex].Phone;

                window.location.href = 'sip:' + this.lstCustBagProgressive[this.intIndex].Phone;
                this.blockUI.stop();
            })
    }

    loadProgressiveOption(): void {
        const data: any = {};
        data.AgentID = this._collectionService.getAgentID();
        data.Fact = 1;

        this._collectionService.getData('api/sgc/CustomerBagFilter/GetFilterManagementQuery/get', data)
            .subscribe(response => {
                this.lstProgressive = response.lstCustomerBagFilter;
        })
    }

    StartProgressive(): void {
        this.intIndex = 0;
        this.ProgressiveContinues();
    }

    ProgressiveContinues(): void {
        this.blockUI.start('Cargando...');
        const customerBag: any = {};
        customerBag.CustomerBagID = this.lstCustBagProgressive[this.intIndex].CustomerBagID;
        customerBag.CustomerID = this.oProgressive.CustomerID;
        customerBag.BagID = this.oProgressive.BagID;

        this.loadCustomerBagData(customerBag);
    }

    SearchDetailProgressive(): void {
        this.blockUI.start('Cargando...');
        const data: any = {};

        this.oProgressive = this.lstProgressive.find(x => x.FilterID == this.progressiveModel.OptionProg);
        // this.oProgressive.CustomerID;
        // this.oProgressive.BagID;

        data.AgentID = this._collectionService.getAgentID();
        data.ID = this.progressiveModel.OptionProg;

        this._collectionService.getData('api/sgc/CustomerBagFilter/GetFilterManagementDetailQuery/get', data)
            .subscribe(response => {
                this.lstCustBagProgressive = response.lstBECustomerBagFilterDetail;
                this.intCountList = this.lstCustBagProgressive.length;
                this.blockUI.stop();
        })
    }

    handleSelectPhone(selectPhone: any): void {
        // this.selectPhone = selectPhone;
        // const id = this.selectPhone.phoneID;
        // this.customerBagManagementsDataBack = this.customerBagManagementsData.filter(x => x.PhoneID == id);
     }

     handleSelectAddress(selectAddress: any): void {
        // this.selectAddress = selectAddress;
        // const id = this.selectAddress.AddressID;
        // this.customerBagManagementsDataBack = this.customerBagManagementsData.filter(x => x.AddressID == id);
    }

    handleChangeManagement(addressOrPhone: boolean): void {
        this.showPhoneOrAddress = addressOrPhone;
    }

    handleLoadManagement(loadManagement: any[]): void {
        // this.customerBagManagementsData = loadManagement;
        // this.customerBagManagementsDataBack = loadManagement;
        this.intIndex = this.intIndex + 1;
        this.ProgressiveContinues();
    }
}
