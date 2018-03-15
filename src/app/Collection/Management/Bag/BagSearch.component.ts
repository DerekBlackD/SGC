import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../Services/collection.service';
import { UtilitesService } from '../../../Services/utilities.service';

@Component({
    selector: 'BagSearch-component',
    templateUrl: 'BagSearch.component.html',
    styleUrls: ['BagSearch.component.css'],
})

export class BagSearchComponent{
    gSearch:any={};

    glstBag:any[]=[];

    @BlockUI() blockUI: NgBlockUI;
    @Input() gintCustomerFather:number;
    @Output() FManagement = new EventEmitter();
    @Output() FDeleteFather = new EventEmitter();

    constructor(
        private _Conexion:CollectionService,
        private _Router:Router
    ){
        this.gSearch.TypeSeach=0;

    }

    ngOnInit():void{
        console.log(this.gintCustomerFather);
        this.FSearch('');
    }

    FSearch(strFact:string):void{
        this.blockUI.start('Cargando...');

        const Request:any={};
        
        Request.CustomerID=this.gintCustomerFather;
        Request.BagID=0;

        this._Conexion.getData('api/sgc/bag/getbagbyid/get',Request)
        .subscribe(Response =>{
            let lstBag:any[]=[];

            if(strFact==''){
                this.glstBag = Response.lstBEBag;

            }else{
                if(this.gSearch.TypeSeach==0){
                    this.glstBag = Response.lstBEBag;
    
                }else if (this.gSearch.TypeSeach==1){
                    lstBag=Response.lstBEBag;
                    this.glstBag=lstBag.filter(x=>x.BagID==strFact);
    
                }else if (this.gSearch.TypeSeach==2){
                    lstBag=Response.lstBEBag;
                    this.glstBag=lstBag.filter(x=>x.BagName==strFact);

                }
            }
            
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.blockUI.stop();            
        },err=>{
            console.log('Error de aplicativo');
        });
    }

    FChangeTypeSearch():void{
        this.FSearch('');
        this.gSearch.txtFact='';
    }

    FNew():void{
        this.FManagement.emit({Option:'I',blnVisible:false,intBagID:0});
    }

    FEdit(intID:number):void{
        this.FManagement.emit({Option:'U',blnVisible:false,intBagID:intID});
    }

    FDelete(intID:number,strName:string):void{
        this.FDeleteFather.emit({blnVisible:false,intBagID:intID,strName:strName});
    }
}