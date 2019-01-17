import { Component, NgModule, Input, Output,EventEmitter } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../../Services/collection.service';

@Component({
    selector: 'ManagementDelete-component',
    templateUrl: 'Delete.component.html',
})

export class ManagementDeleteComponent {
    @BlockUI() blockUI: NgBlockUI;
    oInput:any={};
    oUser:any={};
    oManagement:any={};

    constructor(
        private _Conex:CollectionService
    ){
        this.oUser = this._Conex.getUserData();
    }

    FN_Register(){
        this.blockUI.start("Cargando...");

        let oRequest:any={};
        oRequest.ManagementID = this.oInput.ManagementID;

        this._Conex.getData('api/sgc/CustomerBag/RegisterManagement/get',oRequest)
            .subscribe(Response =>{

            if(Response.strResponseCode=='0'){
                this.oManagement = Response.objCustomerBagManagements;
                
            }else{
                alert(Response.strResponseMsg);
            }

            this.blockUI.stop();
        });
    }

    FN_DeleteManagement(oManagement:any){
        if(oManagement.StatusID==2){
            alert('Gestión ya fue eliminada');
        }else{
            const blnResponse = confirm('¿Desea eliminar gestión?');
            if(blnResponse){
                this.blockUI.start('Cargando...');
                oManagement.User = this.oUser.UserName;
                this._Conex.getData('api/sgc/CustomerBag/DeleteManagement/post',oManagement)
                .subscribe(Response =>{
                    alert(Response);
                    this.oManagement={};
                    this.oInput.ManagementID='';
                    this.blockUI.stop();
                });
            }
        }
    }
}