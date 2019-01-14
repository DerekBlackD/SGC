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
    glstCustomerBag:any[]=[];
    glstHead:any[]=[];
    glstBody:any[]=[];
    glstFoot:any[]=[];

    gintIDFormatAccount: number;
    gintCustomerID:number;
    gintBagID:number;

    gblnValidate:boolean=false;

    gstrDescription:string='';

    @BlockUI() blockUI: NgBlockUI;

    constructor (
        private _CollectionService: CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            this.gstrDescription = response['Description'];
            this.gintCustomerID = response['CustomerID'];
            this.gintBagID = response['BagID'];

            if(this.gintIDFormatAccount != 0){
                this.view.txtID = this.gintIDFormatAccount;
                this.view.txtDescription = this.gstrDescription;
                this.FGetCustomerBag(this.gintCustomerID,this.gintBagID);
            }
        });
    }

    FAccountRegister(_id:number,intCustomerBagID:number):void{
        const request:any={};
        request.FormatID = _id;
        request.CustomerID = this.gintCustomerID;
        request.BagID = this.gintBagID;
        request.CustomerBagID = intCustomerBagID;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatView',request)
        .subscribe(Response =>{
            if(Response.strResponseCode=='0'){
                this.glstAccountFormat = Response.lstBEFormatAccount;
                this.glstHead = Response.lstHead;
                this.glstBody = Response.lstBody;
                this.glstFoot = Response.lstFoot;
            }else{
                alert(Response.strResponseMsg);
            }
            this.blockUI.stop();            
        })
    }

    FSelect(intCustomerBagID:number):void{
        this.blockUI.start('Cargando...');
        this.FAccountRegister(this.gintIDFormatAccount,intCustomerBagID);
    }

    FExit():void{
        this._RouterExit.navigateByUrl("Collection/FormatAccount");
    }

    FColorCelda(intRow:number){
        let strstyle;
        let _strColor:string='';

        _strColor = this.glstAccountFormat[intRow].ColumnColorName;
        
        strstyle = {
            'background-color': _strColor,
            'color': 'Black'
        };

        return strstyle;
    }

    FGetCustomerBag(intCustomerID:number,intBag:number):void{
        this.blockUI.start();
        let request:any={};
        request.Option = 'AllGroup';
        request.CustomerID = intCustomerID;
        request.BagID = intBag;

        this._CollectionService.getData('api/sgc/customerbag/GetCustomerBagAccountGroup',request)
            .subscribe(response =>{
                this.glstCustomerBag = response.lstCustomerBag;
                console.log("Respuesta= cod:" + response.strResponseCode + " msg:" + response.strResponseMsg);
                this.blockUI.stop();
        })
    }
}