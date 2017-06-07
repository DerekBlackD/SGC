import { Component, Input } from '@angular/core';

@Component({
    selector: 'banner-component',
    templateUrl: 'banner.component.html',
    styleUrls: ['banner.component.css']
})
export class BannerComponent{
    @Input() BannerControls : boolean = true;
}