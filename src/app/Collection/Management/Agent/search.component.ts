import { Component, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';

@Component({
    selector: 'Search-component',
    templateUrl: 'Search.component.html',
    styleUrls: ['search.component.css'],
})

export class SearchComponent {
    gSearch:any={};
    glstAgent:any[]=[];

    @BlockUI() blockUI: NgBlockUI;

    constructor (
        private _CollectionService : CollectionService,
        private _Router : Router
    ){
        this.FLoad();
    }

    FLoad():void{
        this.FSearch('');
    }

    FSearch(strFact:string):void{
        this.blockUI.start('Cargando...');

        const request:any={};
        request.Fact = strFact;

        this._CollectionService.getData('api/sgc/agent/getallagentsdata/get',request)
        .subscribe(Response =>{
            this.glstAgent = Response.ListAgents;
            console.log('Respuesta (Consulta Agente)= cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();            
        });
    }

    FNew():void{
        this._Router.navigate(['/AgentManagementComponent', 0]);
    }

    FEdit(ID:number):void{
        this._Router.navigate(['/AgentManagementComponent', ID]);
    }

    FDelete(ID:number):void{
        this._Router.navigate(['/AgentDeleteComponent', ID]);
    }
}