import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'Previous-component',
    templateUrl: 'Previous.component.html',
    styleUrls: ['../resultcode.component.css']
})

export class PreviousComponent implements OnInit {
    lblMsgPrevious:string='';
    lblMsgPreviousMngt:string='';

    blnFrmManagement:boolean=false;
    blnValPrevious:boolean=false;

    lstResultPrevious:any[]=[];
    @Input() lstResultCodePrevious:any[]=[];

    oPrevious:any={};
    oUser:any={};
    @Input() register: any={};

    constructor(
        private _oConexion:CollectionService
    ){

    }

    ngOnInit(){
    }

    FNewPrevious(){
        this.blnFrmManagement=true;
        this.blnValPrevious=false;
        this.oPrevious.ddlPreviousID='';

        this.FN_LoadResult(this.register);
        this.oUser=this._oConexion.getUserData();

        this.oPrevious.ddlPreviousID='';
        this.lblMsgPreviousMngt='';
    }

    FUndoPrevious(){
        this.blnFrmManagement=false;
        this.blnValPrevious=true;
    }

    FN_LoadResult(oResult:any):void{        
        let data : any={};
        data.Option = 'AllData';
        data.strFact = '';

        this._oConexion.getData('api/Result/getResult',data).subscribe(result =>{
            this.lstResultPrevious = result.lstResult.filter(x=>x.Class==oResult.Class && x.ResultID!=oResult.ResultID);
        })
    }

    FSavePrevious(blnValid:boolean){
        this.blnValPrevious=true;
        if(blnValid){
            let oRequest:any={};
            let oResultCodePrevious:any={};

            oResultCodePrevious.ResultID=this.register.ResultID;
            oResultCodePrevious.intResultPreviousID=this.oPrevious.ddlPreviousID;
            oResultCodePrevious.User=this.oUser.UserName;

            oRequest.oResultCodePrevious=oResultCodePrevious;

            this._oConexion.getData('api/Result/PostManagementResultPrevious', oRequest).subscribe(oResponse =>{
                if(oResponse.strResponseCode=='0'){
                    this.blnFrmManagement=false;
                    this.blnValPrevious=false;
                    this.FN_AllResultPrevious();
                    this.lblMsgPreviousMngt='';
                    this.lblMsgPrevious='';
                }else{
                    this.lblMsgPreviousMngt = oResponse.strResponseMsg;
                }
            });
        }
    }

    FDeletePrevious(oPrevious:any){
        var oRequest:any={};

        oPrevious.StatusID=2;
        oRequest.oResultCodePrevious=oPrevious;

        this._oConexion.getData('api/Result/PostUpdateResultPrevious', oRequest).subscribe(oResponse =>{
            if(oResponse.strResponseCode=='0'){
                this.FN_AllResultPrevious();
            }else{
                this.lblMsgPrevious = oResponse.strResponseMsg;
            }
        });

    }

    FN_AllResultPrevious(){
        let oRequest:any={};

        oRequest.intResultID=this.register.ResultID;

        this._oConexion.getData('api/Result/GetAllResultPrevious', oRequest).subscribe(oResponse =>{
            if(oResponse.strResponseCode=='0'){
                this.lstResultCodePrevious=oResponse.lstResultCodePrevious;
            }else{
                this.lstResultCodePrevious=null;
                this.lblMsgPrevious = oResponse.strResponseMsg;
                this.lblMsgPreviousMngt = oResponse.strResponseMsg;
            }
        });
    }
}