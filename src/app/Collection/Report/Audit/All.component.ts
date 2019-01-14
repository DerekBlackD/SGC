import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'AuditAll-component',
    templateUrl: 'All.component.html',
    styleUrls: ['All.component.css'],
})

export class AuditComponent{
    oAll:any={};
    lstAudit:any[]=[];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conex:CollectionService
    ){

    }

    FN_QueryAll(){
        this.blockUI.start("Cargando...");

        let oRequest:any={};
        oRequest.Date = this.oAll.dtDate;

        this._Conex.getData('api/sgc/Audit/All/get',oRequest)
            .subscribe(Response =>{
                this.blockUI.stop();
                if(Response.ResponseCode !='0'){
                    alert(Response.ResponseMsg);
                }else{
                    this.lstAudit = Response.lstAudit;
                    this.oAll.dtDate = '';
                }
        })
    }
}