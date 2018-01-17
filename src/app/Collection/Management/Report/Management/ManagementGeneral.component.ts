import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'ManagementGeneral-component',
    templateUrl: 'ManagementGeneral.component.html',
})

export class ManagementGeneralComponent implements OnInit{
    Management: any = {};
    Customer: any[] = [];
    Bag: any [] = [];
    Bag1: any [] = [];
    intCod: number;
    lstTipGestion: any[] = [];
    @BlockUI() blockUI: NgBlockUI;

    gstrOption :string="";

    gblnValidate :boolean=false;

    constructor(private _CollectionService: CollectionService,
                private _util: UtilitesService) {}

    ngOnInit() {
        this.FLoad();
    }

    FLoad(): void {
        this.Management.clienteid = 0
        this.Management.carteraid = 0
        this.Management.classid = '';
        this.Management.datebegin = this._util.getDateForInput();
        this.Management.dateend = this._util.getDateForInput();
        this.gstrOption = "strDirectoryCreateReport";

        this.GetCustomer('AllDataByGroup', 0);
        this.GetBag('AllDataCustomer', 0, 0);

        const dataResul1: any = {};
        dataResul1.GroupID = '14';
        Observable.forkJoin(
            this._CollectionService.getData('api/common/getallcodebygroupID', dataResul1),
        ).subscribe(data => {
            this.lstTipGestion = data[0].lstGeneralCode;
        })
    }

    FGenerateReport(isValid: boolean): void {
        this.gblnValidate=true;
        if (isValid) {
            this.blockUI.start('Cargando...');

            this.Management.sResponse = '';

            const data: any = {};
            data.Option = 'MngtGeneral';
            data.ClassID = this.Management.classid;
            data.CustomerID = this.Management.clienteid;
            data.BagID = this.Management.carteraid;
            data.BegDate = this.Management.datebegin.toString('yyyy-mm-dd');
            data.EndDate = this.Management.dateend.toString('yyyy-mm-dd');
            data.strDirection = this.gstrOption;

            this._CollectionService.getData('api/Management/GetReportManagement', data).subscribe(res => {
                this.FCleanFields(res.toString());
                this.blockUI.stop();
                this.gblnValidate = false;
            }, err => {
                console.log('Error del sistema' + err);
                this.blockUI.stop();
                this.gblnValidate = false;
            });
        }
    }

    FReportSummary(blnvalid: boolean):void{
        this.gblnValidate=true;
        if(blnvalid){
            this.blockUI.start('Cargando...');
            
            this.Management.sResponse = '';

            const data: any = {};
            data.Option = 'MngtSummary';
            data.ClassID = this.Management.classid;
            data.CustomerID = this.Management.clienteid;
            data.BagID = this.Management.carteraid;
            data.BegDate = this.Management.datebegin.toString('yyyy-mm-dd');
            data.EndDate = this.Management.dateend.toString('yyyy-mm-dd');
            data.strDirection = this.gstrOption;

            this._CollectionService.getData('api/Management/GetReportManagement', data).subscribe(res => {
                this.FCleanFields(res.toString());
                this.blockUI.stop();
                this.gblnValidate = false;
            }, err => {
                console.log('Error del sistema' + err);
                this.blockUI.stop();
                this.gblnValidate = false;
            });
        }
    }

    onBagID(event: Event): void {
        this.Management.carteraid = '0';
        this.intCod = Number((event.target as HTMLSelectElement).value);

        this.Bag = this.Bag1.filter(x => x.CustomerID == this.intCod);
    }

    GetCustomer(_Option: string,_CustomerID: number): void {
        const request: any = {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get', request)
            .subscribe(result => {
                this.Customer = result.lstBECustomer;
        })
    }

    GetBag(_Option: string, _CustomerID: number, _BagID: number): void {
        const request: any = {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get', request)
            .subscribe(result => {
                console.log(result);
                this.Bag1 = result.lstBEBag;
        })
    }

    FCleanFields(_strResponse: string): void {
        this.Management.sResponse = _strResponse;
        this.Management.clienteid = 0;
        this.Management.carteraid = 0;
        this.Management.classid = '';
        this.Management.datebegin = this._util.getDateForInput();
        this.Management.dateend = this._util.getDateForInput();
    }
}