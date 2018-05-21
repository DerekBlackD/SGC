import { Component, NgModule, Input, Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'FilterManagement-component',
    templateUrl: 'FilterManagement.component.html',
    styleUrls: ['../FilterSearch.component.css'],
})

export class FilterManagementComponent{
    gManagement:any={};
    glstType:any[]=[];
    glstCustomer:any[]=[];
    glstBag:any[]=[];
    glstBagFilter:any[]=[];
    glstSituation:any[]=[];
    gUser:any={};

    gintID:number=0;

    gstrOption:string='';
    gstrURLManagement:string='';
    gstrImport:string='';
    gstrCorrect:string='';
    gstrError:string='';

    gblnValidate:boolean=false;
    gblnVisibleImport:boolean=false;
    gblnVisibleAut:boolean=false;
    gblnCorrect:boolean=false;
    gblnError:boolean=false;
    gblnProgresive:boolean=false;
    gblnBlocking:boolean=false;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conexion:CollectionService,
        private _Router:ActivatedRoute,
        private _RouterExit:Router
    ){
        this.glstSituation=this._Conexion.getGeneralCode(15);
        this.glstType=this._Conexion.getGeneralCode(30);
        this.gUser=this._Conexion.getUserData();
    }

    ngOnInit():void{
        this.FGetCustomer('AllDataByGroup');
        this.FGetBag('AllDataCustomer');

        this._Router.params.subscribe(response=>{
            this.gintID = response['id'];
            if(this.gintID != 0){
                this.blockUI.start('Cargando...');

                this.gstrOption='U';
                this.gstrURLManagement='api/sgc/CustomerBagFilter/PostFilterManagementUpdate/post';
                this.FRegister(this.gintID);         

            }else{
                this.gstrOption='I';
                this.gstrURLManagement='api/sgc/CustomerBagFilter/PostFilterManagementGeneralInsert/post';
                this.FClean();
                
            }
        });
    }

    FClean():void{
        this.gManagement.ID='Autogenerado';
        this.gManagement.Description='';
        this.gManagement.Type='';
        this.gManagement.Customer='';
        this.gManagement.Bag='';
        this.gManagement.DtBegin='';
        this.gManagement.DtEnd='';
        this.gManagement.Situation='1';
        this.gblnBlocking=false;
    }

    FGetImport(event):void{
        this.gstrImport=event.strFile;
    }

    FSave(blnvalid:boolean):void{
        this.blockUI.start('Cargando...');
        this.gblnValidate=true;
        if(this.gblnVisibleImport==true){
            if(this.gstrImport==''){
                this.gblnValidate=true;
                blnvalid=false;
                console.log('no valida');
            }else{
                this.gblnValidate=false;
                blnvalid=true;
                console.log('valida');
            }
        }

        if(blnvalid){
            const Request:any={};
            const oCustomerBagFilter:any={};

            oCustomerBagFilter.FilterID=(this.gstrOption=='I')?0:this.gManagement.ID;
            oCustomerBagFilter.FilterDescription=this.gManagement.Description;
            oCustomerBagFilter.FilterProgressive=this.gManagement.Progresive;
            oCustomerBagFilter.FilterType=this.gManagement.Type;
            oCustomerBagFilter.CustomerID=this.gManagement.Customer;
            oCustomerBagFilter.BagID=this.gManagement.Bag;
            oCustomerBagFilter.FilterDateBegin=this.gManagement.DtBegin.toString('dd/MM/yyyy');
            oCustomerBagFilter.FilterDateEnd=this.gManagement.DtEnd.toString('dd/MM/yyyy');
            oCustomerBagFilter.FilterSituation=this.gManagement.Situation;
            oCustomerBagFilter.User=this.gUser.UserName;
            oCustomerBagFilter.FilterStatus=1;
            oCustomerBagFilter.strFileName=this.gstrImport;

            Request.oCustomerBagFilter=oCustomerBagFilter;

            this._Conexion.getData(this.gstrURLManagement,Request)
            .subscribe(Response =>{                
                console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
                
                if(Response.strResponseCode=='0'){
                    this.gstrCorrect=Response.strResponseMsg;
                    this.gblnCorrect=true;
                    this.gblnError=false;
                    this.FRegister(Response.intResponseID);

                }else if(Response.strResponseCode=='-1'){
                    this.gstrError=Response.strResponseMsg;
                    this.gblnError=true;
                    this.gblnCorrect=false;
                }
                this.gblnValidate=false;
                this.blockUI.stop();
            },err=>{
                console.log('Error de aplicativo');
                this.blockUI.stop();
            });

        }
    }

    FExit():void{
        this._RouterExit.navigate(['/FilterSearchComponent']);
    }

    FChangeType():void{
        if(this.gManagement.Type=='1'){
            this.gblnVisibleImport=true;
            this.gblnVisibleAut=false;
        }else if(this.gManagement.Type=='2'){
            this.gblnVisibleAut=true;
            this.gblnVisibleImport=false;
        }else{
            this.gblnVisibleImport=false;
            this.gblnVisibleAut=false;
        }
    }

    FGetCustomer(_Option:string):void{
        let request: any= {};
        request.Option = _Option;
        request.CustomerID=0;

        this._Conexion.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(result =>{
                this.glstCustomer = result.lstBECustomer;
        })
    }

    FGetBag(_Option:string):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID=0;
        request.BagID=0;
        this._Conexion.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(result =>{
                this.glstBag = result.lstBEBag;
        })
    }

    FChangeCustomer(event:Event):void{
        let strIDCustomer="";
        strIDCustomer = (event.target as HTMLSelectElement).value.toString();
        this.glstBagFilter = this.glstBag.filter(x => x.CustomerID == strIDCustomer);
    }

    FChangeProgresive():void{
        this.gblnProgresive = this.gManagement.Progresive;
        if(this.gManagement.Progresive==true){
            this.gManagement.Type = '1';
            this.gblnVisibleImport=true;
            this.gblnVisibleAut=false;
        }else{
            this.gManagement.Type = '';
            this.gblnVisibleImport=false;
            this.gblnVisibleAut=true;
        }
        
    }

    FRegister(_ID:number):void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        Request.ID=_ID;

        this._Conexion.getData('api/sgc/CustomerBagFilter/GetFilterRegisterQuery/get',Request)
        .subscribe(Response =>{
            this.gManagement.ID = Response.oCustomerBagFilter.FilterID;
            this.gManagement.Description = Response.oCustomerBagFilter.FilterDescription;
            this.gManagement.Progresive = Response.oCustomerBagFilter.FilterProgressive;
            this.gManagement.Type = Response.oCustomerBagFilter.FilterType;
            this.gManagement.Customer = Response.oCustomerBagFilter.CustomerID;

            this.glstBagFilter = this.glstBag.filter(x => x.CustomerID == Response.oCustomerBagFilter.CustomerID);

            this.gManagement.Bag = Response.oCustomerBagFilter.BagID;
            this.gManagement.DtBegin = Response.oCustomerBagFilter.FilterDateBegin;
            this.gManagement.DtEnd = Response.oCustomerBagFilter.FilterDateEnd;
            this.gManagement.Situation = Response.oCustomerBagFilter.FilterSituation;
            this.gblnBlocking=true;
            this.gblnProgresive=true;
            
            console.log('Respuesta -- cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }
}