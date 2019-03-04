import { Component, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-customerbagObservation',
    templateUrl: 'ManagementObs.component.html'
})

export class CustomerBagObservation{
    oUser:any={};
    oObs:any={};

    @Output() FN_SetObservations = new EventEmitter;

    blnShow=false;
    blnValidate=false;

    constructor(
        private _Conex:CollectionService
    ){
        this._Conex.showObservationEmitted.subscribe(oResponse => {
            this.oObs = oResponse;
            this.blnShow = true;
        });
        this.oUser = this._Conex.getUserData();
    }

    saveObs():void{
        const oRequest:any={};
        this.oObs.User = this.oUser.UserName;
        oRequest.oCustomerBagObservation=this.oObs;

        this._Conex.getData('api/sgc/CustomerBag/PostInsertCustBagObs/post', oRequest).subscribe(oResponse=>{
            if(oResponse.strResponseCode=='0'){
                this.FN_SetObservations.emit({oObs:this.oObs});
                this.blnShow = false;
                this.blnValidate = false;
            }
        });
    }
}