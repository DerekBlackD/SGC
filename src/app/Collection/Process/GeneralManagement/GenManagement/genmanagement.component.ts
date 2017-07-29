import { Component, Input } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-management',
    templateUrl: 'genmanagement.component.html',
    styleUrls: ['../general.component.css']
})
export class GenManagement{
     @Input() selectPhone: any = {};
     @BlockUI() blockUI: NgBlockUI;
     oManagement: any = {};
     oResultCodes: any[] = [];
     lstMngtType: any;
     lstContact: any;
     lstCondition: any;
     startDate: string;

     constructor(private _collectionService: CollectionService){
         //this.selectPhone.phoneID;
         this.oManagement.ResultID = "";
         this.oManagement.AgentTypeID = "";
         this.oManagement.MngtCondition = "";
         this.oManagement.ContactID = "";
         this.startDate = this.getDateTime();
         this.loadResult();
         this.loadData();
     }

     loadResult():void{
        this._collectionService.getAllData('api/Result/getResult/1')
            .subscribe(result =>{
                this.oResultCodes = result;
        })
    }

    loadData():void{
        let dataMngtType: any = {};
        dataMngtType.GroupID = "5";
        let dataContact: any = {};
        dataContact.GroupID = "4";
        let dataCondition: any = {};
        dataCondition.GroupID = "10";
        Observable.forkJoin(
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataMngtType),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataContact),
            this._collectionService.getAllDataByID('api/common/getallcodebygroupID', dataCondition),
        ).subscribe(data => {
                this.lstMngtType = data[0].lstGeneralCode;
                this.lstContact = data[1].lstGeneralCode;
                this.lstCondition = data[2].lstGeneralCode;
            }
        )
    }

    getDateTime(): string{
        let today = new Date();
        var m = today.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var year = today.getFullYear();
        var day = today.getDate();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        let date = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        return date;
    }

    saveManagement(): void{
        this.blockUI.start("Cargando...");

        this.oManagement.CustomerBagID = 1;
        this.oManagement.ManagementID = 0;
        this.oManagement.CustomerID = 1;
        this.oManagement.BagID = 1;
        this.oManagement.MngtDateString = this.getDateTime();
        this.oManagement.AgentTypist = 1;
        this.oManagement.AddressID = 0;
        this.oManagement.PhoneID = this.selectPhone.phoneID;
        this.oManagement.PayCompID = 0;
        this.oManagement.MngtReason = "";
        this.oManagement.MngtNormalize = "";
        this.oManagement.Priority = "1";
        this.oManagement.SubPriority = "1";
        this.oManagement.StartDateString = this.startDate;
        this.oManagement.EndDateString = this.getDateTime();
        this.oManagement.User = "jpena";

        this._collectionService.getAllDataByID("api/customerbag/postcustbagmanagement", this.oManagement)
            .subscribe(result => {
                console.log(result);
                console.log('guardado correctament');
                this.blockUI.stop();
            })
    }
}