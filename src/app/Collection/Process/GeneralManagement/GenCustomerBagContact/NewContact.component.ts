import { Component, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-customerbagContact',
    templateUrl: 'NewContact.component.html'
})

export class CustomerBagContact {
    oUser:any={};
    oContact:any={};

    lstOrigen:any[]=[];
    lstType:any[]=[];
    lstDocType:any[]=[];
    lstMoney:any[]=[];

    @Output() FN_SetContacts = new EventEmitter;

    blnShow=false;
    blnValidate=false;

    constructor(
        private _Conex:CollectionService
    ){
        this._Conex.showContactEmitted.subscribe(oResponse => {
            this.oContact = oResponse;
            this.blnShow = true;
        });
        this.oUser = this._Conex.getUserData();
        this.lstOrigen = this._Conex.getGeneralCode(2);
        this.lstType = this._Conex.getGeneralCode(20);
        this.lstDocType = this._Conex.getGeneralCode(8);
        this.lstMoney = this._Conex.getGeneralCode(12);
    }

    saveContact(blnVal:boolean):void{
        this.blnValidate=true;
        if(blnVal){
            let strUrl:string='';
            const oRequest:any={};
    
            strUrl = (this.oContact.Option=='I')?'api/sgc/CustomerBag/PostInsertCustBagContact/post':'api/sgc/CustomerBag/PostUpdateCustBagContact/post';
            this.oContact.User = this.oUser.UserName;
            oRequest.objBECustomerBagContact = this.oContact;
    
            this._Conex.getData(strUrl, oRequest).subscribe(oResponse=>{
                if(oResponse.strResponseCode=='0'){
                    this.FN_SetContacts.emit({oContact:this.oContact});
                    this.blnShow = false;
                    this.blnValidate = false;
                }
            });
        }
    }
}