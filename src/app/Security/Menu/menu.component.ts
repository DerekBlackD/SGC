import { Component, Input  } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SecurityService } from '../../Services/security.service';
import { SharedService } from '../Shared.service';
import { CollectionService } from '../../Services/collection.service';

@Component({
    selector: 'app-menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css'],
    animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({ left: -282})),
        state('expanded', style({left: 0})),
        transition(
            'collapsed <=> expanded', [animate(0, style({})), animate(300)])
      ])]
})
export class MenuComponent {
    stateExpression: string;
    flag: boolean;
    menuLogo: string;
    @Input() options: any[] = [];

    constructor(private _securityService: SecurityService,
                private _sharedService: SharedService,
                private _collectionService: CollectionService) {
        this.collapse();
        this.flag = true;

        this._collectionService.getConfigFile().subscribe(res => {
            this.menuLogo = res[0].RutaLogoMenu;
        });
    }
    expand(): void {
        this.stateExpression = 'expanded';
    }

    collapse(): void {
        this.stateExpression = 'collapsed';
    }

    ShowHideMenu(): void {
        if (this.flag) {
            this.expand();
            this.flag = !this.flag;
        } else {
            this.collapse();
            this.flag = !this.flag;
        }
    }
}
