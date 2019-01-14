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

    gstrDescription:string;

    constructor(
        private _CollectionService: CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            this.gstrDescription = response['Description'];
            if(this.gintIDFormatAccount != 0){
                this.delete.txtID = this.gintIDFormatAccount;
                this.delete.txtDescription = this.gstrDescription;
            }else{
                alert('No se pudo eliminar registro.');
                this._RouterExit.navigateByUrl("Collection/FormatAccount");
            }
        });
        this.FLoad();
    }

    FLoad():void{
        this.gUser = this._CollectionService.getUserData();
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