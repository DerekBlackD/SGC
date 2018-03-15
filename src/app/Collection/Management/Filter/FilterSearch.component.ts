import { Component, NgModule, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';

@Component({
    selector: 'FilterSearch-component',
    templateUrl: 'FilterSearch.component.html',
    styleUrls: ['FilterSearch.component.css'],
})

export class FilterSearchComponent{
    glstFilter:any[]=[];
    gSearch:any={};

    gstrMsg:string='';

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Router:Router
    ){
        this.FSearch('');
    }

    FSearch(strFact:string):void{
        this.blockUI.start('Cargando...');
        this.gstrMsg='';

        const Request:any={};
        
        Request.Row=0;
        Request.Fact=strFact;

        this._Conexion.getData('api/sgc/CustomerBagFilter/GetFilterQuery/get',Request)
        .subscribe(Response =>{
            let lst:any[]=Response.lstCustomerBagFilter;

            if(lst.length>0){
                this.glstFilter=lst;
                this.gstrMsg='';
            }else{
                this.gstrMsg='No existen registros';
            }            
            
            console.log('Respuesta -- cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }

    FNew():void{
        this._Router.navigate(['/FilterManagementComponent', 0]);
    }

    FEdit(intID:number):void{
        this._Router.navigate(['/FilterManagementComponent', intID]);
    }

    FDelete(intID:number):void{
        this._Router.navigate(['/FilterManagementComponent', intID]);
    }
}