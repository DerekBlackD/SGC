import { Component, OnInit  } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'resultcode-del-component',
    templateUrl: 'delresultcode.component.html'
})

export class ResultCodeDelCoponent implements OnInit{
    resultid:number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _CollectionService: CollectionService
    ){

    }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.resultid = params['id'].toString();

        });
    }

    Delete():void{
        let data: any = {};

        data.Option = 'E';
        data.BusinessID = 1;
        data.ResultID = this.resultid;
        data.ObjIDClass = 0;
        data.Class = "";
        data.ResultCode = '';
        data.Description = '';
        data.Priority = 0;
        data.SubPriority = 0;
        data.ResponseMessage = "";
        data.ResponseCode = "";
        data.ObjIDUbicability = 0;
        data.Commission = false;
        data.Situation = false;
        data.Alert = false;
        data.State = 0;
        data.User = "scuya";

        this._CollectionService.postManagementData('api/Result/PostResultCode', data)
            .subscribe(res =>{
                this.router.navigateByUrl("Cobranza/ResultadoGestion");
                console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        })

    }

    Cancel():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }


}