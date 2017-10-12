import { Component, OnInit  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'resultcode-new-component',
    templateUrl: 'newresultcode.component.html'
})
export class ResultCodeNewComponent implements OnInit {
    result: any = {};
    lstTipGestion: any[] = [];
    lstUbica: any[] = [];
    idresultcode:any;

    indica: string;
    resultID: number;
    register: any = {};

    constructor (
        private router : Router,
        private route: ActivatedRoute,
        private _collectionService : CollectionService
    ){ 
        this.loadData();
    }

    ngOnInit() {
        
        this.route.params.subscribe(params => {
            this.resultID = params['id'].toString();
            
            if(this.resultID == 0){
                this.indica='I';

                this.result.tipogestion = '';
                this.result.idubica = '';

            }else{
                this.indica='M';

                this.loadResult(this.resultID);
                
            }

        });

    }

    loadData():void{
        const dataResul: any={};
        dataResul.GroupID = "14";
        const dataResul2: any={};
        dataResul2.GroupID = "6";
        Observable.forkJoin(
            this._collectionService.getData('api/common/getallcodebygroupID', dataResul),
            this._collectionService.getData('api/common/getallcodebygroupID', dataResul2),

        ).subscribe(data =>{
            this.lstTipGestion = data[0].lstGeneralCode;
            this.lstUbica = data[1].lstGeneralCode;
            
        })
    }

    loadResult(resultid:number):void{
        this._collectionService.getAllData('api/Result/getResultRegister/1/' + resultid)
            .subscribe(result =>{

                this.register = result;
                this.result.idobj = this.register.ResultID;
                this.result.tipogestion = this.register.ObjIDClass;
                console.log(this.result.tipogestion);
                this.result.resultcode = this.register.ResultCode;
                this.result.descripcion = this.register.Description;
                this.result.prioridad = this.register.Priority;
                this.result.subprioridad = this.register.SubPriority;
                this.result.idubica = this.register.ObjIDUbicability.toString();
                this.result.comision = this.register.Commission;
                this.result.situacion = this.register.Situation;
                this.result.alerta = this.register.Alert;
        })
    }


    SaveResult(): void{

        let data: any = {};

        data.Option = this.indica;
        data.ResultID = this.resultID;
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

        this._collectionService.getData('api/Result/PostResultCode', data)
            .subscribe(res =>{
                this.router.navigateByUrl("Cobranza/ResultadoGestion");
                console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        })
    }

    SalirNew():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }

}