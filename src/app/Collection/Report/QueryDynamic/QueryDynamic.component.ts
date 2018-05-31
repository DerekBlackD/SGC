import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';

@Component({
    selector: 'QueryDynamic-component',
    templateUrl: 'QueryDynamic.component.html',
})

export class QueryDynamicComponent{
    glstReportQueryDynamic:any[]=[];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _CollectionService : CollectionService,
        private _Router : Router
    ){
        this.FSearch();
    }

    FSearch():void{
        this.blockUI.start('Cargando...');

        const Request:any={};

        this._CollectionService.getData('api/sgc/ReportQuery/GetReportQueryAll/get',Request)
        .subscribe(Response =>{
            this.glstReportQueryDynamic = Response.lstBEReportQuery;
            
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();            
        },err=>{
            console.log('Error de aplicativo');
        });
    }

    FView(intID:number,strDescription:string):void{
        this._Router.navigate(['/ReportDynamicComponent', intID, strDescription]);
    }
}