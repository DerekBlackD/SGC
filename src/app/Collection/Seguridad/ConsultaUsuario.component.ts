import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { CollectionService } from '../../Services/collection.service';


@Component({
  selector: 'ConsultaUsuario',
  templateUrl: 'ConsultaUsuario.component.html'
})
export class ConsultaUsuarioComponent implements OnInit{
  public usuarios2: any[] = [];
  idUsuario:number;
  ls_nombreUsuario:string = "";
  ls_password:string = "";
  ls_fullname:string = "" ;
  ls_email:string = "";
  ls_ultimasesion:string = "";
  ls_mensaje : string = "";
  LS_OPERACION :string = "I";

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'].toString();

    });
  }

  constructor(private router:Router,
              private route: ActivatedRoute,
              private _securityService: SecurityService,
              private _CollectionService: CollectionService
  )
  {
    this.ngOnInit();
    if(this.idUsuario > 0){
      this.loadUsuarios2();
    }
  }



  loadUsuarios2(): void{

    this._securityService.getAllData('api/User?BusinessID=1&ID='+this.idUsuario.toString()+'')
      .subscribe(lista => {
        this.usuarios2 = lista;
        console.log(this.usuarios2);
        //this._changeDetector.detectChanges();

        this.ls_nombreUsuario = this.usuarios2[0].UserName;
        this.ls_password      = this.usuarios2[0].Password;
        this.ls_fullname      = this.usuarios2[0].FullName;
        this.ls_email         = this.usuarios2[0].Email;
        this.ls_ultimasesion  = this.usuarios2[0].DateLastSession;
        this.LS_OPERACION = 'M';
      })

  }

  atras(): void{
    this.router.navigateByUrl('/Seguridad/MantenimientoUsuario');
  }

  grabar(id:string,usuario:string,password:string,nombrecompleto:string,email:string,ultimasesion:string): void{

    this.ls_mensaje = "... esperando respuesta";
    let data2: any = {};

    data2.Operacion = this.LS_OPERACION;
    data2.BusinessID = 1;
    data2.ID = this.idUsuario;
    data2.UserName = usuario;//document.getElementById('usuario').getAttribute('value');//document.querySelector('#usuario').getAttribute('value');
    data2.Password = password;
    data2.FullName = nombrecompleto;
    data2.Email = email;
    data2.DateLastSession = ultimasesion;

    this._CollectionService.postManagementData('api/User', data2)
      .subscribe(res =>{
        /*this.router.navigateByUrl("Cobranza/ResultadoGestion");*/
        console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        this.idUsuario = res[0];
        this.ls_mensaje = res[1];
        this.LS_OPERACION = 'M';
      })
  }

}
