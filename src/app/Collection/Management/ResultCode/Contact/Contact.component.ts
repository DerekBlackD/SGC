import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from '../../../../Services/collection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'Contact-component',
    templateUrl: 'Contact.component.html',
    styleUrls: ['../resultcode.component.css']
})

export class ContactComponent implements OnInit{
    contact: any={};
    lstContact: any[]=[];
    @Input() register: any={};
    @Input() lstResultCodeContact: any[]=[];
    userData: any={};
    lblContactResponse:string = '';
    blnValContactID:boolean = false;
    blnFrmManagement:boolean = false;
    lblContactlstResponse:string = '';
    gintIDResult:number = 0;
    gintIDClass:number = 0;

    constructor(
        private _CollectionService : CollectionService
    ){}

    ngOnInit(){
        this.FLoad(); 
    }

    FLoad():void{
        this.contact.ddlContactID = "";
        this.lstContact = this._CollectionService.getGeneralCode(4);
        this.userData = this._CollectionService.getUserData();
        this.lblContactResponse = '';
    }

    FNewContact():void{
        this.blnFrmManagement = true;
        this.blnValContactID = false;
        this.gintIDResult = this.register.ResultID;
        this.gintIDClass = this.register.ObjIDClass;
        this.lblContactResponse = '';
        this.contact.ddlContactID = '';
    }

    FSaveContact(isValid:boolean):void{
        this.blnValContactID = true;
        this.lblContactResponse = '';
        if(isValid){
            const data: any={};
            data.Option = 'I';   
            data.ResultCodeContactID = 0;
            data.ObjIDClass = this.gintIDClass;
            data.ResultID = this.gintIDResult;
            data.ContactID = this.contact.ddlContactID;
            data.User = this.userData.UserName;
            data.State = 1;

            const request:any={};

            request.objBEResultCodeContact = data;

            this._CollectionService.getData('api/Result/PostResultCodeContact', request).subscribe(res =>{
                this.lblContactResponse = res.strResponseMsg;
                this.contact.ddlContactID = '';  
                this.blnValContactID = false;              
            })
        }
    }

    FGetResultCodeContact():void{
        const data: any={};
        data.Option = 'AllData';
        data.intClassID = this.register.ObjIDClass;
        data.intResultID = this.register.ResultID;

        this._CollectionService.getData('api/Result/GetResultCodeContact', data).subscribe(response =>{
            this.lstResultCodeContact = response.lstBEResultCodeContact;
        })
    }

    FDeleteContact(contactID:number):void{
        const data: any={};
        data.Option = 'E';
        data.ResultCodeContactID = contactID;
        data.User = this.userData.UserName;

        const request:any={};
        request.objBEResultCodeContact = data;
        
        this._CollectionService.getData('api/Result/PostResultCodeContact', request)
        .subscribe(res =>{
            this.FGetResultCodeContact();

            console.log('code:' + res.strResponseCode + ' msg:' + res.strResponseMsg);
        })
    }

    FUndoContact():void{
        this.blnFrmManagement = false;
        this.FGetResultCodeContact();
    }

    FChangeContact():void{
        this.lblContactResponse = '';
        this.blnValContactID = false;
    }
}