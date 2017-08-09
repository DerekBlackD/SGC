import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { CollectionService } from '../../Services/collection.service';


@Component({
  selector: 'ConsultaPerfil',
  templateUrl: 'ConsultaPerfil.component.html'
})
export class ConsultaPerfilComponent implements OnInit{
    public perfiles: any[] = [];
  idPerfil:number;
  ls_nombre:string = "";
  ls_descripcion:string = "";
  li_Estado:number = 1;
  ls_mensaje : string = "";
  LS_OPERACION :string = "I";

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idPerfil = params['id'].toString();

    });
  }

  constructor(private router:Router,
              private route: ActivatedRoute,
              private _securityService: SecurityService,
              private _CollectionService: CollectionService
  )
  {
    this.ngOnInit();
    if(this.idPerfil > 0){
      this.loadRegistros();
    }
  }



  loadRegistros(): void{

    this._securityService.getAllData('api/Menu/Perfil?BusinessID=1&ID='+this.idPerfil.toString()+'&FlgOpciones=0')
      .subscribe(lista => {
        this.perfiles = lista;
        console.log(this.perfiles);

        this.ls_nombre      = this.perfiles[0].Nombre;
        this.ls_descripcion = this.perfiles[0].Description;
        this.li_Estado      = this.perfiles[0].Estado;
        this.LS_OPERACION = 'M';
      })

  }

  atras(): void{
    this.router.navigateByUrl('/Seguridad/MantenimientoPerfil');
  }

  grabar(id:string,nombre:string,descripcion:string): void{

    this.ls_mensaje = "... esperando respuesta";
    let data2: any = {};

    data2.Operacion = this.LS_OPERACION;
    data2.BusinessID = 1;
    data2.ID = this.idPerfil;
    data2.Nombre = nombre;
    data2.Description = descripcion;
    data2.Estado = this.li_Estado;

    this._CollectionService.postManagementData('api/Menu/Perfil', data2)
      .subscribe(res =>{
        console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        this.idPerfil = res[0];
        this.ls_mensaje = res[1];
        this.LS_OPERACION = 'M';
      })
  }
}
