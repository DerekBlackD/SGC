import { Component, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';

@Component({
    selector: 'CustomerSearch-component',
    templateUrl: 'CustomerSearch.component.html',
    styleUrls: ['CustomerSearch.component.css'],
})

export class CustomerSearch{
    gSearch:any={};
    glstCustomer:any[]=[];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _CollectionService : CollectionService,
        private _Router : Router
    ){
        this.gSearch.TypeSeach=0;
        this.FSearch('0');
    }

    FSearch(strFact:string):void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        
        Request.CustomerID=0;

        this._CollectionService.getData('api/sgc/customer/getcustomerbyid/get',Request)
        .subscribe(Response =>{
            let lstCustomer:any[]=[];

            if(strFact=='0'){
                this.glstCustomer = Response.lstBECustomer;

            }else{
                if(this.gSearch.TypeSeach==0){
                    this.glstCustomer = Response.lstBECustomer;
    
                }else if (this.gSearch.TypeSeach==1){
                    lstCustomer=Response.lstBECustomer;
                    this.glstCustomer=lstCustomer.filter(x=>x.ID==strFact);
    
                }else if (this.gSearch.TypeSeach==2){
                    lstCustomer=Response.lstBECustomer;
                    this.glstCustomer=lstCustomer.filter(x=>x.CustomerName==strFact);

                }
            }
            
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();            
        },err=>{
            console.log('Error de aplicativo');
        });

        
    }

    FChangeTypeSearch():void{
        this.FSearch('0');
        this.gSearch.txtFact='';
    }

    FNew():void{
        this._Router.navigate(['/CustomerManagementComponent', 0]);
    }

    FEdit(intID:number):void{
        this._Router.navigate(['/CustomerManagementComponent', intID]);
    }

    FDelete(intID:number):void{
        this._Router.navigate(['/CustomerDeleteComponent', intID]);
    }
}