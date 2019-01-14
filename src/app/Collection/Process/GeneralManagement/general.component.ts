import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogService } from 'ng2-bootstrap-modal';
import { CalendarModule, DialogModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { GenCustomerBagSearch } from './GenCustomerBagSearch/gensearch.component';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyModule, ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'general-component',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralManagementComponent {
    @BlockUI() blockUI: NgBlockUI;
    customerBagData: any = {};
    customerBagPhoneData: any[] = [];
    customerBagAddressData: any[] = [];
    customerBagManagementsData: any[] = [];
    customerBagManagementsDataBack: any[] = [];
    customerBagAccountData: any[] = [];
    customerBagPay: any[]=[];
    customerBagAlert:any[]=[]; //Alertar de gestor
    lstAssign: any[] = []; // Array of customer bags

    lstAccountHead: any[]=[];
    lstAccountBody: any[]=[];
    lstAccountFoot: any[]=[];
    lstAccountFormat: any[]=[];

    selectPhone: any = {}; // Phone selected
    selectAddress: any = {}; // Address selected
    customerData: any = {};
    accountTotal: any = {}; // Summary of account
    // form variables
    showPhoneOrAddress = true; // Show phones or addresses
    btnprevState: boolean; // Style class of previus assignment button
    btnnextState: boolean; // Style class of next assignment button
    btnFilter: boolean; // Style class of filter button
    indexAssign = 0; // Index of arrays of customer bags
    searchType: string;
    // Agent info
    mngtAgentID: number;
    agentData: any = {};

    // Router Params
    routerCustomerBagID: number;
    routerCustomerID: number;
    routerBagID: number;

    // Alert
    gAlertID:number=0;

    constructor(private _collectionService: CollectionService,
                private dialogService: DialogService,
                private toastyService: ToastyService,
                private toastyConfig: ToastyConfig,
                private route: ActivatedRoute,
                private router: Router) {

        this.searchType = '1';
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

        this._collectionService.selectEmiited$.subscribe(
            response => {
                if (response) {
                    const customerBag: any = {};
                    customerBag.CustomerBagID = response.CustomerBagID;
                    customerBag.CustomerID = response.CustomerID;
                    customerBag.BagID = response.BagID;
                    this.loadCustomerBagData(customerBag);
                }
            });

        this.route.params.subscribe(params => {
            if (params['ID'] != null) {
                this.routerCustomerBagID = params['ID'];
            }
            if (params['CustomerID'] != null) {
                this.routerCustomerID = params['CustomerID'];
            }
            if (params['BagID'] != null) {
                this.routerBagID = params['BagID'];
            }

            //ID Alert
            if(params['AlertID'] != null){
                this.gAlertID = params['AlertID'];
            }

            if (params['ID'] != null && params['CustomerID'] != null && params['BagID'] != null) {
                const customerBag: any = {};
                customerBag.CustomerBagID = this.routerCustomerBagID;
                customerBag.CustomerID = this.routerCustomerID;
                customerBag.BagID = this.routerBagID;
                this.loadCustomerBagData(customerBag);

            } else {
                this.loadAssignment();
            }
        });
    }

    addToast() {
        // Just add default Toast with title only
        // this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        const toastOptions: ToastOptions = {
            title: 'prueba',
            msg: 'Este mensaje de prueba',
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
                // console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast: ToastData) {
                // console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        // this.toastyService.success(toastOptions);
        // this.toastyService.wait(toastOptions);
        // this.toastyService.error(toastOptions);
        // this.toastyService.warning(toastOptions);
    }

    resetVariables(): void {
        this.customerBagPhoneData = [];
        this.customerBagAddressData = [];
        this.customerBagManagementsData = [];
        this.customerBagManagementsDataBack = [];
        this.customerBagAccountData = [];
        this.customerBagPay = [];
        this.selectPhone.phoneID = 0;
        this.selectPhone.phoneNumber = '';
        this.selectAddress.AddressID = 0;
        this.selectAddress.Address = '';
        this.customerData.CustomerBagID = 0;
        this.customerData.CustomerID = 0;
        this.customerData.BagID = 0;
    }

    onEnter(value: string) {
        let url = '';
        if (this.searchType === '1') {
            url = 'api/sgc/customerbag/getsearchbydocument/get';
        }
        if (this.searchType === '2') {
            url = 'api/sgc/customerbag/getsearchbyname/get';
        }
        if (this.searchType === '3') {
            url = 'api/sgc/customerbag/getsearchbyphone/get';
        }

        this.searchCustomerBag(value, url);
    }

    searchCustomerBag(text: string, url: string): void {
        const request: any = {};
        request.SearchText = text;

        this._collectionService.getData(url, request)
            .subscribe(data => {
              if (data.lstCustomerBag != null) {
                  if (data.lstCustomerBag.length > 0) {
                      if (data.lstCustomerBag.length === 1) {
                        const customerBag: any = {};
                        customerBag.CustomerBagID = data.lstCustomerBag[0].CustomerBagID;
                        customerBag.CustomerID = data.lstCustomerBag[0].CustomerID;
                        customerBag.BagID = data.lstCustomerBag[0].BagID;
                        this.loadCustomerBagData(customerBag);
                      } else {
                        // show popup and send list
                        const inputParameter: any = {};
                        inputParameter.modalName = 'searchResult';
                        inputParameter.lstData = data.lstCustomerBag;
                        this._collectionService.showModal(inputParameter);
                      }
                  } else {
                      alert('No se encontraron registros.');
                  }
              }
            })
    }

    showCreateAlert(): void {
        if (this.customerData.CustomerBagID !== 0) {
            this._collectionService.showModal('alert');
        } else {
            alert('Debe de seleccionar un cliente');
        }
    }

    loadAssignment(): void {
        this.blockUI.start('Cargando...');
        this.resetVariables();
        const data: any = {};

        data.AgentID = this.mngtAgentID;
        data.Year = '2017';
        data.Month = '11';

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
                }

                this.valIndex();
            } else {
                this.btnnextState = true;
                this.btnprevState = true;
                this.btnFilter = true;
            }
            this.blockUI.stop();
        })
    }

    loadCustomerBagData(customerBag: any): void {
        this.blockUI.start('Cargando...');
        this.resetVariables();
        const request: any = {};
        this._collectionService.restartData(3);
        request.CustomerBagID = customerBag.CustomerBagID;
        request.CustomerID = customerBag.CustomerID;
        request.BagID = customerBag.BagID;
        this.customerData.CustomerBagID = customerBag.CustomerBagID;
        this.customerData.CustomerID = customerBag.CustomerID;
        this.customerData.BagID = customerBag.BagID;
        
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
                //if (this.customerBagData.Accounts != null) {
                  //  this.customerBagAccountData = this.customerBagData.Accounts;
                    //this.AddAmounts(this.customerBagAccountData);
                //}
                if(this.customerBagData.Pays!= null){
                    this.customerBagPay = this.customerBagData.Pays;
                }

                this.lstAccountFormat = this.customerBagData.LstAccountFormat;
                this.lstAccountHead = this.customerBagData.LstHead;
                this.lstAccountBody = this.customerBagData.LstBody;
                this.lstAccountFoot = this.customerBagData.LstFoot;

                this.blockUI.stop();
            })
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

    handleSelectPhone(selectPhone: any): void {
       this.selectPhone = selectPhone;
       const id = this.selectPhone.phoneID;
       this.customerBagManagementsDataBack = this.customerBagManagementsData.filter(x => x.PhoneID == id);
    }

    handleSelectAddress(selectAddress: any): void {
        this.selectAddress = selectAddress;
        const id = this.selectAddress.AddressID;
        this.customerBagManagementsDataBack = this.customerBagManagementsData.filter(x => x.AddressID == id);
    }

    handleChangeManagement(addressOrPhone: boolean): void {
        this.showPhoneOrAddress = addressOrPhone;
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
        const CustBag: any = this.lstAssign[this.indexAssign];
        this.loadCustomerBagData(CustBag);
        this.valIndex();
    }

    showListPay(){
        if (this.customerData.CustomerBagID !== 0) {
            if(this.customerBagPay.length!==0){
                this._collectionService.showModalPay(true);
            }else{
                alert('Cliente no ha realizado pagos');
            }            
        } else {
            alert('Debe de seleccionar un cliente');
        }
    }
}