import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'Account-component',
    templateUrl: 'Account.component.html',
    styleUrls: ['Account.component.css'],
})

export class AccountComponent implements OnInit{
    Account: any={};
    Customer: any[] = [];
    Bag: any [] = [];
    Bag1: any [] = [];
    lstAccount: any[]=[];
    intCod: number;

    constructor(private _CollectionService : CollectionService,
        private _util: UtilitesService
    ){
        
    }

    ngOnInit(){
        this.FLoad();
    }

    FLoad():void{
        this.Account.clienteid="0";
        this.Account.carteraid="0";

        this.FGetCustomer("AllDataByGroup",0);
        this.FGetBag("AllDataCustomer",0,0);
        this.FAccount('AllDataAccount',0);
    }

    FSelectField(_description:string):void{
        console.log('tabla: ' + _description);
    }

    FAccount(_Option:string,_FormatID:number):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = this.Account.clienteid;
        request.BagID = this.Account.carteraid;
        request.FormatID = _FormatID;

        this._CollectionService.getData('api/FormatAccount/GetFormatAccount',request)
        .subscribe(result=>{
            this.lstAccount = result.lstBEFormatAccount;
            console.log('Respuesta del sistema: cod {'+ result.strResponseCode +'} msg {'+result.strResponseMsg+'}');
        })

    }

    onBagID(event:Event):void{
        this.Account.carteraid="0";
        this.intCod = Number((event.target as HTMLSelectElement).value);

        this.Bag = this.Bag1.filter(x => x.CustomerID == this.intCod);
    }

    FGetCustomer(_Option:string,_CustomerID:number):void{        
        let request: any= {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/customer/GetCustomerByID',request)
            .subscribe(result =>{
                this.Customer = result.lstBECustomer;
        })
    }

    FGetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/Bag/GetBag',request)
            .subscribe(result =>{
                this.Bag1 = result.lstBEBag;
        })
    }
}