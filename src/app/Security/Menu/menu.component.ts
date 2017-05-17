import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css'],
    animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({ left: -282})),
        state('expanded', style({left: 0})),
        transition(
            'collapsed <=> expanded', [animate(0, style({})), animate(500)])
      ])],
})
export class MenuComponent{
    stateExpression: string;
    flag: boolean;
    constructor() { 
        this.collapse();
        this.flag = true;
    }
    expand() { 
        this.stateExpression = 'expanded'; 
    }
    collapse() { 
        this.stateExpression = 'collapsed'; 
    }
    ShowHideMenu():void{
        if(this.flag){
            this.expand();
            this.flag = !this.flag;
        }else{
            this.collapse();
            this.flag = !this.flag;
        }
    }
}