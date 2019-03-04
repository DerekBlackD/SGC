import { Component, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-customerbagMail',
    templateUrl: 'ManagementMail.component.html'
})

export class CustomerBagMail{
    oUser:any={};
    oMail:any={};

    lstOrigen:any[]=[];
    lstOwner:any[]=[];

    @Output() FN_SetMails = new EventEmitter;

    blnShow=false;
    blnValidate=false;

    constructor(
        private _Conex:CollectionService
    ){
        this._Conex.showMailEmitted.subscribe(oResponse => {
            this.oMail = oResponse;
            this.blnShow = true;
        });
        this.oUser = this._Conex.getUserData();
        this.lstOrigen = this._Conex.getGeneralCode(2);
        this.lstOwner = this._Conex.getGeneralCode(20);
    }

    saveMail(blnVal:boolean):void{
        this.blnValidate=true;
        if(blnVal){
            let strUrl:string='';
            const oRequest:any={};
    
            strUrl = (this.oMail.Option=='I')?'api/sgc/CustomerBag/PostInsertCustBagMail/post':'api/sgc/CustomerBag/PostUpdateCustBagMail/post';
            this.oMail.User = this.oUser.UserName;
            oRequest.oCustomerBagMail = this.oMail;
    
            this._Conex.getData(strUrl, oRequest).subscribe(oResponse=>{
                if(oResponse.strResponseCode=='0'){
                    this.FN_SetMails.emit({oMail:this.oMail});
                    this.blnShow = false;
                    this.blnValidate = false;
                }
            });
        }
    }
}