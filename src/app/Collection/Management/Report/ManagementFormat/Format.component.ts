import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'Format-component',
    templateUrl: 'Format.component.html',
})

export class FormatComponent implements OnInit {
    Format:any={};
    lstCustomer:any[]=[];
    lstBag:any[]=[];
    lstBagFilter:any[]=[];

    gblnValidate :boolean=false;

    gstrOption :string="";

    @BlockUI() blockUI: NgBlockUI;


    constructor(
        private _CollectionService : CollectionService,
        private _Util : UtilitesService
    ){
    }

    ngOnInit():void{
        this.FLoad();
    }

    FLoad():void{
        this.FGetCustomer('AllDataByGroup',0);
        this.FGetBag('AllDataCustomer',0,0);

        this.Format.customerid='';
        this.Format.bagid='';
        this.Format.txtDtBegin = this._Util.getDateForInput();
        this.Format.txtDtEnd = this._Util.getDateForInput();

        this.gstrOption = "strDirectoryCreateReportFormat";
    }

    FReport(blnValidate:boolean):void{
        this.gblnValidate = true;
        if(blnValidate){
            this.Format.txtResult = '';
            this.blockUI.start('Cargando...');

            const data:any={};
            data.CustomerID = this.Format.customerid;
            data.BagID = this.Format.bagid;
            data.BegDate = this.Format.txtDtBegin;
            data.EndDate = this.Format.txtDtEnd;

            this._CollectionService.getData('api/Management/GetManagementReportFormat', data).subscribe(res => {
                this.gblnValidate = false;
                this.FCleanFields(res.toString());
                this.blockUI.stop();
            }, err => {
                this.gblnValidate = false;
                console.log('Error del sistema' + err);
                this.blockUI.stop();
            });

        }
    }

    FCleanFields(_strResponse: string): void{
        this.Format.customerid='';
        this.Format.bagid='';
        this.Format.txtDtBegin = this._Util.getDateForInput();
        this.Format.txtDtEnd = this._Util.getDateForInput();
        this.Format.txtResult = _strResponse;
    }

    FGetCustomer(_Option: string,_CustomerID: number): void {
        const request: any = {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get', request)
            .subscribe(result => {
                this.lstCustomer = result.lstBECustomer;
        })
    }

    FGetBag(_Option: string, _CustomerID: number, _BagID: number): void {
        const request: any = {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get', request)
            .subscribe(result => {
                console.log(result);
                this.lstBag = result.lstBEBag;
        })
    }

    FonBagID(event: Event): void {
        this.Format.txtResult = '';
        this.Format.bagid = '0';
        let intCod:number = Number((event.target as HTMLSelectElement).value);

        this.lstBagFilter = this.lstBag.filter(x => x.CustomerID == intCod);
    }
}