import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../../Services/collection.service';

@Component({
    selector: 'AccountView-component',
    templateUrl: 'AccountView.component.html',
    styleUrls: ['../Account.component.css']
})

export class AccountView{
    view: any={};
    glstAccount: any[]=[];
    glstAccountFormat: any[]=[];
    glstTotalSol: any[]=[];
    glstTotalDol: any[]=[];
    glstCustomer:any[]=[];
    glstBag:any[]=[];
    glstBagFilter:any[]=[];
    glstCustomerBag:any[]=[];

    gintIDFormatAccount: number;

    gblnValidate:boolean=false;

    @BlockUI() blockUI: NgBlockUI;

    constructor (
        private _CollectionService: CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this.FLoad();
        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            if(this.gintIDFormatAccount != 0){
                this.view.txtID = this.gintIDFormatAccount;
            }
        });
    }

    FLoad():void{
        this.view.ddlCustomerID="";
        this.view.ddlBagID="";
        this.FGetCustomer('AllDataByGroup',0);
        this.FGetBag('AllDataCustomer',0,0);
    }

    FAccountRegister(_id:number,intCustomerBagID:number):void{
        const request:any={};
        request.FormatID = _id;
        request.CustomerID = this.view.ddlCustomerID;
        request.BagID = this.view.ddlBagID;
        request.CustomerBagID = intCustomerBagID;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatView',request)
        .subscribe(Response =>{
            this.glstAccount = Response.lstBECustomerBagAccount;
            this.glstAccountFormat = Response.lstBEFormatAccount;
            this.view.txtDescription = this.glstAccountFormat[0].Observation;
            this.glstTotalSol = Response.arrTotalSol;
            this.glstTotalDol = Response.arrTotalDol;
            console.log('Respuesta (Registro Formato)= cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();            
        })
    }

    FFilterCustomerBag(blnValidate:boolean):void{
        this.gblnValidate = true;
        if(blnValidate){
            this.blockUI.start('Cargando...');
            this.FGetCustomerBag();
            this.gblnValidate = false;
        }        
    }

    FSelect(intCustomerBagID:number):void{
        this.blockUI.start('Cargando...');
        this.FAccountRegister(this.gintIDFormatAccount,intCustomerBagID);
    }

    FExit():void{
        this._RouterExit.navigateByUrl("Collection/FormatAccount");
    }

    FColorCelda(_strColor:string){
        let strstyle;
        
        strstyle = {
            'background-color': _strColor,
            'color': 'Black'
        };

        return strstyle;
    }

    FGetCustomerBag():void{
        let request:any={};
        request.Option = 'AllGroup';
        request.CustomerID = this.view.ddlCustomerID;
        request.BagID = this.view.ddlBagID;

        this._CollectionService.getData('api/sgc/customerbag/GetCustomerBagAccountGroup',request)
            .subscribe(response =>{
                this.glstCustomerBag = response.lstCustomerBag;
                console.log("Respuesta= cod:" + response.strResponseCode + " msg:" + response.strResponseMsg);
                this.blockUI.stop();
        })
    }

    FFilterBagID(event:Event):void{
        let strCod:string="";
        this.gblnValidate = false;
        this.view.ddlBagID="";
        strCod = (event.target as HTMLSelectElement).value.toString();
        this.glstBagFilter = this.glstBag.filter(x => x.CustomerID.toString() == strCod);
    }

    FGetCustomer(_Option:string,_CustomerID:number):void{        
        let request: any= {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(result =>{
                this.glstCustomer = result.lstBECustomer;
        })
    }

    FGetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(result =>{
                this.glstBag = result.lstBEBag;
        })
    }
}