import { Component, OnInit, NgModule } from '@angular/core';
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
    
    constructor(private http: Http,
        private _CollectionService : CollectionService ) {  

        
    }

    ngOnInit(){
        this.import.anio = (new Date().getFullYear());
        this.import.mes = (new Date().getMonth() + 1);
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
        data.FileName = this.filename;
        data.State = this.import.state;
        data.User = "scuya";

        console.log(data);

        this._CollectionService.postProcess('api/Import/Temporal',data);
        this.blockUI.stop();

        console.log('Espere el correo'); 
    }
    

   
   

   

    

    
}    

