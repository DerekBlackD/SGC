import { Component, OnInit  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

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

    StateContact = false;
    Modify:boolean = true;
    blnValidate:boolean = false;

    register: any = {};
    dataResult:any={};
    userData:any={};
    management:any={};

    lstResultCodeContact:any[]=[];
    lstResultCodeRelation:any[]=[];

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
                this.StateContact=false;
                this.Modify = false;

            }else{
                this.indica='M';
                this.getResultCode(this.resultID);                
                this.StateContact = true;
                this.Modify = true;
            }
        });
    }

    loadData():void{
        this.lstTipGestion = this._collectionService.getGeneralCode(14);
        this.lstUbica = this._collectionService.getGeneralCode(6);
        this.userData = this._collectionService.getUserData();
    }

    getResultCode(resultid:number):void{
        let data : any={};
        data.Option = 'Register';
        data.intResultID = resultid;

        this._collectionService.getData('api/Result/GetResultCodeRegister', data)
             .subscribe(result =>{                 
                this.register = result.objResult;
                this.lstResultCodeContact = result.lstBEResultCodeContact;
                this.lstResultCodeRelation = result.lstBEResultCodeRelation;
                
                this.result.tipogestion = this.register.ObjIDClass;
                this.result.resultcode = this.register.ResultCode;
                this.result.descripcion = this.register.Description;
                this.result.prioridad = this.register.Priority;
                this.result.subprioridad = this.register.SubPriority;
                this.result.idubica = this.register.ObjIDUbicability;
                this.result.comision = this.register.Commission;
                this.result.situacion = this.register.Situation;
                this.result.alerta = this.register.Alert;
                this.result.SituationQuantity = this.register.intSituationQuantity;
                this.result.Payment = this.register.blnPayment;
                
        })
    }


    SaveResult(blnValid:boolean): void{
        this.blnValidate = true;
        if (blnValid){
            let data: any = {};
            data.Option = this.indica;
            data.ResultID = this.resultID;
            data.ObjIDClass = this.result.tipogestion;
            data.ResultCode = this.result.resultcode;
            data.Description = this.result.descripcion;
            data.Priority = this.result.prioridad;
            data.SubPriority = this.result.subprioridad;
            data.ObjIDUbicability = this.result.idubica;
            data.Commission = this.result.comision;
            data.Situation = this.result.situacion;
            data.intSituationQuantity = this.result.SituationQuantity;
            data.Alert = this.result.alerta;
            data.blnPayment = this.result.Payment;
            data.State = 1;
            data.User = this.userData.UserName;

            this.management.objResult = data;

            this._collectionService.getData('api/Result/PostResultCode', this.management).subscribe(res =>{
                if(res.strResponseCode != '0'){
                    alert(res.strResponseMsg);
                }else{
                    this.indica='M';
                    this.getResultCode(res.intResponseID);                
                    this.StateContact = true;
                }
                this.blnValidate = false;
            });
        }
    }

    SalirNew():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }

}