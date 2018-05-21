import { Component, NgModule, Input, Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';

@Component({
    selector: 'FilterImport-component',
    templateUrl: 'FilterImport.component.html',
    styleUrls: ['../FilterSearch.component.css'],
})

export class FilterImportComponent{
    gImport:any[]=[];

    @BlockUI() blockUI: NgBlockUI;
    @Output() FSetImport = new EventEmitter;

    constructor(
        private _Conexion:CollectionService
    ){        
    }

    FChangeFile():void{
        this.blockUI.start("Cargando...");

        this._Conexion.postFileUpload('api/Import/UploadJsonFile',event)
        .subscribe(res =>{
            this.FSetImport.emit({strFile:res.toString()});
            this.blockUI.stop();
        })
    }
}