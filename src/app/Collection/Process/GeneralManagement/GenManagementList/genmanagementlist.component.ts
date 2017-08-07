import { Component, Input } from '@angular/core';

@Component({
    selector: 'gen-management-list',
    templateUrl : 'genmanagementlist.component.html',
    styleUrls: ['../general.component.css']
})
export class GenManagementList {
    @Input() CustBagManagementsData: any[] = [];
    @Input() selectPhone: any = {};
    @Input() lstBackupManagementsData: any[] = [];
    intActiveFilter: number;
    selectRow: number;
    selectObservation: string;

    constructor(){
        this.intActiveFilter = 1;
    }

    filterList(nfilter: number): void{
        this.intActiveFilter = nfilter;

        if(nfilter == 1){
            this.lstBackupManagementsData = this.CustBagManagementsData;
        }
        if(nfilter == 2){
            this.lstBackupManagementsData = this.CustBagManagementsData.filter(x => x.AgentTypeID == 1);
        }
        if(nfilter == 3){
            this.lstBackupManagementsData = this.CustBagManagementsData.filter(x => x.AgentTypeID == 2);
        }
        if(nfilter == 4){
            this.lstBackupManagementsData = this.CustBagManagementsData.filter(x => x.ResultID == 1);
        }
        if(nfilter == 5){
            this.lstBackupManagementsData = this.CustBagManagementsData.filter(x => x.ContactID == 1);
        }
    }

    setClickedRow = function(mngtID: number, observation: string){
        this.selectRow = mngtID;
        this.selectObservation = observation;
    }
}