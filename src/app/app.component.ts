import { Component } from '@angular/core';
import { SharedService } from './Security/Shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService]
})
export class AppComponent {
  notMenu: boolean = false;

  constructor(private _sharedService: SharedService) 
  {
    if (localStorage.getItem('currentUser')) {
      this.notMenu = true;
    }
            
     _sharedService.changeEmitted$.subscribe(
        not => {
            this.notMenu = not;
        });
      }

  ShowMenu(response:boolean){
    this.notMenu = response;
  }
}
