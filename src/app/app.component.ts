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
  notMenu: boolean = false;
  options: any[] = []

  constructor(private _sharedService: SharedService,
              private _securityService: SecurityService,
              private authenticationService: AuthenticationService
              ) 
  {
    if (localStorage.getItem('currentUser')) {
      this.notMenu = true;
      this.loadMenu();
    }
            
    _sharedService.changeEmitted$.subscribe(
      not => {
        this.notMenu = not;
        if(this.notMenu){
          this.loadMenu();
        }
      });

     
  }

  ShowMenu(response:boolean){
    this.notMenu = response;
  }

  loadMenu(): void{
        //this._securityService.getAllData('api/Menu?BusinessID='+this.authenticationService.getPayLoad().BusinessID+'&UserID=2')
        this._securityService.getAllData('api/Menu?BusinessID=1&UserID=1')
        .subscribe(menu => {
            this.options = menu;
            console.log(this.options);
            //this._changeDetector.detectChanges();
        })
    }


  
}
