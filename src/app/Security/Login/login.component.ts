import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent{
    @Input() NotLogin : boolean;

    @Output() SessionOn = new EventEmitter<boolean>();

    constructor(private router: Router,
                private _sharedService: SharedService){

    }

    Login():void{
        this.SessionOn.emit(!this.NotLogin);
        this.router.navigateByUrl("/ElegirPerfil");

        this._sharedService.emitChange(true);
    }
}