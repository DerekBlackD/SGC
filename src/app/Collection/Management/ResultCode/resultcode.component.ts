import { Component, Input  } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'resultcode-component',
    templateUrl: 'resultcode.component.html'
})
export class ResultCodeManagementComponent{
    
    codes : any[] = [];

    constructor (
        private _CollectionService : CollectionService,
        private router : Router
    ){
        
        this.loadResult();
        
    }

    loadResult():void{
    this._CollectionService.getAllData('api/menu/test/General/1')
    .subscribe(result =>{
      this.codes = result;
      console.log(this.codes);
    })
  }

  NewResult():void{
      this.router.navigateByUrl("Cobranza/ResultadoGestion/Nuevo");
  }
    
}