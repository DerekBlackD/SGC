import { Component, NgModule, Input, Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'FilterDelete-component',
    templateUrl: 'FilterDelete.component.html',
    styleUrls: ['../FilterSearch.component.css'],
})

export class FilterDeleteComponent{
    gManagement:any={};

    gintID:number=0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Router:ActivatedRoute,
        private _RouterExit:Router
    ){

    }

    ngOnInit():void{
        this._Router.params.subscribe(response=>{
            this.gintID = response['id'];
            if(this.gintID != 0){
                this.blockUI.start('Cargando...');      
                this.FRegister(this.gintID);

            }else{
                this._RouterExit.navigate(['/FilterSearchComponent']);        
            }
        });
    }

    FRegister(_ID:number):void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        Request.ID=_ID;

        this._Conexion.getData('api/sgc/CustomerBagFilter/GetFilterRegisterQuery/get',Request)
        .subscribe(Response =>{
            this.gManagement.ID = Response.oCustomerBagFilter.FilterID;
            this.gManagement.Description = Response.oCustomerBagFilter.FilterDescription;
            
            console.log('Respuesta -- cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }

    FDelete():void{
        this.blockUI.start('Cargando...');
        const Request:any={};
        const oCustomerBagFilter:any={};

        oCustomerBagFilter.FilterID=this.gManagement.ID;

        Request.oCustomerBagFilter=oCustomerBagFilter;

        this._Conexion.getData('api/sgc/CustomerBagFilter/PostFilterManagementDelete/post',Request)
            .subscribe(Response =>{                
                console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
                this.blockUI.stop();
                this._RouterExit.navigate(['/FilterSearchComponent']);

            },err=>{
                console.log('Error de aplicativo');
                this.blockUI.stop();
            });
    }

    FExit():void{
        this._RouterExit.navigate(['/FilterSearchComponent']);
    }

}