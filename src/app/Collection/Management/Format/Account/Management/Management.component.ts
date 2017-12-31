import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../../Services/collection.service';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
    selector: 'Management-component',
    templateUrl: 'Management.component.html',
    styleUrls: ['../Account.component.css']
})

export class ManagementComoponent implements OnInit{
    Account: any={};
    AccountDet: any={};
    Customer: any[] = [];
    Bag: any [] = [];
    Bag1: any [] = [];
    lstAccount: any[]=[];
    lstAccountSelect: any[]=[];
    gDataUser: any={};

    intCod: number;
    gintPosition: number;
    gintIDFormatAccount: number;

    gstrIndica: string = '';
    gstrIndicaGen: string = '';

    gblnColumnSum: boolean = false;
    gblnValidate: boolean = false;

    constructor (private _CollectionService: CollectionService
               // private _Route: ActivatedRoute
            ) {}

    ngOnInit(){
        this.FLoad();

        // this._Route.params.subscribe(response => {
        //     this.gintIDFormatAccount = response['id'];
        //     if (this.gintIDFormatAccount != 0) {
        //         this.gstrIndicaGen = 'M';
        //     } else {
        //         this.gstrIndicaGen = 'I';
        //     }
        // });
    }

    FLoad():void{
        this.Account.clienteid="0";
        this.Account.carteraid="0";

        this.FGetCustomer("AllDataByGroup",0);
        this.FGetBag("AllDataCustomer",0,0);
        this.FAccount('AllDataAccount',0);
        this.gDataUser = this._CollectionService.getUserData();
    }

    FSelectField(_description:string,_type:string,_length:string):void{
        this.AccountDet.txtColumnName = _description;
        this.AccountDet.txtColumnType = _type;
        this.AccountDet.txtColumnLenght = _length;
        if(_type == 'decimal' || _type == 'int'){
            this.gblnColumnSum = false;
        }else{
            this.gblnColumnSum = true;
        }
        this.gstrIndica = 'I';
    }

    FAdd():void{
        if(this.gstrIndica == 'I'){
            let blnValidar: boolean=true;
            if (this.AccountDet.txtColumnDescription == "" || this.AccountDet.txtColumnDescription == undefined) {
                alert('Ingrese descripción');
                
            }else{
                for(let row=0;row<this.lstAccountSelect.length;row++){
                    if(this.lstAccountSelect[row].ColumnName == this.AccountDet.txtColumnName){
                        blnValidar = false;
                        break;
                    }
                }

                if(blnValidar==true){
                    const data: any={};
                    data.ColumnName = this.AccountDet.txtColumnName;
                    data.ColumnDescription = this.AccountDet.txtColumnDescription;
                    data.ColumnType = this.AccountDet.txtColumnType;
                    data.ColumnLength = this.AccountDet.txtColumnLenght;
                    data.ColumnPosition = this.lstAccountSelect.length;
                    data.ColumnSum = this.AccountDet.chkColumnSum;
                    data.User = this.gDataUser.UserName;
                    data.State = 1;
                    this.lstAccountSelect.push(data);
                } else {
                    alert('Detalle ya agregado');
                }         
            }   
        }else{
            let AccountAux: any={};
            AccountAux.ColumnName = this.AccountDet.txtColumnName;
            AccountAux.ColumnType = this.AccountDet.txtColumnType;
            AccountAux.ColumnLength = this.AccountDet.txtColumnLenght;
            AccountAux.ColumnDescription = this.AccountDet.txtColumnDescription;
            AccountAux.ColumnPosition = this.gintPosition;
            AccountAux.ColumnSum = this.AccountDet.chkColumnSum;
            this.lstAccountSelect[this.gintPosition] = AccountAux;
        }

        this.AccountDet.txtColumnName = '';
        this.AccountDet.txtColumnType = '';
        this.AccountDet.txtColumnLenght = '';
        this.AccountDet.txtColumnDescription = '';
        this.AccountDet.chkColumnSum = false;
        this.gblnColumnSum = false;
    }

