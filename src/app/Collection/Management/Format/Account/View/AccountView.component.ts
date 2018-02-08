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

    gintIDFormatAccount: number;


    constructor (
        private _CollectionService: CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            if(this.gintIDFormatAccount != 0){
                this.view.txtID = this.gintIDFormatAccount;
                this.FAccountRegister(this.gintIDFormatAccount);

            }
        });
    }

    FLoad():void{

    }

    FAccountRegister(_id:number):void{
        const request:any={};
        request.FormatID = _id;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatView',request)
        .subscribe(Response =>{
            this.glstAccount = Response.lstBECustomerBagAccount;
            this.glstAccountFormat = Response.lstBEFormatAccount;
            this.view.txtDescription = this.glstAccountFormat[0].Observation;
            this.glstTotalSol = Response.arrTotalSol;
            this.glstTotalDol = Response.arrTotalDol;
            console.log(Response);
            console.log('Respuesta (Registro Formato)= cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            
        })
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
}