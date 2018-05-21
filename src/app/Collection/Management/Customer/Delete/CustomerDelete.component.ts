import { Component, NgModule, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'CustomerDelete-component',
    templateUrl: 'CustomerDelete.component.html',
    styleUrls: ['../CustomerSearch.component.css'],
})

export class CustomerDeleteComponent{
    gDelete:any={};

    gintID:number=0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Route:ActivatedRoute,
        private _RouteExit:Router
    ){
        this._Route.params.subscribe(Response=>{
            this.gintID=Response["id"];
            if(this.gintID!=0){
                this.gDelete.ID=this.gintID;
            }
        });
    }

    FDelete():void{
        this.blockUI.start('Cargando...');
        const oRequest:any={};
        const oCustomer:any={};

        oCustomer.ID=this.gDelete.ID;

        oRequest.oCustomer=oCustomer;

        this._Conexion.getData('api/sgc/Customer/postdeleteCustomer/post',oRequest).subscribe(Response=>{
            this._RouteExit.navigate(['/CustomerSearch']);
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();   
        },err=>{
            console.log('Error del sistema');
        });
    }

    FSalir():void{
        this._RouteExit.navigate(['/CustomerSearch']);
    }
}