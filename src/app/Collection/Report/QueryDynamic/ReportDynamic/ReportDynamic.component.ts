import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'ReportDynamic-component',
    templateUrl: 'ReportDynamic.component.html',
})

export class ReportDynamicComponent{

    glstReportDetail:any[]=[];

    gEntidad:any={};
    oUser:any={};

    gintID:number=0;

    gstrTitulo:string='';
    gstrOption:string='';
    gstrDownload:string='';

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Router : Router,
        private _Route : ActivatedRoute
    ){
        this.oUser = _Conexion.getUserData();
    }

    ngOnInit():void{
        this.gstrOption = "strDirectoryCreateReportDynamic";
        this.gstrDownload = "strDirectoryDownloadDynamic";

        this._Route.params.subscribe(response=>{
            if(response['id']!=null||response['id']!=undefined){
                this.gintID=response['id'];
                this.gstrTitulo=response['des'];
                this.FDetail(this.gintID);
            }            
        });
    }

    FGenerate():void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        Request.ID=this.gintID;
        Request.lstBEReportQueryDetail=this.glstReportDetail;
        Request.User=this.oUser.UserName;     

        this._Conexion.getData('api/sgc/ReportQuery/GetGenerateReport/post',Request)
        .subscribe(Response =>{
            this.blockUI.stop();            
        },err=>{
            console.log('Error de aplicativo');
        });
    }

    FDetail(intID:number):void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        Request.ID=intID;

        this._Conexion.getData('api/sgc/ReportQuery/GetReportQueryDetail/get',Request)
        .subscribe(Response =>{
            this.glstReportDetail=Response.lstBEReportQueryDetail;
            this.blockUI.stop();            
        },err=>{
            console.log('Error de aplicativo');
        });
    }

    FField(intID:number,strField:string,intType:number):void{
        this.glstReportDetail.filter(x => x.Line == intID)[0].Value=strField;
    }

    FExit():void{
        this._Router.navigate(['/QueryDynamicComponent']);
    }
}