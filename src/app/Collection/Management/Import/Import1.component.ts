import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Component({
    selector: 'Import1-component',
    templateUrl: 'Import1.component.html',
})

export class Import1Component implements OnInit{
    @BlockUI() blockUI: NgBlockUI;

    Import:any={};
    goUser:any={};

    lstCustomer:any[]=[];
    lstBag:any[]=[];
    lstBagFilter:any[]=[];
    lstImportFormat:any[]=[];

    strFileName:string;

    constructor(
        private http: Http,
        private _CollectionService : CollectionService
    ){}

    ngOnInit(){
        this.Import.ipYear = (new Date().getFullYear());
        this.Import.cboMonth = (new Date().getMonth() + 1);
        this.Import.cboCustomer = "";
        this.Import.cboBag = "";
        this.GetCustomer("AllDataByGroup");
        this.GetBag("AllDataCustomer");
        this.goUser = this._CollectionService.getUserData();

        this.FN_AllImportFormat();
    }

    FN_ChangeStatus(event){
        this.blockUI.start("Cargando...");
        const oRequest:any={};
        const input=event.srcElement;
        const ipValue=input.value;
        const ipChecked=input.checked;
        const oEntity = this.lstImportFormat.filter(x=>x.IDHead==ipValue)[0];
        oEntity.blnStatus = ipChecked;
        oRequest.oEntity = oEntity;

        this._CollectionService.getData('api/ImportFormat/Update',oRequest)
        .subscribe(res =>{ 
            this.blockUI.stop();
        })
    }

    FN_AllImportFormat(){
        this.blockUI.start("Cargando...");
        const oEntity:any={};
        const oRequest:any={};

        oRequest.oEntity = oEntity;

        this._CollectionService.getData('api/ImportFormat/All', oRequest)
            .subscribe(response =>{
                if(response.strResponseCode=='0'){
                    this.lstImportFormat = response.lstEntity;
                }else{
                    alert(response.strResponseMsg);
                }
                this.blockUI.stop();
            })
    }

    FN_Clean(){
        this.Import.ipYear = (new Date().getFullYear());
        this.Import.cboMonth = (new Date().getMonth() + 1);
        this.Import.cboCustomer = "";
        this.Import.cboBag = "";
        this.Import.ipFile = "";
    }

    FN_ClickImport(){
        this.blockUI.start("Cargando...");

        let data: any={};
        let oRequest: any={};

        data.Year = this.Import.ipYear;
        data.Month = this.Import.cboMonth;
        data.CustomerID = this.Import.cboCustomer;
        data.BagID = this.Import.cboBag;        
        data.FileName = this.strFileName;
        data.ExchangeRate = 0;
        data.User = this.goUser.UserName;

        oRequest.objBEImport = data;

        this._CollectionService.postProcess('api/Import/Import/post',oRequest);
        this.FN_Clean();

        alert('Espero confirmación de correo');

        this.blockUI.stop();
    }

    FN_ChangeFile(event){
        this.blockUI.start("Cargando...");
        this._CollectionService.postFileUpload('api/Import/LoadFile',event)
        .subscribe(res =>{
            this.strFileName = res.toString();
            this.blockUI.stop();
        })
    }

    GetCustomer(_Option:string):void{
        let request: any= {};
        request.Option = _Option;
        request.CustomerID = 0;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(result =>{
                this.lstCustomer = result.lstBECustomer;
        })
    }

    GetBag(_Option:string):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = 0;
        request.BagID = 0;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(result =>{
                this.lstBag = result.lstBEBag;
        })
    }

    FN_ChangeCustomer(event:Event){
        this.Import.cboBag="";
        const IDCustomer = Number((event.target as HTMLSelectElement).value);
        this.lstBagFilter = this.lstBag.filter(x => x.CustomerID == IDCustomer);
    }
}