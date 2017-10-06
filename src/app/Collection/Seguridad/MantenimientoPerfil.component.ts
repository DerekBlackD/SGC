import { Component } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,Params } from '@angular/router';

@Component({
    selector: 'MantenimientoPerfil',
    templateUrl: 'MantenimientoPerfil.component.html',
  styleUrls: ['mantenimiento.css']
})
export class MantenimientoPerfilComponent{
  public perfiles: any[] = [];

  constructor(private router:Router,
              private _securityService: SecurityService
  )
  {
      this.loadUsuarios();
  }




  loadUsuarios(): void{
    this._securityService.getAllData('api/Menu/Perfil?BusinessID=1&ID=0&FlgOpciones=0')
      .subscribe(lista => {
        this.perfiles = lista;
        console.log(this.perfiles);
      })
  }

  nuevo(): void{
    this.router.navigate(['/Seguridad/ConsultaPerfil',0]);
  }

  consulta(BussinesID:number , ID:number): void{
    this.router.navigate(['/Seguridad/ConsultaPerfil',ID]);
  }



}