import { Component, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-customerbag-account',
    templateUrl:'genaccount.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagAccount{
    @Input() lstAccountFormat: any[] = [];
    @Input() lstAccountHead: any[] = [];
    @Input() lstAccountBody: any[] = [];
    @Input() lstAccountFoot: any[] = [];

    @Input() customerData:any={};

    blnShowAccountAct=true;
    blnShowAccountNAct=false;

    lstAccountHeadInac:any[]=[];
    lstAccountBodyInac:any[]=[];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _Conex:CollectionService
    ) {  
    }

    FColorCelda(intRow:number){
        let strstyle;
        let _strColor:string='';

        _strColor = this.lstAccountFormat[intRow].ColumnColorName;
        
        strstyle = {
            'background-color': _strColor,
            'color': 'Black',
            'font-size': '12px'
        };

        return strstyle;
    }

    GetAccountActive():void{
        this.blnShowAccountAct=true;
        this.blnShowAccountNAct=false;
    }

    GetAccountNoActive():void{
        this.blockUI.start('Cargando...');
        this.blnShowAccountAct=false;
        this.blnShowAccountNAct=true;        

        const oRequest:any={};
        oRequest.CustomerBagID=this.customerData.CustomerBagID;
        oRequest.CustomerID=this.customerData.CustomerID;
        oRequest.BagID=this.customerData.BagID;
        oRequest.StatusID=2;

        this._Conex.getData('api/AccountFormat/GetAccountFormatView', oRequest).subscribe(oResponse=>{
            if(oResponse.strResponseCode=='0'){
                this.lstAccountHeadInac = oResponse.lstHead;
                this.lstAccountBodyInac = oResponse.lstBody;
            }
            this.blockUI.stop();
        });
    }
}
