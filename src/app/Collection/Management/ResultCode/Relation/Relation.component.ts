import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'Relation-component',
    templateUrl: 'Relation.component.html',
    styleUrls: ['../resultcode.component.css']
})

export class RelationComponent implements OnInit{
    @Input() register: any={};
    @Input() lstResultCodeRelation: any[]=[];

    DataUser: any={};
    glstCustomer: any[]=[];
    glstBag: any[]=[];
    glstBag1: any[]=[];
    Relation: any={};
    glstRelationType: any[]=[];

    blnFrmManagement: boolean=false;
    blnValidation: boolean=false;
    
    lblConsulta: string='';
    strResponse: string='';

    gintIDClass: number=0;
    gintIDResult: number=0;

    constructor(
        private _CollectionService : CollectionService
    ){}

    ngOnInit(){
        this.FLoad();
    }

    FLoad():void{
        this.DataUser = this._CollectionService.getUserData();
        this.FGetCustomer('AllDataByGroup',0);
        this.FGetBag('AllDataByGroup',0,0);
        this.glstRelationType = this._CollectionService.getGeneralCode(23);

        this.Relation.ddlIDType = '';
    }

    FNew():void{
        this.blnFrmManagement = true;
        this.blnValidation = false;
        this.Relation.ddlIDCustomer = '';
        this.Relation.ddlIDBag = '';
        this.strResponse = '';
        this.gintIDClass = this.register.ObjIDClass;
        this.gintIDResult = this.register.ResultID;
        this.Relation.ddlIDType = '';
    }

    FSave(isValid:boolean):void{
        this.blnValidation = true;
        this.strResponse = '';
        if(isValid){
            const data:any={};
            data.Option='I';
            data.intResultCodeRelID=0;
            data.ObjIDClass=this.gintIDClass;
            data.ResultID=this.gintIDResult;
            data.intResultCodeTypeID = this.Relation.ddlIDType;
            data.strResultCodeRelCode = this.Relation.txtCode;
            data.strResultCodeRelName = this.Relation.txtDescription;
            data.intCustomerID = this.Relation.ddlIDCustomer;
            data.intBagID = this.Relation.ddlIDBag;
            data.User = this.DataUser.UserName;
            data.State = 1;

            const request:any={};
            request.objBEResultCodeRelation = data;

            this._CollectionService.getData('api/Result/PostResultCodeRelation', request)
            .subscribe(response =>{
                this.strResponse = response.strResponseMsg;                
                this.blnValidation = false; 
                this.FClean();
            })
        }
    }

    FUndo():void{
        this.blnFrmManagement = false;
        this.FGetRelation();
    }

    FDelete(ID:number):void{
        this.gintIDClass = this.register.ObjIDClass;
        this.gintIDResult = this.register.ResultID;

        const data:any={};
        data.Option='E';
        data.intResultCodeRelID = ID;
        data.User = this.DataUser.UserName;
        data.State = 1;

        const request:any={};
        request.objBEResultCodeRelation = data;

        this._CollectionService.getData('api/Result/PostResultCodeRelation', request)
        .subscribe(response =>{          
            this.FGetRelation();
        })
    }

    FGetRelation():void{
        const data: any={};
        data.Option = 'AllData';
        data.intClassID = this.gintIDClass;
        data.intResultID = this.gintIDResult;

        this._CollectionService.getData('api/Result/GetResultCodeRelation',data).
        subscribe(response =>{
            this.lblConsulta = response.strResponseMsg;
            this.lstResultCodeRelation = response.lstBEResultCodeRelation;
        })
    }

    FGetCustomer(_Option:string,_CustomerID:number):void{
        
        const request: any= {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(response =>{
                this.glstCustomer = response.lstBECustomer;
        })
    }

    FChangeCustomerID(event:Event):void{
        const Cod:number =  Number((event.target as HTMLSelectElement).value);
        this.glstBag1 = this.glstBag.filter(x => x.CustomerID == Cod);
    }

    FGetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        const request:any={};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(response =>{
                this.glstBag = response.lstBEBag;
        })
    }

    FClean():void{
        this.Relation.txtCode = '';
        this.Relation.txtDescription = '';
        this.Relation.ddlIDCustomer = '';
        this.Relation.ddlIDBag = '';
    }
}