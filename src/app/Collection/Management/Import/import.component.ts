import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Http, RequestOptions, Headers, Response } from '@angular/http'; 

@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html',
})

export class ImportComponent implements OnInit{
    private isUploadBtn: boolean = true;
    import: any = {};
    @BlockUI() blockUI: NgBlockUI;
    filename :string;
    @Input() Customer: any[] = [];
    Bag: any[] = [];
    Bag1: any [] = [];
    Cod: number;

    gobjUser:any={};

    gstrMensaje:string="";
    
    constructor(private http: Http,
        private _CollectionService : CollectionService ) {  

        this.import.clienteid = "";
        this.import.TipCambio = 0;
    }

    ngOnInit(){
        this.import.anio = (new Date().getFullYear());
        this.import.mes = (new Date().getMonth() + 1);
        this.GetCustomer("AllDataByGroup",0);
        this.GetBag("AllDataCustomer",0,0);
        this.gobjUser = this._CollectionService.getUserData();
    }


    onChange(event) {
        this.blockUI.start("Cargando...");

        this._CollectionService.postFileUpload('api/Import/UploadJsonFile',event)
        .subscribe(res =>{
            this.filename = res.toString();
            console.log(this.filename);
            this.blockUI.stop();
        })
    }  


    SaveTemp():void{
        this.blockUI.start("Cargando...");
        console.log('Pedido solicitado');

        let data: any={};
        data.Year = this.import.anio;
        data.Month = this.import.mes;
        data.CustomerID = this.import.clienteid;
        data.BagID = this.import.carteraid;        
        data.FileName = this.filename;
        data.State = this.import.state;
        data.StatePay = this.import.statePagos;
        data.ExchangeRate = this.import.TipCambio;
        data.StateAssignment = this.import.stateAssignment;
        data.User = this.gobjUser.UserName;

        console.log(data);

        this._CollectionService.postProcess('api/Import/Temporal',data);
        this.blockUI.stop();

        this.gstrMensaje = "Espere Correo";
        this.FClean();
    }

    FClean():void{
        this.import.anio=(new Date().getFullYear());
        this.import.mes=(new Date().getMonth() + 1);
        this.import.clienteid="";
        this.import.carteraid="";
        this.import.TipCambio=0;
        this.import.fileimport="";
        this.import.state=false;
        this.import.statePagos=false;
        this.import.stateAssignment=false;
    }

    GetCustomer(_Option:string,_CustomerID:number):void{

        let request: any= {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;


        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(result =>{
                this.Customer = result.lstBECustomer;
                console.log(this.Customer);
        })
    }

    GetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;
        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(result =>{
                this.Bag1 = result.lstBEBag;
                console.log(this.Bag1);
        })
    }

    onBagID(event:Event):void{
        this.gstrMensaje="";
        this.import.carteraid="";
        this.Cod = Number((event.target as HTMLSelectElement).value);

        this.Bag = this.Bag1.filter(x => x.CustomerID == this.Cod);
    }
}

