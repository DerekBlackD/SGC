import { Component } from '@angular/core';
import { SharedService } from './Security/Shared.service';
import { SecurityService } from './Services/security.service';
import { AuthenticationService } from './Services/authentication.service';

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
              private authenticationService: AuthenticationService
              ) 
  {
    if (localStorage.getItem('currentUser')) {
      this.notMenu = true;
      this.loadMenu();
    }

    this._sharedService.changeEmitted$.subscribe(
    response => {
      this.notMenu = response;
      if (this.notMenu) {
        this.loadMenu();
      }
    });
  }

  // loadMenu(): void {
  //   this._securityService.getAllData('api/Menu')
  //   .subscribe(menu => {
  //       this.options = menu;
  //   })
  // }

  loadMenu(): void {
        // this._securityService.getAllData('api/Menu?BusinessID='+this.authenticationService.getPayLoad().BusinessID+'&UserID=2')
        this._securityService.getAllData('api/Menu?BusinessID=1&UserID=1')
        .subscribe(menu => {
            this.options = menu;
            console.log(this.options);
            // this._changeDetector.detectChanges();
        })
    }

}