    FUp(_intPosition:number):void{
        let AccountAux: any={};

        if (_intPosition > 0){
            AccountAux = this.lstAccountSelect[_intPosition - 1];
            AccountAux.ColumnPosition = _intPosition;
            this.lstAccountSelect[_intPosition - 1] = this.lstAccountSelect[_intPosition];
            this.lstAccountSelect[_intPosition - 1].ColumnPosition = (_intPosition - 1);
            this.lstAccountSelect[_intPosition] = AccountAux;
        }
    }

    FDown(_intPosition:number):void{
        let AccountAux: any={};

        if (_intPosition <= (this.lstAccountSelect.length - 2)){
            AccountAux = this.lstAccountSelect[_intPosition + 1];
            AccountAux.ColumnPosition = _intPosition;
            this.lstAccountSelect[_intPosition + 1] = this.lstAccountSelect[_intPosition];
            this.lstAccountSelect[_intPosition + 1].ColumnPosition = (_intPosition + 1);
            this.lstAccountSelect[_intPosition] = AccountAux;
        }
    }

    FEdit(_intPosition:number):void{
        this.gstrIndica = 'M';
        this.gintPosition = _intPosition;

        let AccountAux = this.lstAccountSelect[this.gintPosition];
        this.AccountDet.txtColumnName = AccountAux.ColumnName;
        this.AccountDet.txtColumnType = AccountAux.ColumnType;
        this.AccountDet.txtColumnLenght = AccountAux.ColumnLength;
        this.AccountDet.txtColumnDescription = AccountAux.ColumnDescription;
        this.AccountDet.chkColumnSum = AccountAux.ColumnSum;
        if(AccountAux.ColumnType == 'decimal' || AccountAux.ColumnType == 'int'){
            this.gblnColumnSum = false;
        }else{
            this.gblnColumnSum = true;
        }
    }

    FDelete(_intPosition:number):void{
        this.lstAccountSelect.splice(_intPosition,1);
        for(let row = 0; row<this.lstAccountSelect.length;row++){
            this.lstAccountSelect[row].ColumnPosition = row;
        }
        console.log(this.lstAccountSelect);
    }

    FSave(blnValidate:boolean):void{
        this.gblnValidate = true;
        if(blnValidate){
            const data: any = {};
            data.CustomerID = this.Account.clienteid;
            data.BagID = this.Account.carteraid;
            data.Observation = this.Account.txtObservation;

            const request: any={};
            request.objBEAccountFormat = data;
            request.lstBEAccountFormat = this.lstAccountSelect;

            if(this.lstAccountSelect.length < 1){
                alert('Ingrese campos al formato');
            }else{               
                console.log(request);
    
                this._CollectionService.getData('api/AccountFormat/PostAccountFormatGeneral', request)
                .subscribe(response =>{    
                    this.gblnValidate = false;
                    console.log('code:' + response.strResponseCode + ' msg:' + response.strResponseMsg);
                })                
            }            
        }
    }

    FAccount(_Option:string,_FormatID:number):void{
        let request:any={};

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatListBD',request)
        .subscribe(Response=>{
            this.lstAccount = Response.lstBEFormatAccount;
            console.log('Respuesta del sistema: cod '+ Response.strResponseCode +' msg '+Response.strResponseMsg);
        })

    }

    onBagID(event:Event):void{
        this.gblnValidate = false;
        this.Account.carteraid="0";
        this.intCod = Number((event.target as HTMLSelectElement).value);
        this.Bag = this.Bag1.filter(x => x.CustomerID == this.intCod);
    }

    FGetCustomer(_Option:string,_CustomerID:number):void{        
        let request: any= {};
        request.Option = _Option;
        request.CustomerID = _CustomerID;

        this._CollectionService.getData('api/sgc/customer/getcustomerbygroup/get',request)
            .subscribe(result =>{
                this.Customer = result.lstBECustomer;
        })
    }

    FGetBag(_Option:string,_CustomerID:number,_BagID:number):void{
        let request:any={};
        request.Option = _Option;
        request.CustomerID = _CustomerID;
        request.BagID = _BagID;

        this._CollectionService.getData('api/sgc/bag/getbagbygroup/get',request)
            .subscribe(result =>{
                this.Bag1 = result.lstBEBag;
        })
    }
}