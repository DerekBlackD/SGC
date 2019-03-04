import { Component } from '@angular/core';
import { SharedService } from './Security/Shared.service';
import { SecurityService } from './Services/security.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';
import { CollectionService } from './Services/collection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService]
})
export class AppComponent {
  notMenu = false;
  options: any[] = [];

  constructor(private _sharedService: SharedService,
              private _securityService: SecurityService,
              private _authenticationService: AuthenticationService,
              private _collectionService: CollectionService,
              private _router: Router) {
    // if (localStorage.getItem('currentUser')) {
    //   this.notMenu = true;
    //   this.loadMenu();
    // }

    this._authenticationService.logout();
    this._router.navigateByUrl('/');

    this._sharedService.changeEmitted$.subscribe(
    response => {
      this.notMenu = response;
      if (this.notMenu) {
        this.loadMenu();
      }
    });
  }

  loadMenu(): void {
    let oUser:any = this._collectionService.getUserData();
    this._collectionService.setAlert(this._collectionService.getAgentID());

    this._securityService.getAllData('api/Menu?BusinessID='+ oUser.BusinessID +'&UserID=' + oUser.ID).subscribe(menu => {
        this.options = menu;
    })
  }

}
