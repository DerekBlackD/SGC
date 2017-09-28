import { Component } from '@angular/core';
import { SharedService } from './Security/Shared.service';
import { SecurityService } from './Services/security.service';

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
              private _securityService: SecurityService) {
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

  loadMenu(): void {
    this._securityService.getAllData('api/Menu')
    .subscribe(menu => {
        this.options = menu;
    })
  }
}
