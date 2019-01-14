import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'Account-component',
    templateUrl: 'Account.component.html',
    styleUrls: ['Account.component.css'],
})

export class AccountComponent implements OnInit{
    gstrTitulo: string='Formato de Cuenta';

    gBusqueda: any={};
    glstAccountFormat: any[]=[];

    constructor(
        private _CollectionService : CollectionService,
        private _Router : Router
    ){
        
    }

    ngOnInit(){
        this.FLoad();
    }

    FLoad():void{
        this.gBusqueda.ddlTipo = '1';
        this.FGetAccountFormatListGeneral('');
    }

    FBusqueda():void{
        this.FGetAccountFormatListGeneral(this.gBusqueda.txtDato);
    }   
    
    FNew():void{
        this._Router.navigate(['/ManagementAccountFormat', 0, 0, 0]);
    }

    FGetAccountFormatListGeneral(strDato:string):void{
        const data:any={};
        data.Option = strDato;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatListGeneral',data)
        .subscribe(response=>{
            this.glstAccountFormat = response.lstBEFormatAccount;
        })
    }

    FEdit(intID:number,intCustomerID:number,intBagID:number):void{
        this._Router.navigate(['/ManagementAccountFormat', intID, intCustomerID, intBagID]);
    }

    FDelete(intID:number,strDescription:string):void{
        this._Router.navigate(['/AccountDelete', intID, strDescription]);
    }

    FView(intID:number,strDes:string,intCustomerID:number,intBagID:number):void{
        this._Router.navigate(['AccountView', intID, strDes, intCustomerID, intBagID]);
    }
}