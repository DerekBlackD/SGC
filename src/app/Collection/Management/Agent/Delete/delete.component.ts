import { Component, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'AgentDelete-component',
    templateUrl: 'delete.component.html',
    styleUrls: ['../search.component.css'],
})

export class AgentDeleteComponent{
    gDelete:any={};
    gUser:any={};

    gintID:number=0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _CollectionService : CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this.gUser=_CollectionService.getUserData();

        this._Route.params.subscribe(response=>{
            this.gintID = response['id'];
            this.gDelete.AgentName = response['des'];
            
            if(this.gintID != 0){
                this.gDelete.AgentID=this.gintID;

            }else{
                console.log('Error de consulta');
            }
        });

    }

    FDelete():void{
        this.blockUI.start('Cargando...');
        const request:any={};
        const oAgent:any={};

        oAgent.AgentID=this.gDelete.AgentID;
        oAgent.User=this.gUser.UserName;

        request.oAgent = oAgent;

        this._CollectionService.getData('api/sgc/agent/PostManagementAgentDelete/post', request).subscribe(response =>{
            if (response.strResponseCode == '0'){
                this._RouterExit.navigateByUrl("AgentSearch");
            }else{
                alert(response.strResponseMsg);
            }
            this.blockUI.stop();
        });
    }

    FExit():void{
        this._RouterExit.navigate(['/AgentSearch']);
    }
}