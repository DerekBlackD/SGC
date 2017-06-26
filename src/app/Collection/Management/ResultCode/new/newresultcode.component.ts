import { Component, OnInit  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'resultcode-new-component',
    templateUrl: 'newresultcode.component.html'
})
export class ResultCodeNewComponent implements OnInit {
    result: any = {};
    lstTipGestion: any[] = [];
    lstUbica: any[] = [];


    constructor (
        private router : Router,
        private _CollectionService : CollectionService
    ){ 
        this.result.tipogestion = '';
        this.result.idubica = '';
    }

    ngOnInit() {
        this.loadData();
    }

    loadData():void{
        Observable.forkJoin(
            this._CollectionService.getAllDataByID('api/common/getallcodebygroupID', "5"),
            this._CollectionService.getAllDataByID('api/common/getallcodebygroupID', "6"),

        ).subscribe(data =>{
            this.lstTipGestion = data[0];
            this.lstUbica = data[1];
        })
    }


    SaveResult(): void{

        let data: any = {};

        data.Option = "I";
        data.BusinessID = 1;
        data.ObjID = this.result.idobj;
        data.ResultID = this.result.idobj;
        data.ObjIDClass = this.result.tipogestion;
        data.Class = "";
        data.ResultCode = this.result.resultcode;
        data.Description = this.result.descripcion;
        data.Priority = this.result.prioridad;
        data.SubPriority = this.result.subprioridad;
        data.ResponseMessage = "";
        data.ResponseCode = "";
        data.ObjIDUbicability = this.result.idubica;
        data.Commission = this.result.comision;
        data.Situation = this.result.situacion;
        data.Alert = this.result.alerta;
        data.State = 1;
        data.User = "scuya";

        this._CollectionService.postManagementData('api/Result/PostResultCode', data)
            .subscribe(res =>{
                this.router.navigateByUrl("Cobranza/ResultadoGestion");
                console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        })
    }

    SalirNew():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }

}