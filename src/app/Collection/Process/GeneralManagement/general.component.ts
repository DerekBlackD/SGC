import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';

@Component({
    selector: 'general-component',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralManagementComponent{
    customer: string = "";
    index: number = 0;
    lstAssign: any[] = [];
    constructor(private _collectionService: CollectionService){
    }

    ngOnInit() {
        this.loadAssignment();
    }

    loadAssignment(): void{
        let data: any = {};

        data.AgentID = "1";
        data.Year = "2017";
        data.Month = "7";

        this._collectionService.getAllDataByID('api/GetAssign', data)
            .subscribe(assign =>{
            console.log(assign);
            this.lstAssign = assign.lstAssignmentByAgent;
            this.customer = this.lstAssign[this.index].CustomerBagID;
        })
    }

    nextCustomer(): void{
        this.index = this.index + 1;
        this.customer = this.lstAssign[this.index].CustomerBagID;
    }

    prevCustomer(): void{
        this.index = this.index - 1;
        this.customer = this.lstAssign[this.index].CustomerBagID;
    })
}