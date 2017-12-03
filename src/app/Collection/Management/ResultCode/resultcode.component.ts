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
        let data : any={};
        data.Option = 'AllData';

        this._CollectionService.getData('api/Result/getResult',data)
            .subscribe(result =>{
                this.codes = result.lstResult;
                console.log("code:" + result.strResponseCode + " msg:" + result.strResponseMsg);
        })
    }

    NewResult():void{
        //Vthis.router.navigate(['/NuevoRS', 0]);
    }

    EditResultCode(resultid:number): void{
        this.router.navigate(['/NuevoRS', resultid]);
    }

    DelResultCode(resultid:number):void{
        //this.router.navigate(['/DeleteRS', resultid]);
    }
    
}