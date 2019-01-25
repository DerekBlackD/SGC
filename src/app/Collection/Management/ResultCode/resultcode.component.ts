import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'resultcode-component',
    templateUrl: 'resultcode.component.html',
    styleUrls: ['resultcode.component.css'],
})
export class ResultCodeManagementComponent implements OnInit {
    codes : any[] = [];
    
    gBusqueda :any={};

    constructor (
        private _CollectionService : CollectionService,
        private router : Router
    ){}

    ngOnInit() {
        this.loadResult('');
    }

    FSearch():void{
        const strFact = this.gBusqueda.gstrFact.trim();
        this.loadResult(strFact);
    }

    loadResult(strFact:string):void{        
        let data : any={};
        data.Option = 'AllData';
        data.strFact = strFact;

        this._CollectionService.getData('api/Result/getResult',data)
            .subscribe(result =>{
                this.codes = result.lstResult;
        })
    }

    NewResult():void{
        this.router.navigate(['/NuevoRS', 0]);
    }

    EditResultCode(resultid:number): void{
        this.router.navigate(['/NuevoRS', resultid]);
    }

    DelResultCode(resultid:number):void{
        this.router.navigate(['/DeleteRS', resultid]);
    }
    
}