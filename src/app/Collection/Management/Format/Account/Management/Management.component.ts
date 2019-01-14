import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../../Services/collection.service';

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
    glstColumnColor :any[]=[];
    glstColumnCode :any[]=[];

    gintPosition: number;
    gintIDFormatAccount: number;
    gintIDColumn :number;
    gintCustomerID:number;;
    gintBagID:number;

    gstrIndica: string = '';
    gstrIndicaGen: string = '';
    gstrComment: string = '';

    gblnColumnSum: boolean = false;
    gblnValidate: boolean = false;
    gblnEdit: boolean = true;

    constructor (private _CollectionService: CollectionService,
               private _Route: ActivatedRoute,
               private _RouterExit : Router
            ) {}

    ngOnInit(){
        this.FLoad();

        this._Route.params.subscribe(response=>{
            this.gintIDFormatAccount = response['id'];
            this.gintCustomerID = response['CustomerID'];
            this.gintBagID = response['BagID'];
            if(this.gintIDFormatAccount != 0){
                this.gstrIndicaGen = 'U';
                this.FAccountRegister(this.gintIDFormatAccount);
                this.gblnEdit = false;

            }else{
                this.gstrIndicaGen = 'I';
                this.gblnEdit = true;
                
            }
        });
        
    }

    FLoad():void{
        this.Account.clienteid="";
        this.Account.carteraid="";

        this.FGetCustomer("AllDataByGroup",0);
        this.FGetBag("AllDataCustomer",0,0);
        this.FAccount('AllDataAccount',0);
        this.glstColumnColor = this._CollectionService.getGeneralCode(24);
        this.gDataUser = this._CollectionService.getUserData();
        this.FGeneralGroup();

        this.AccountDet.ddlColumnCode = "0";
        this.AccountDet.ddlColumnColor = "0";
    }

    FGeneralGroup():void{

        const request:any={};

        this._CollectionService.getData('api/sgc/common/GetGeneralGroupData',request)
        .subscribe(Response=>{
            this.glstColumnCode = Response.lstGeneralCode;
            console.log('Respuesta del sistema: cod '+ Response.strResponseCode +' msg '+Response.strResponseMsg);
        })
    }

    FSelectField(_description:string,_type:string,_length:string,_comment:string):void{
        this.AccountDet.txtColumnName = _description;
        this.AccountDet.txtColumnType = _type;
        this.AccountDet.txtColumnLenght = _length;
        this.gstrComment = _comment;
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
                return;
                
            } else{
                for(let row=0;row<this.lstAccountSelect.length;row++){
                    if(this.lstAccountSelect[row].ColumnName == this.AccountDet.txtColumnName){
                        blnValidar = false;
                        break;
                    }
                }

                this.gintIDColumn = 0;

                if(blnValidar==true){
                    const data: any={};
                    data.ID = this.gintIDFormatAccount;
                    data.ColumnID = this.gintIDColumn;
                    data.ColumnName = this.AccountDet.txtColumnName;
                    data.ColumnDescription = this.AccountDet.txtColumnDescription;
                    data.ColumnType = this.AccountDet.txtColumnType;
                    data.ColumnLength = this.AccountDet.txtColumnLenght;
                    data.ColumnPosition = this.lstAccountSelect.length;
                    data.ColumnSum = this.AccountDet.chkColumnSum;
                    data.ColumnCode = this.AccountDet.ddlColumnCode;
                    data.ColumnColorID = this.AccountDet.ddlColumnColor;
                    data.ColumnComment = this.gstrComment;
                    data.User = this.gDataUser.UserName;
                    data.State = 1;
                    this.lstAccountSelect.push(data);
                } else {
                    alert('Detalle ya agregado');
                }         
            }   
        } else{
            let AccountAux: any={};
            AccountAux.ID = this.gintIDFormatAccount;
            AccountAux.ColumnID = this.AccountDet.ColumnID;
            AccountAux.ColumnName = this.AccountDet.txtColumnName;
            AccountAux.ColumnType = this.AccountDet.txtColumnType;
            AccountAux.ColumnLength = this.AccountDet.txtColumnLenght;
            AccountAux.ColumnDescription = this.AccountDet.txtColumnDescription;
            AccountAux.ColumnPosition = this.gintPosition;
            AccountAux.ColumnSum = this.AccountDet.chkColumnSum;
            AccountAux.ColumnCode = this.AccountDet.ddlColumnCode;
            AccountAux.ColumnColorID = this.AccountDet.ddlColumnColor;
            AccountAux.ColumnComment = this.gstrComment;
            this.lstAccountSelect[this.gintPosition] = AccountAux;
        }

        this.AccountDet.txtColumnName = '';
        this.AccountDet.txtColumnType = '';
        this.AccountDet.txtColumnLenght = '';
        this.AccountDet.txtColumnDescription = '';
        this.AccountDet.ddlColumnCode = '0';
        this.AccountDet.ddlColumnColor = '0';
        this.AccountDet.chkColumnSum = false;
        this.gblnColumnSum = false;
        this.gstrComment = '';
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

        console.log(AccountAux);

        this.AccountDet.ID = AccountAux.ID;
        this.AccountDet.ColumnID = AccountAux.ColumnID;
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
        this.AccountDet.ddlColumnCode = AccountAux.ColumnCode;
        this.AccountDet.ddlColumnColor = AccountAux.ColumnColorID;
    }

    FDelete(_intPosition:number,_intID:number,_intColumnID:number):void{
        this.lstAccountSelect.splice(_intPosition,1);
        for(let row = 0; row<this.lstAccountSelect.length;row++){
            this.lstAccountSelect[row].ColumnPosition = row;
        }

        if(_intID!=undefined){
            const request:any={};
            const data :any={};
    
            data.Option = 'ED';
            data.ID = _intID;
            data.ColumnID = _intColumnID;
            data.User = this.gDataUser.UserName;
    
            request.objBEAccountFormat = data;
            
            this._CollectionService.getData('api/AccountFormat/PostAccountFormat', request)
            .subscribe(response =>{
                console.log('code:' + response.strResponseCode + ' msg:' + response.strResponseMsg);
            }) 
        }
    }

    FSave(blnValidate:boolean):void{
        this.gblnValidate = true;
        if(blnValidate){
            const data: any = {};
            data.Option = this.gstrIndicaGen;
            data.CustomerID = this.Account.clienteid;
            data.BagID = this.Account.carteraid;
            data.Observation = this.Account.txtObservation;
            data.FormatID = this.gintIDFormatAccount;

            const request: any={};
            request.CustomerID = this.Account.clienteid;
            request.BagID = this.Account.carteraid;
            request.objBEAccountFormat = data;
            request.lstBEAccountFormat = this.lstAccountSelect;

            if(this.lstAccountSelect.length < 1){
                alert('Ingrese campos al formato');
            }else{               
                console.log(request);
    
                this._CollectionService.getData('api/AccountFormat/PostAccountFormatGeneral', request)
                .subscribe(response =>{    
                    this.gblnValidate = false;
                    if(response.strResponseCode=='-1'){
                        alert(response.strResponseMsg);
                    }else{
                        this._RouterExit.navigateByUrl("Collection/FormatAccount");
                    }
                })                
            }            
        }
    }

    FAccount(_Option:string,_FormatID:number):void{
        let request:any={};

        this._CollectionService.getData('api/AccountFormat/GetAccountFormatListBD',request)
        .subscribe(Response=>{
            this.lstAccount = Response.lstBEFormatAccount;
        })

    }

    FAccountRegister(_id:number):void{
        const request:any={};
        request.FormatID = _id;
        request.CustomerID = this.gintCustomerID;
        request.BagID = this.gintBagID;

        this._CollectionService.getData('api/AccountFormat/GetAccountFormartRegister',request)
        .subscribe(Response =>{
            this.lstAccountSelect = Response.lstBEFormatAccount;
            console.log(this.lstAccountSelect);
            const intcustomerid = this.lstAccountSelect[0].CustomerID;
            const intbagid = this.lstAccountSelect[0].BagID;

            this.Account.clienteid = intcustomerid;
            this.Account.txtObservation = this.lstAccountSelect[0].Observation;
            this.Bag = this.Bag1.filter(x => x.CustomerID == intcustomerid);
            this.Account.carteraid = intbagid;
        })
    }

    FExit():void{
        this._RouterExit.navigateByUrl("Collection/FormatAccount");
    }

    onBagID(event:Event):void{
        let strCustomerID:string="";
        this.gblnValidate = false;
        this.Account.carteraid="";
        strCustomerID = (event.target as HTMLSelectElement).value;
        this.Bag = this.Bag1.filter(x => x.CustomerID == strCustomerID);
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