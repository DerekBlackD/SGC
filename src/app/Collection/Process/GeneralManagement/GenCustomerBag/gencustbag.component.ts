import { Component, Input } from '@angular/core';

@Component({
    selector: 'gen-customerbag',
    templateUrl: 'gencustbag.component.html',
    styleUrls: ['../general.component.css']
})
export class GenCustomerBag {
    @Input() customerBagData : any = {};
}