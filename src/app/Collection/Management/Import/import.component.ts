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
    
    constructor(private http: Http,
        private _CollectionService : CollectionService ) {  

        this.import.clienteid ="";
    }

    ngOnInit(){
        this.import.anio = (new Date().getFullYear());
        this.import.mes = (new Date().getMonth() + 1);
        this.GetCustomer("AllDataByGroup",0);
        this.GetBag("AllDataCustomer",0,0);
    }


    onChange(event) {
        this.blockUI.start("Cargando...");

        this._CollectionService.postFileUpload('api/Import/UploadJsonFile',event)
        .subscribe(res =>{
            this.filename = res.toString();
            console.log( this.filename);
            this.blockUI.stop();
        })
    }  


    SaveTemp():void{
        this.blockUI.start("Cargando...");
        console.log('Pedido solicitado');

        let data: any={};
        data.BusinessID = 1;
        data.Year = this.import.anio;
        data.Month = this.import.mes;
        data.CustomerID = this.import.clienteid;
        data.BagID = this.import.carteraid;        data.FileName = this.filename;
        data.State = this.import.state;
        data.User = "scuya";

        console.log(data);

        this._CollectionService.postProcess('api/Import/Temporal',data);
        this.blockUI.stop();

        console.log('Espere el correo'); 
    }

    GetCustomer(_Option:string,_CustomerID:number):void{

        let request: any= {};
        request.Option = _Option;
        request.BusinessID = 1;
        request.CustomerID = _CustomerID;


        this._CollectionService.getData('api/customer/GetCustomerByID',request)
            .subscribe(result =>{
                this.Customer = result.lstBECustomer;
                console.log(this.Customer);
        })
    }

    GetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        let request:any={};
        request.Option = _Option;
        request.BusinessID = 1;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;
        this._CollectionService.getData('api/Bag/GetBag',request)
            .subscribe(result =>{
                this.Bag1 = result.lstBEBag;
                console.log(this.Bag1);
        })
    }

    onBagID(event:Event):void{
        this.import.carteraid="";
        this.Cod = Number((event.target as HTMLSelectElement).value);

        this.Bag = this.Bag1.filter(x => x.CustomerID == this.Cod);
    }
    

   
   

   

    

    
}    

