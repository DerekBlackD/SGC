import { Component, NgModule, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'CustomerManagement-component',
    templateUrl: 'CustomerManagement.component.html',
    styleUrls: ['../CustomerSearch.component.css'],
})

export class CustomerManagementComponent{
    gManagement:any={};
    glstType:any[]=[];
    glstTypeDoc:any[]=[];
    glstSituation:any[]=[];
    oUser:any={};

    gintID:number=0;
    gintCustomerFather:number=0;
    gintBagFather:number=0;

    gstrOption:string='';
    gstrURLManagement:string='';
    gstrIndicaBag:string='';
    gstrBagNameFather:string='';

    gblnValidate:boolean=false;
    gblnVisible:boolean=false;
    gblnVisibleManagement:boolean=false;
    gblnVisibleDelete:boolean=false;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Route:ActivatedRoute,
        private _RouteExit:Router
    ){
        this.glstType=_Conexion.getGeneralCode(9);
        this.glstTypeDoc=_Conexion.getGeneralCode(8);
        this.glstSituation=_Conexion.getGeneralCode(15);
        this.oUser=_Conexion.getUserData();
    }

    ngOnInit():void{
        this._Route.params.subscribe(response=>{
            this.gintID = response['id'];
            if(this.gintID != 0){
                this.blockUI.start('Cargando...');

                this.gstrOption='U';
                this.gstrURLManagement='api/sgc/Customer/postupdateCustomer/post';
                this.gintCustomerFather=this.gintID;
                this.FRegister(this.gintID);
                this.gblnVisible=true;               

            }else{
                this.gstrOption='I';
                this.gstrURLManagement='api/sgc/customer/postinsertcustomer/post';
                this.FClean();
                this.gblnVisible=false;
                
            }
        });
    }

    FClean():void{
        this.gManagement.ID='Autogenerado';
        this.gManagement.Name='';
        this.gManagement.Type='';
        this.gManagement.TypeDoc='';
        this.gManagement.DocNumber='';
        this.gManagement.Mail='';
        this.gManagement.Situation='1';
    }

    FRegister(intID:number):void{
        const Request:any={};
        
        Request.CustomerID=intID;

        this._Conexion.getData('api/sgc/customer/getcustomerbyid/get',Request)
        .subscribe(Response =>{
            const oConsumer=Response.lstBECustomer[0];

            this.gManagement.ID=oConsumer.ID;
            this.gManagement.Name=oConsumer.CustomerName;
            this.gManagement.Type=(oConsumer.CustTypePerson==0)?'':oConsumer.CustTypePerson;
            this.gManagement.TypeDoc=(oConsumer.CustTypeDoc==0)?'':oConsumer.CustTypeDoc;
            this.gManagement.DocNumber=oConsumer.CustDocNumber;
            this.gManagement.Mail=oConsumer.CustMail;
            this.gManagement.Situation=(oConsumer.CustSituation==0)?'':oConsumer.CustSituation;
            
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }

    FSave(blnValidate:boolean):void{
        this.blockUI.start('Cargando...');
        this.gblnValidate=true;
        if(blnValidate){
            const Request:any={};
            const oCustomer:any={};

            oCustomer.ID=(this.gstrOption=='I')?0:this.gManagement.ID;
            oCustomer.CustomerName=this.gManagement.Name;
            oCustomer.CustTypePerson=this.gManagement.Type;
            oCustomer.CustTypeDoc=this.gManagement.TypeDoc;
            oCustomer.CustDocNumber=this.gManagement.DocNumber;
            oCustomer.CustMail=this.gManagement.Mail;
            oCustomer.CustSituation=this.gManagement.Situation;
            oCustomer.User=this.oUser.UserName;
            oCustomer.StatusReg=1;

            Request.oCustomer=oCustomer;

            this._Conexion.getData(this.gstrURLManagement,Request)
            .subscribe(Response =>{                
                console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
                this.FRegister(Response.intResponseID);
                this.gblnValidate=false;
            },err=>{
                console.log('Error de aplicativo');
                this.blockUI.stop();
            });
        }
    }

    FExit():void{
        this._RouteExit.navigate(['/CustomerSearch']);
    }

    FHideSearch(event):void{
        this.gblnVisible=event.blnVisible;
        this.gblnVisibleManagement=!event.blnVisible;
        this.gstrIndicaBag=event.Option;
        this.gintBagFather=event.intBagID;
    }

    FHideManagement(event):void{
        this.gblnVisible=event.blnVisible;
        this.gblnVisibleManagement=!event.blnVisible;
        this.blockUI.stop();
    }

    FHideSearchDelete(event):void{
        this.gblnVisible=event.blnVisible;
        this.gblnVisibleManagement=event.blnVisible;
        this.gblnVisibleDelete=!event.blnVisible;
        this.gintBagFather=event.intBagID;
        this.gstrBagNameFather=event.strName;
    }

    FHideDeleteSearch(event):void{
        this.gblnVisible=event.blnVisible;
        this.gblnVisibleManagement=!event.blnVisible;
        this.gblnVisibleDelete=!event.blnVisible;
    }
}