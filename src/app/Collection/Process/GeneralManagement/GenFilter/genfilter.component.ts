import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'gen-filter',
    templateUrl: 'genfilter.component.html'
})

export class GenFilter{

    LstAssignment:any[]=[];
    LstContact:any[]=[];
    LstResult:any[]=[];
    LstCustomerBag:any[]=[];
    LstCode:any[]=[];
    LstCodeResult:any[]=[];

    OFiltro:any={};
    OUser:any={};

    blnShow:boolean=false;

    @BlockUI() blockUI: NgBlockUI;
    @Output() FN_SetFilter = new EventEmitter;

    constructor(
        private _Conex:CollectionService
    ){
        this._Conex.showFilterEmitted.subscribe(Request=>{
            this.blnShow=true;

            this.OUser = this._Conex.getUserData();
            this.LstCode = this._Conex.getGeneralCode(4);
            this.FN_LoadResult();
            
            this.LstAssignment = [];
            this.LstContact = [];
            this.LstResult = [];
            this.OFiltro.Status = false;

            this._Conex.getData('api/Assignment/All/Get', Request).subscribe(Response=>{
                if(Response.strResponseCode=='0'){

                    this.LstCustomerBag = Response.lstAssignmentByAgent;

                    const oCG:any={};
                    oCG.Description = 'Con Gestión';
                    oCG.Quantity = Response.lstAssignmentByAgent.filter(x=>x.StatusID==2).length;
                    oCG.Code = 2;
                    oCG.Filter = Response.lstAssignmentByAgent.filter(x=>x.StatusID==2);
                    this.LstAssignment.push(oCG);

                    const oSG:any={};
                    oSG.Description = 'Sin Gestión';
                    oSG.Quantity = Response.lstAssignmentByAgent.filter(x=>x.StatusID==0 || x.StatusID==1).length;
                    oSG.Code = 1;
                    oSG.Filter = Response.lstAssignmentByAgent.filter(x=>x.StatusID==0 || x.StatusID==1);
                    this.LstAssignment.push(oSG);
                }else{
                    this.blnShow=false;
                }
                this.blockUI.stop();
            });
        });
    }

    FN_Save(){
        let lstAssig:any[]=[];
        lstAssig = this.LstCustomerBag.filter(x=>x.Filter==1);
        if(lstAssig.length==0){
            alert('No se ha realizado ningun filtro');
            return;
        }

        this.blockUI.start('Cargando...');
        let oRequest:any={};

        oRequest.AgentID = this.LstCustomerBag[0].AgentID;
        oRequest.Filter = this.OFiltro.Status;
        oRequest.User = this.OUser.UserName;
        oRequest.LstAssignmentBag = lstAssig;

        this._Conex.getData('api/Assignment/UpdateMasive/Post', oRequest).subscribe(Response=>{
            if(Response.strResponseCode=='0'){
                this.FN_SetFilter.emit();
                this.blnShow=false;
            }else{
                alert(Response.strResponseMsg);
            }
            this.blockUI.stop();
        });
    }

    FN_ChangeAssignment(event,oAssignment:any){
        const input=event.srcElement;
        const ipChecked=input.checked;
        let oContact:any={};
        this.LstResult=[];

        if(ipChecked){
            for(let item of oAssignment.Filter){
                
                this.LstCustomerBag.filter(x=>x.AssignID==item.AssignID)[0].Filter = 1;

                if(item.ContactID!=0){
                    oContact = {};
                    oContact.Code = oAssignment.Code;
                    oContact.ID = item.ContactID;
                    oContact.Description = (item.ContactID!=0) ? this.LstCode.filter(x=>x.ID==item.ContactID)[0].Value : '';
                    oContact.Filter = 0;
                    if(this.LstContact.filter(x=>x.ID==item.ContactID).length == 0){
                        oContact.Quantity = 1;
                        this.LstContact.push(oContact);
                    }else{
                        this.LstContact.filter(x=>x.ID==item.ContactID)[0].Quantity = this.LstContact.filter(x=>x.ID==item.ContactID)[0].Quantity + 1;
                    }
                }
            }
        }else{
            for(let item of oAssignment.Filter){
                this.LstCustomerBag.filter(x=>x.AssignID==item.AssignID)[0].Filter = 0;
            }
            this.LstContact = this.LstContact.filter(x=>x.Code!=oAssignment.Code);
        }
    }

    FN_ChangeContact(event,oContact:any){
        const input=event.srcElement;
        const ipChecked=input.checked;
        let LstAux:any[]=[];
        let oResult:any={};

        if(ipChecked){
            this.LstContact.filter(x=>x.Code==oContact.Code && x.ID==oContact.ID)[0].Filter = 1;
        }else{
            this.LstContact.filter(x=>x.Code==oContact.Code && x.ID==oContact.ID)[0].Filter = 0;
        }

        for(let item of this.LstCustomerBag.filter(x=>x.StatusID==oContact.Code)){
            item.Filter = 0;
        }
        this.LstResult=[];

        for(let item of this.LstContact.filter(x=>x.Filter==1)){
            LstAux = this.LstCustomerBag.filter(x=>x.StatusID==item.Code && x.ContactID==item.ID);
            
            for(let item1 of LstAux){
                this.LstCustomerBag.filter(x=>x.AssignID==item1.AssignID)[0].Filter = 1;
                oResult={};
                oResult.Code = item1.StatusID;
                oResult.ID = item1.ContactID;
                oResult.ResultID = item1.ResultID;
                oResult.Description = (item1.ResultID!=0) ? this.LstCodeResult.filter(x=>x.ResultID==item1.ResultID)[0].Description : '';
                oResult.Filter = 0;
                if(this.LstResult.filter(x=>x.Code==item1.StatusID && x.ID==item1.ContactID && x.ResultID==item1.ResultID).length==0){
                    oResult.Quantity=1;
                    this.LstResult.push(oResult);
                }else{
                    this.LstResult.filter(x=>x.Code==item1.StatusID && x.ID==item1.ContactID && x.ResultID==item1.ResultID)[0].Quantity++;
                }
            }
        }
    }

    FN_LoadResult() {
        const data: any = {};
        data.Option = 'AllData';

        this._Conex.getData('api/Result/getResult', data).subscribe(Response => {
            if(Response.strResponseCode!='0'){
                alert('No se cargaron resultados');
                this.blnShow=false;
                return;
            }
            this.LstCodeResult = Response.lstResult;    
        })
    }

    FN_ChangeResult(event,oResult:any){
        const input=event.srcElement;
        const ipChecked=input.checked;
        let LstAux:any[]=[];

        if(ipChecked){
            this.LstResult.filter(x=>x.Code==oResult.Code && x.ID==oResult.ID && x.ResultID==oResult.ResultID)[0].Filter = 1;
        }else{
            this.LstResult.filter(x=>x.Code==oResult.Code && x.ID==oResult.ID && x.ResultID==oResult.ResultID)[0].Filter = 0;
        }

        for(let item of this.LstCustomerBag.filter(x=>x.StatusID==oResult.Code)){
            item.Filter = 0;
        }

        for(let item of this.LstResult.filter(x=>x.Filter==1)){
            LstAux = this.LstCustomerBag.filter(x=>x.StatusID==item.Code && x.ContactID==item.ID && x.ResultID==item.ResultID);

            for(let item1 of LstAux){
                this.LstCustomerBag.filter(x=>x.AssignID==item1.AssignID)[0].Filter = 1;
            }
        }
    }
}