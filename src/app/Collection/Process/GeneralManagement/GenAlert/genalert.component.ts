import { Component, Input } from '@angular/core';
import { CalendarModule, DialogModule } from 'primeng/primeng';
import { CollectionService } from '../../../../Services/collection.service';

@Component({
    selector: 'gen-alert',
    templateUrl: 'genalert.component.html'
})
export class GenAlert{
    @Input() customerData: any = {};
    blnShow = false;
    value: Date;
    es: any;

    constructor(private _collectionService: CollectionService) {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
            dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
            dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
            monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
            monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
            today: 'Hoy',
            clear: 'Borrar'
        }

        this._collectionService.showModalEmitted.subscribe(
            response => {
                console.log(response);
                if (response === 'alert') {
                    this.blnShow = true;
                    console.log(this.customerData);
                }
            });
    }
}
