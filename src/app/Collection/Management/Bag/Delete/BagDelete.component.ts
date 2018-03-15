import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'BagDelete-component',
    templateUrl: 'BagDelete.component.html',
    styleUrls: ['../BagSearch.component.css'],
})

export class BagDeleteComponent{
    gDelete:any={};
    oUser:any={};

    @Input() gintBagFather:number;
    @Input() gstrBagNameFather:string;
    @Input() gintCustomerFather:number;
    @BlockUI() blockUI: NgBlockUI;
    @Output() FSearchDelete=new EventEmitter();

    constructor(
        private _Conexion:CollectionService
    ){
        this.oUser=_Conexion.getUserData();
    }

    ngOnInit():void{
        this.gDelete.ID=this.gintBagFather;
        this.gDelete.Name=this.gstrBagNameFather;
    }

    FDelete():void{
        this.blockUI.start('Cargando...');
        const Request:any={};
        const oBag:any={};

        oBag.CustomerID=this.gintCustomerFather;
        oBag.BagID=this.gDelete.ID;
        oBag.User=this.oUser.UserName;

        Request.oBag=oBag;

        this._Conexion.getData('api/sgc/bag/postdeletebag/post',Request)
        .subscribe(Response =>{                
            console.log('Respuesta = cod: '+ Response.strResponseCode +' msg: '+Response.strResponseMsg);
            this.FSearchDelete.emit({blnVisible:true});
        },err=>{
            console.log('Error de aplicativo');
            this.blockUI.stop();
        });
    }

    FExit():void{
        this.FSearchDelete.emit({blnVisible:true});
    }
}