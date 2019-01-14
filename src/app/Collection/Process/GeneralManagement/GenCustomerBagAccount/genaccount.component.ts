import { Component, Input } from '@angular/core';

@Component({
    selector: 'gen-customerbag-account',
    templateUrl:'genaccount.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBagAccount{
    @Input() lstAccountFormat: any[] = [];
    @Input() lstAccountHead: any[] = [];
    @Input() lstAccountBody: any[] = [];
    @Input() lstAccountFoot: any[] = [];

    constructor() {
        

        
    }

    FColorCelda(intRow:number){
        let strstyle;
        let _strColor:string='';

        _strColor = this.lstAccountFormat[intRow].ColumnColorName;
        
        strstyle = {
            'background-color': _strColor,
            'color': 'Black'
        };

        return strstyle;
    }
}
