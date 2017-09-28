import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { CollectionService } from '../../Services/collection.service';


@Component({
  selector: 'ConsultaUsuario',
  templateUrl: 'ConsultaUsuario.component.html',
  styleUrls: ['mantenimiento.css']
})
export class ConsultaUsuarioComponent implements OnInit{
  public usuarios2: any[] = [];
  public perfiles: any[] = [];//[{"ID":0,"Nombre":""}];
  public perfilesmaestro: any[] = [];//[{"ID":0,"Nombre":""}];
  idUsuario:number;
  ls_nombreUsuario:string = "";
  ls_password:string = "";
  ls_fullname:string = "" ;
  ls_email:string = "";
  ls_ultimasesion:string = "";
  ls_mensaje : string = "";
  LS_OPERACION :string = "I";

  ls_validacionPerfil : string="";

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
        this.perfiles         = this.usuarios2[0].Profiles;
        this.LS_OPERACION = 'M';
      })

  }

  atras(): void{
    this.router.navigateByUrl('/Seguridad/MantenimientoUsuario');
  }

  grabar(id:string,usuario:string,password:string,passwordconfirm:string,nombrecompleto:string,email:string,ultimasesion:string): void{

    if(password != passwordconfirm){
      this.ls_mensaje = "¡Confirme el password correctamente!.";
      return
    }

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
    data2.Profiles = this.perfiles;

    this._CollectionService.postManagementData('api/User', data2)
      .subscribe(res =>{
        /*this.router.navigateByUrl("Cobranza/ResultadoGestion");*/
        console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        this.idUsuario = res[0];
        this.ls_mensaje = res[1];
        this.LS_OPERACION = 'M';
      })
  }

  eliminarPerfil(a_index:number){
    this.perfiles.splice(a_index,1);

  }

  agregarPerfil(id:number,nombrePerfil:string){

    for (var ele in this.perfiles) {
    //1era iteración: ele === 1
    //2da iteración: ele === 2
    //demas iteraciones: metodos y propiedades del array.
      if (this.perfiles[ele].ID == id){
        this.ls_validacionPerfil = "Perfil ya se ha ingresado";
        return
      }
    }

    let obj_perfil: any = {};
    obj_perfil.BusinessID = 1;
    obj_perfil.ID = id;
    obj_perfil.Nombre = nombrePerfil;
    this.perfiles.push(obj_perfil);

    document.getElementById("btn_cerrarmodal").click();
    //var jQuery:any;
    //jQuery("#myModal").modal("hide");
    //jQuery("#modalperfil").modal("hide");
    //@ViewChild('closeBtn').nativeElement.
  }

  listarPerfiles(){
    this._securityService.getAllData('api/Menu/Perfil?BusinessID=1&ID=0&FlgOpciones=0')
      .subscribe(lista => {
        this.perfilesmaestro = lista;
        console.log(this.perfilesmaestro);
        //this._changeDetector.detectChanges();
      })
  }

}
