import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../../Services/collection.service';

@Component({
    selector: 'AccountDelete-component',
    templateUrl: 'AccountDelete.component.html',
    styleUrls: ['../Account.component.css']
})

export class AccountDeleteComoponent{
    delete: any={};
    gUser: any={};
    
    gintIDFormatAccount: number;

    constructor(
        private _CollectionService: CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            if(this.gintIDFormatAccount != 0){
                this.delete.txtID = this.gintIDFormatAccount;
                this.FAccountRegister(this.gintIDFormatAccount);
            }
        });
        this.FLoad();
    }

    FLoad():void{
        this.gUser = this._CollectionService.getUserData();
    }

    FAccountRegister(_id:number):void{
        const request:any={};
        request.FormatID = _id;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormartRegister',request)
        .subscribe(Response =>{            
            this.delete.txtDescription = Response.lstBEFormatAccount[0].Observation;
            console.log('Respuesta (Registro): cod '+ Response.strResponseCode +' msg '+Response.strResponseMsg);
        })
    }

    FDelete():void{
        const request:any={};
        const data :any={};

        data.Option = 'E';
        data.ID = this.delete.txtID;
        data.User = this.gUser.UserName;

        request.objBEAccountFormat = data;
        
        this._CollectionService.getData('api/AccountFormat/PostAccountFormat', request)
        .subscribe(response =>{
            this._RouterExit.navigateByUrl("Collection/FormatAccount");
            console.log('code:' + response.strResponseCode + ' msg:' + response.strResponseMsg);
        }) 
    }

    FExit():void{
        this._RouterExit.navigateByUrl("Collection/FormatAccount");
    }
}