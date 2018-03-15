import { Component, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'Management-component',
    templateUrl: 'Management.component.html',
    styleUrls: ['../search.component.css'],
})

export class AgentManagementComponent{
    gManagement:any={};
    gUser:any={};
    glstTypeAgent:any[]=[];

    gintID:number=0;
    gintIDUser:number=0;
    gintUserID:number=0;

    gstrOption:string='';
    gstrURLManagement:string='';
    gstrUserName:string='';

    gblnValidate=false;
    gblnVisible=false;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _CollectionService : CollectionService,
        private _Route: ActivatedRoute,
        private _RouterExit : Router
    ){
        this.gUser=_CollectionService.getUserData();
        this.glstTypeAgent=_CollectionService.getGeneralCode(14);
        this.gblnValidate=false;

        this._Route.params.subscribe(response=>{
            this.gintID = response['id'];
            if(this.gintID != 0){
                this.blockUI.start('Cargando...');

                this.gstrOption = 'U';
                this.gstrURLManagement='api/sgc/agent/PostManagementAgentUpdate/post';
                this.FRegister(this.gintID);

            }else{
                this.gstrOption = 'I';
                this.gstrURLManagement='api/sgc/agent/PostManagementAgentInsert/post';
                this.FClean();
                
            }
        });
    }

    FClean():void{
        this.gManagement.ID='Autogenerado';
        this.gManagement.Type='';
        this.gManagement.DocNumber='';
        this.gManagement.Name='';
        this.gManagement.ShortName='';
        this.gManagement.Adress='';
        this.gManagement.Phone='';
    }

    FSave(blnValidate:boolean):void{
        this.gblnValidate=true;
        if(blnValidate){
            let request:any={};
            const oAgent:any={};

            oAgent.Option=this.gstrOption;
            oAgent.AgentID=(this.gstrOption=='I')?0:this.gManagement.ID;
            oAgent.FullName=this.gManagement.Name;
            oAgent.ShortName=this.gManagement.ShortName;
            oAgent.Document=this.gManagement.DocNumber;
            oAgent.Address=this.gManagement.Adress;
            oAgent.Phone=this.gManagement.Phone;
            oAgent.Type=this.gManagement.Type;
            oAgent.AssignUserID=this.gManagement.User;
            oAgent.User=this.gUser.UserName;

            request.oAgent = oAgent;

            this._CollectionService.getData(this.gstrURLManagement, request)
            .subscribe(response =>{    
                this.gblnValidate = false;
                console.log('code:' + response.strResponseCode + ' msg:' + response.strResponseMsg);
                this._RouterExit.navigateByUrl("AgentSearch");
            });
        }
    }

    FRegister(intID:number):void{
        let request:any={};
        request.AgentID = intID;

        this._CollectionService.getData('api/sgc/agent/getagentdata/get',request)
        .subscribe(Response =>{
            var oAgent = Response.ListAgents[0];
            this.gManagement.ID=oAgent.AgentID;
            this.gManagement.Name=oAgent.FullName;
            this.gManagement.ShortName=oAgent.ShortName;
            this.gManagement.DocNumber=oAgent.Document;
            this.gManagement.Adress=oAgent.Address;
            this.gManagement.Phone=oAgent.Phone;
            this.gManagement.Type=oAgent.Type;
            this.gintUserID=oAgent.AssignUserID;
            this.gstrUserName=oAgent.UserName;

            this.gManagement.User=this.gintUserID;
            
            console.log('Respuesta (Consulta Agente)= cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();

        },error=>{
            console.log('Error del aplicativo');
            this.blockUI.stop();

        });
    }

    FExit():void{
        this._RouterExit.navigate(['/AgentSearch']);
    }

    FSearchUser():void{
        this.gblnVisible=true;
        this.gintIDUser=this.gManagement.User;
    }

    FHide(event):void{
        this.gblnVisible=event.state;
    }

    FSelectUser(event):void{
        this.gintUserID=event.ID;
        this.gstrUserName=event.Name;
        this.gblnVisible=event.Visible;

        this.gManagement.User=this.gintUserID;
    }
}