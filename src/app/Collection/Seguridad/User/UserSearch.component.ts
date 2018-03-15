import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';
import { SecurityService } from '../../../Services/security.service';

@Component({
    selector: 'UserSearch-component',
    templateUrl: 'UserSearch.component.html',
    styleUrls: ['UserSearch.component.css'],
})

export class UserSearchComponent{

    glstUser:any[]=[];
    gSearchUser:any={};
    glstUserFilter:any[]=[];

    @BlockUI() blockUI: NgBlockUI;
    
    @Input() gintIDUser:number;
    @Output() fOcultaBusqueda = new EventEmitter();
    @Output() FSelectUser = new EventEmitter();

    constructor(
        private _CollectionService : CollectionService,
        private _Service : SecurityService
    ){
        this.gSearchUser.Type=0;
    }

    ngOnInit(){
        console.log(this.gintIDUser);
        this.FViewUser(this.gintIDUser);
        this.blockUI.start('Cargando...');
    }

    FViewUser(intID:number):void{
        let request:any={};

        this._CollectionService.getData('api/sgc/user/GetQueryUser/get', request)
            .subscribe(Response =>{    
                console.log('code:' + Response.strResponseCode + ' msg:' + Response.strResponseMsg);
                let lstUser:any[]=[];
                lstUser=Response.lstUser;

                for(var row=0;row<lstUser.length;row++){
                    if(lstUser[row].ID!=intID){
                        let oUser:any={};
                        oUser.ID=lstUser[row].ID;
                        oUser.UserName=lstUser[row].UserName;
                        this.glstUser.push(oUser);
                        this.glstUserFilter.push(oUser);
                    }
                }
                this.blockUI.stop(); 
            },err=> {
                this.blockUI.stop();
                console.log('Error de aplicativo');
            });
    }

    FSearch(strFact:string):void{
        let lstUser:any[]=[];
        if(strFact!=''){
            if(this.gSearchUser.Type==1){
                lstUser = this.glstUserFilter;
                lstUser = lstUser.filter(x => x.ID == strFact);
                this.glstUser = lstUser;
    
            }else if(this.gSearchUser.Type==2){
                lstUser = this.glstUserFilter;
                lstUser = lstUser.filter(x => x.UserName == strFact);
                this.glstUser = lstUser;
    
            }else{
                this.glstUser = this.glstUserFilter;
                this.gSearchUser.Fact='';    
            }
        }else{
            this.glstUser = this.glstUserFilter;
        }
    }

    FClenSearch(){
        this.glstUser = this.glstUserFilter;
        this.gSearchUser.Fact='';
    }

    FSelect(intID:number,strName:string):void{
        this.FSelectUser.emit({
            ID:intID,
            Name:strName,
            Visible:false
        });
   }

    FCancel():void{
        this.fOcultaBusqueda.emit({state:false});
    }
}