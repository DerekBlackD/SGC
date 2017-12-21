import { Component } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
    dataList: any[];
}

@Component({
    selector: 'gen-customerbag-search',
    templateUrl: 'gensearch.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagSearch extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    dataList: any[] = [];
    returnData: any = {};

    constructor(dialogService: DialogService,
                private _collectionService: CollectionService) {
                    super(dialogService);
                    console.log('abre modal');
    }

    setClickedRow = function(selectData: any){
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
        this.result = true;
        this.close();
    }
}
