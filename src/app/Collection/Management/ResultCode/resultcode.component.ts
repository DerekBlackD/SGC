import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'resultcode-component',
    templateUrl: 'resultcode.component.html'
})
export class ResultCodeManagementComponent implements OnInit {
    
    codes : any[] = [];

    constructor (
        private _CollectionService : CollectionService,
        private router : Router
    ){}

    ngOnInit() {
        this.loadResult();
    }

    loadResult():void{
        this._CollectionService.getAllData('api/Result/getResult/1')
            .subscribe(result =>{
                this.codes = result;
                console.log(this.codes);
        })
  }

  NewResult():void{
      this.router.navigate(['NuevoRS']);
  }
    
}