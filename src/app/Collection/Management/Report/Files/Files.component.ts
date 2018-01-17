import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CollectionService } from '../../../../Services/collection.service';
import { UtilitesService } from '../../../../Services/utilities.service';
import { Response } from '@angular/http/src/static_response';
import { window } from 'rxjs/operators/window';

@Component({
    selector: 'Files-component',
    templateUrl: 'Files.component.html',
})

export class FilesComponent{

    @BlockUI() blockUI: NgBlockUI;
    @Input() gstrOption : string;

    glstFiles :any[]=[];

    gFiles: any={};

    strResponseMsg: string;

    constructor(
        private _CollectionService : CollectionService
    ){
        
    }

    FSearch():void{
        const srtFile =  this.gFiles.strSearch.trim();
        this.glstFiles = this.glstFiles.filter(x => x.ManagementDirectory == srtFile);
        this.gFiles.strSearch = "";
    }

    FDeleteFiles():void{
        this.blockUI.start();

        const data:any={};
        data.strDirection = this.gstrOption;

        this._CollectionService.getData('api/Management/PostDirectoryDelete', data).subscribe(response => {
            this.blockUI.stop();
            alert(response.strResponseMsg);
            this.FGetFiles();
        }, err => {
            console.log('Error del sistema' + err);
            this.blockUI.stop();
        });
    }

    FGetFiles(){
        this.blockUI.start();

        const data:any={};
        data.strDirection = this.gstrOption;

        this._CollectionService.getData('api/Management/GetDirectory', data).subscribe(response => {
            this.blockUI.stop();
            console.log(response.lstCustomerBagManagements);
            this.glstFiles = response.lstCustomerBagManagements;
        }, err => {
            console.log('Error del sistema' + err);
            this.blockUI.stop();
        });

    }
}