import { Component } from '@angular/core';
import { DialogModule } from 'primeng/primeng';
import { CollectionService } from '../../../../Services/collection.service';

export interface ConfirmModel {
    dataList: any[];
}

@Component({
    selector: 'gen-customerbag-search',
    templateUrl: 'gensearch.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagSearch {
    blnShow = false;
    dataList: any[] = [];
    returnData: any = {};

    constructor(private _collectionService: CollectionService) {
        this._collectionService.showModalEmitted.subscribe(
            response => {
                if (response.modalName === 'searchResult') {
                    this.blnShow = true;
                    this.dataList = response.lstData;
                }
            });
    }

    setClickedRow = function(selectData: any) {
        this.returnData.CustomerBagID = selectData.CustomerBagID;
        this.returnData.CustomerID = selectData.CustomerID;
        this.returnData.BagID = selectData.BagID;
    }

    confirm() {
        if (!this.returnData) {
            alert('Seleccione un resultado');
            return;
        }

        this._collectionService.selectData(this.returnData);
        this.blnShow = false;
    }
}
