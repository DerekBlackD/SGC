import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    welcomeMessage: string;
    constructor(private router: Router) {
        this.getWelcomeMessage();
    }

    getWelcomeMessage(): void {
        const today = new Date();
        const curHr = today.getHours();

        if (curHr < 12) {
          this.welcomeMessage = '!Buenos días!';
        } else if (curHr < 18) {
            this.welcomeMessage = '!Buenas tardes!';
        } else {
            this.welcomeMessage = '!Buenas noches!';
        }

    }

    goToManagement(): void {
        this.router.navigateByUrl('/Cobranza/GestionGeneral');
    }
}
