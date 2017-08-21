import { Injectable } from '@angular/core';

@Injectable()
export class UtilitesService {
    getDateTime(): string {
        const today = new Date();
        const m = today.getMonth() + 1;
        const month = (m < 10) ? '0' + m : m;
        const year = today.getFullYear();
        const day = today.getDate();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const second = today.getSeconds();
        const date = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        return date;
    }

    getDateForInput(): string {
        const today = new Date();
        const m = today.getMonth() + 1;
        const month = (m < 10) ? '0' + m : m;
        const year = today.getFullYear();
        const d = today.getDate();
        const day = (d < 10) ? '0' + d : d;
        const date = `${year}-${month}-${day}`;
        return date;
    }

    getDate(): string {
        const today = new Date();
        const m = today.getMonth() + 1;
        const month = (m < 10) ? '0' + m : m;
        const year = today.getFullYear();
        const d = today.getDate();
        const day = (d < 10) ? '0' + d : d;
        const date = `${day}/${month}/${year}`;
        return date;
    }
}
