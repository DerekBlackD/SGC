import { Component, OnInit, NgModule } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Http, RequestOptions, Headers, Response } from '@angular/http'; 

@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html',
})

export class ImportComponent implements OnInit{
    private isUploadBtn: boolean = true;  
    
    constructor(private http: Http,
        private _CollectionService : CollectionService ) {  
    }  


    onChange(event) {
        console.log(this._CollectionService.postFileUpload('api/Import/UploadJsonFile',event));
    }  


    SaveTemp():void{
        console.log('Pedido solicitado');

        this._CollectionService.postProcess('api/Import/Temporal');

        console.log('Espere el correo'); 
    }
    

   
   

    ngOnInit(){

    }

    

    
}    

