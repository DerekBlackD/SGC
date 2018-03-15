import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'BagManagement-component',
    templateUrl: 'BagManagement.component.html',
    styleUrls: ['../BagSearch.component.css'],
})

export class BagManagementComponent{
    gBag:any={};
    glstType:any[]=[];
    glstSituation:any[]=[];
    oUser:any={};

    gstrURLManagement:string='';
    gstrID:string='';

    gblnValidate:boolean=false;

    @BlockUI() blockUI: NgBlockUI;
    @Input() gintCustomerFather:number;
    @Input() gintBagFather:number;
    @Input() gstrIndicaBag:string;
    @Output() FSearch=new EventEmitter();

    constructor(
        private _Conexion:CollectionService,
        private _Router:ActivatedRoute,
        private _RouterExit:Router
    ){
        this.glstType=_Conexion.getGeneralCode(25);
        this.glstSituation=_Conexion.getGeneralCode(15);
        this.oUser=_Conexion.getUserData();
    }

    ngOnInit():void{
        if(this.gstrIndicaBag=='I'){
            this.gstrURLManagement='api/sgc/bag/postinsertbag/post';
            this.FClean();
        }else{
            this.blockUI.start('Cargando...');
            this.gstrURLManagement='api/sgc/bag/postupdatebag/post';
            this.FRegister(this.gintCustomerFather,this.gintBagFather);
        }
    }

    FClean():void{
        this.gBag.IDBag='Autogenerado';
        this.gBag.Name='';
        this.gBag.Type='';
        this.gBag.Situation='1';
    }

    FRegister(intCustomerID:number,intBag:number):void{
        const Request:any={};
        
        Request.CustomerID=intCustomerID;
        Request.BagID=intBag;

        this._Conexion.getData('api/sgc/bag/getbagbyid/get',Request)
        .subscribe(Response =>{
            let oBag:any={};
            oBag=Response.lstBEBag[0];

            this.gBag.IDBag=oBag.BagID;
            this.gBag.Name=oBag.BagName;
            this.gBag.Type=oBag.BagType;
            this.gBag.Situation=oBag.BagSituation;
            
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }

    FSave(blnValid:boolean):void{
        this.blockUI.start('Cargando...');
        this.gblnValidate=true;
        if(blnValid){
            const Request:any={};
            const oBag:any={};

            oBag.CustomerID=this.gintCustomerFather;
            oBag.BagID=(this.gstrIndicaBag=='I')?0:this.gBag.IDBag;
            oBag.BagName=this.gBag.Name;
            oBag.BagType=this.gBag.Type;
            oBag.BagSituation=this.gBag.Situation;
            oBag.User=this.oUser.UserName;

            Request.oBag=oBag;

            this._Conexion.getData(this.gstrURLManagement,Request)
            .subscribe(Response =>{                
                console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
                this.FSearch.emit({blnVisible:true});
                this.gblnValidate=false;
            },err=>{
                console.log('Error de aplicativo');
                this.blockUI.stop();
            });
        }
    }

    FExit():void{
        this.FSearch.emit({blnVisible:true});
    }
}