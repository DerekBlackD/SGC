import { Component, Input, ɵConsole } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-customerbag',
    templateUrl: 'gencustbag.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBag {
    @Input() customerBagData : any = {};

    oUser:any={};

    constructor(
        private _Conex:CollectionService
    ){
        this.oUser = this._Conex.getUserData();
    }

    newCustBagContact(){
        let oContact:any={};
        oContact.Option='I';
        oContact.CustomerBagID=this.customerBagData.CustomerBagID;
        oContact.ContactType='';
        oContact.ContactSex='';
        oContact.ContactMoney='0';
        oContact.ContactDocType='';
        oContact.ContactOrigin='';
        oContact.ContactSalary=0;

        if (this.customerBagData.CustomerBagID != undefined) {
            this._Conex.showModalContact(oContact);
        } else {
            alert('Debe de seleccionar un cliente');
        }
    }

    editCustBagContact(oContact:any):void{
        oContact.Option='M';
        this._Conex.showModalContact(oContact);
    }

    deletCustBagContact(oContact:any):void{
        var blnAct = confirm('¿Deasea borrar regitros?');
        if(blnAct){
            const oRequest:any={};
            oRequest.objBECustomerBagContact=oContact;

            this._Conex.getData('api/sgc/CustomerBag/PostDeleteCustBagContact/post', oRequest).subscribe(oResponse=>{
                if(oResponse.strResponseCode=='0'){
                    this.GetAllCustBagContact(oContact.CustomerBagID);
                }else{
                    alert(oResponse.strResponseMsg);
                }
            });
        }
    }

    GetAllCustBagContact(CustomerBagID:number):void{
        const oRequest:any={};
        oRequest.intCustomerBagID = CustomerBagID;

        this._Conex.getData('api/sgc/CustomerBag/GetAllCustBagContact/get', oRequest).subscribe(oResponse=>{
            if(oResponse.strResponseCode=='0'){
                this.customerBagData.Contacts = oResponse.lstBECustomerBagContact;
            }else{
                this.customerBagData.Contacts = null;
            }
        });
    }

    FN_GetContact(oContact:any):void{
        this.GetAllCustBagContact(oContact.oContact.CustomerBagID);
    }

    newCustBagMail():void{
        let oMail:any={};
        oMail.Option='I';
        oMail.CustomerBagID=this.customerBagData.CustomerBagID;
        oMail.Mail='';
        oMail.OwnerID='0';
        oMail.OriginID='0';

        if (this.customerBagData.CustomerBagID != undefined) {
            this._Conex.showModalMail(oMail);
        } else {
            alert('Debe de seleccionar un cliente');
        }
    }

    editCustBagMail(oMail:any):void{
        oMail.Option='M';
        this._Conex.showModalMail(oMail);
    }

    deletCustBagMail(oMail:any):void{
        var blnAct = confirm('¿Deasea borrar regitros?');
        if(blnAct){
            const oRequest:any={};
            oMail.User = this.oUser.UserName;
            oRequest.oCustomerBagMail=oMail;

            this._Conex.getData('api/sgc/CustomerBag/PostDeleteCustBagMail/post', oRequest).subscribe(oResponse=>{
                if(oResponse.strResponseCode=='0'){
                    this.GetAllCustBagMail(oMail.CustomerBagID);
                }else{
                    alert(oResponse.strResponseMsg);
                }
            });
        }
    }

    GetAllCustBagMail(CustomerBagID:number):void{
        const oRequest:any={};
        oRequest.ID = CustomerBagID;

        this._Conex.getData('api/sgc/CustomerBag/GetAllCustBagMail/get', oRequest).subscribe(oResponse=>{
            if(oResponse.strResponseCode=='0'){
                this.customerBagData.Mails = oResponse.lstCustomerBagMail;
            }else{
                this.customerBagData.Mails = null;
            }
        });
    }

    FN_GetMails(oMail:any):void{
        this.GetAllCustBagMail(oMail.oMail.CustomerBagID);
    }

    //Mangt Observations begin
    newCustBagObs():void{
        let oObs:any={};
        oObs.Option='I';
        oObs.CustomerBagID=this.customerBagData.CustomerBagID;
        oObs.AgentID=this._Conex.getAgentID();
        oObs.Observation='';

        if (this.customerBagData.CustomerBagID != undefined) {
            this._Conex.showModalObs(oObs);
        } else {
            alert('Debe de seleccionar un cliente');
        }
    }
    deletCustBagObs(oObs:any):void{
        var blnAct = confirm('¿Deasea borrar regitros?');
        if(blnAct){
            const oRequest:any={};
            oObs.User = this.oUser.UserName;
            oRequest.oCustomerBagObservation=oObs;

            this._Conex.getData('api/sgc/CustomerBag/PostDeleteCustBagObs/post', oRequest).subscribe(oResponse=>{
                if(oResponse.strResponseCode=='0'){
                    this.GetAllCustBagObs(oObs.CustomerBagID);
                }else{
                    alert(oResponse.strResponseMsg);
                }
            });
        }
    }
    GetAllCustBagObs(CustomerBagID:number):void{
        const oRequest:any={};
        oRequest.ID = CustomerBagID;

        this._Conex.getData('api/sgc/CustomerBag/GetAllCustBagObs/get', oRequest).subscribe(oResponse=>{
            if(oResponse.strResponseCode=='0'){
                this.customerBagData.Observations = oResponse.lstCustomerBagObservation;
            }else{
                this.customerBagData.Observations = null;
            }
        });
    }
    FN_GetObservations(oObs:any):any{
        this.GetAllCustBagObs(oObs.oObs.CustomerBagID);
    }
    //Mangt Observations end
}