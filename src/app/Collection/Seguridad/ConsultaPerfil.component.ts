import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../Services/security.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { CollectionService } from '../../Services/collection.service';


@Component({
  selector: 'ConsultaPerfil',
  templateUrl: 'ConsultaPerfil.component.html',
  styleUrls: ['mantenimiento.css']
})
export class ConsultaPerfilComponent implements OnInit{
    public perfiles: any[] = [];
  idPerfil:number;
  ls_nombre:string = "";
  ls_descripcion:string = "";
  li_Estado:number = 1;
  ls_mensaje : string = "";
  LS_OPERACION :string = "I";

  public opcionesmaestro: any[] = [];//[{"Id_Modulo":1,"nivel":1,"Id_Opcion":100,"Id_SubMenu":0,"Id_SubMenuItem":0,"FlgActivo":1,"Url":"#","BusinessID":1,"Descripcion":"","NombreOpcion":"Cobranza"},{"Id_Modulo":1,"nivel":2,"Id_Opcion":110,"Id_SubMenu":1,"Id_SubMenuItem":0,"FlgActivo":1,"Url":"/Cobranza/GestionGeneral","BusinessID":1,"Descripcion":"","NombreOpcion":"Getión Telefónica"},{"Id_Modulo":1,"nivel":2,"Id_Opcion":120,"Id_SubMenu":2,"Id_SubMenuItem":0,"FlgActivo":1,"Url":"ColAddressMngt","BusinessID":1,"Descripcion":"","NombreOpcion":"Gestión de Campo"}];

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
    this.loadOpciones();
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

  loadOpciones(): void{

    this._securityService.getAllData('api/Menu/PerfilOpcion?BusinessID=1&ID='+this.idPerfil.toString()+'')
      .subscribe(lista => {
        this.opcionesmaestro = lista;
        console.log(this.opcionesmaestro);
      })

  }

  atras(): void{
    this.router.navigateByUrl('/Seguridad/MantenimientoPerfil');
  }

  grabar(id:string,nombre:string,descripcion:string): void{

    this.ls_mensaje = "... esperando respuesta";
    let data2: any = {};
    let options: any = [];
    

    data2.Operacion = this.LS_OPERACION;
    data2.BusinessID = 1;
    data2.ID = this.idPerfil;
    data2.Nombre = nombre;
    data2.Description = descripcion;
    data2.Estado = this.li_Estado;

    for (var ele in this.opcionesmaestro) {
    //1era iteración: ele === 1
    //2da iteración: ele === 2
    //demas iteraciones: metodos y propiedades del array.
      if (this.opcionesmaestro[ele].FlgActivo == 1 && this.opcionesmaestro[ele].Url != "#"){
        let opc: any = {};
        opc.OptionID = this.opcionesmaestro[ele].Id_Opcion;
        options.push(opc);
      }
    }

    data2.Option = options;

    this._CollectionService.postManagementData('api/Menu/Perfil', data2)
      .subscribe(res =>{
        console.log('ID: ' + res[0] + ' MSG: ' + res[1]);
        this.idPerfil = res[0];
        this.ls_mensaje = res[1];
        this.LS_OPERACION = 'M';
      })
  }

  changeoption(index:number):void{
    if (this.opcionesmaestro[index].FlgActivo == 1){
        this.opcionesmaestro[index].FlgActivo = 0;
    }else{
        this.opcionesmaestro[index].FlgActivo = 1;
    }
    
  }
}
