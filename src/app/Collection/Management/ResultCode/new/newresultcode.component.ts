import { Component, Input  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'resultcode-new-component',
    templateUrl: 'newresultcode.component.html'
})
export class ResultCodeNewComponent {
    result: any = {};

    constructor (
        private router : Router
    ){
        
    }

    SaveResult():void{
        
    }

    SalirNew():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }

}