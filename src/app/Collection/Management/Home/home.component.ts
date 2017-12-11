import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { CalendarModule } from 'primeng/primeng';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    welcomeMessage: string;
    value: Date;
    es: any;

    constructor(private router: Router) {
        this.getWelcomeMessage();

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }
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
