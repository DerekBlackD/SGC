import { Component } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,Params } from '@angular/router';

@Component({
    selector: 'MantenimientoUsuario',
    templateUrl: 'MantenimientoUsuario.component.html',
    styleUrls: ['mantenimiento.css']
})
export class MantenimientoUsuarioComponent{
  public usuarios: any[] = [];

  constructor(private router:Router,
              private _securityService: SecurityService
  )
  {
      this.loadUsuarios();
  }




  loadUsuarios(): void{
    this._securityService.getAllData('api/Usuarios?BusinessId=1')
      .subscribe(lista => {
        this.usuarios = lista;
        console.log(this.usuarios);
        //this._changeDetector.detectChanges();
      })
  }

  nuevo(): void{
    //this.router.navigateByUrl("/Cobranza/Home");
    //this.router.navigate(['/NuevoRS', resultid]);
    this.router.navigate(['/Seguridad/ConsultaUsuario',0]);
    //this.router.navigateByUrl("/Seguridad/ConsultaUsuario");
  }

  consulta(BussinesID:number , UserID:number): void{

    //this.router.navigateByUrl("/Cobranza/Home");
    //this.router.navigate(['/NuevoRS', resultid]);
    this.router.navigate(['/Seguridad/ConsultaUsuario',UserID]);
    //this.router.navigateByUrl("/Seguridad/ConsultaUsuario");
  }



}

