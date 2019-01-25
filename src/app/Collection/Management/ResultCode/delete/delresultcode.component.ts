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

    oUserData:any={};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _CollectionService: CollectionService
    ){

    }

    ngOnInit(){
        this.oUserData = this._CollectionService.getUserData();
        this.route.params.subscribe(params => {
            this.resultid = params['id'].toString();

        });
    }

    Delete():void{
        let data: any = {};
        let oRequest:any = {};

        data.Option = 'E';
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
        data.User = this.oUserData.UserName;

        oRequest.objResult = data;

        this._CollectionService.getData('api/Result/PostResultCode', oRequest).subscribe(res =>{
            if (res.strResponseCode=='0'){
                this.router.navigateByUrl("Cobranza/ResultadoGestion");
            }else{
                alert(res.strResponseMsg);
            }
        })

    }

    Cancel():void{
        this.router.navigateByUrl("Cobranza/ResultadoGestion");
    }


}