import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contribuyente } from 'src/app/models/contribuyente';
import { Documento } from 'src/app/models/documento';
import { Entidad } from 'src/app/models/entidad';
import { ContribuyenteService } from 'src/app/services/contribuyente.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { EntidadesService } from 'src/app/services/entidades.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public entidad: Entidad = new Entidad()
  public documentos: Documento[]
  public contribuyentes: Contribuyente[]
  public titulo: string = "Crear Entidad"
  public errores: string[]

  constructor(private entidadService: EntidadesService,
    private documentoService: DocumentoService,
    private contribuyenteService: ContribuyenteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id_entidad']
      if(id){
        this.entidadService.getById(id).subscribe(
          entidad => this.entidad = entidad
        )
      }
    });

    this.contribuyenteService.getAll().subscribe( response => {
      this.contribuyentes = response._embedded.contribuyentes
      console.log(response)
    })

    this.documentoService.getAll().subscribe( response => {
      this.documentos = response._embedded.documentoes
      console.log(response)
    })

    console.log(this.contribuyentes)
    console.log(this.documentos)
  }

  public create(): void{
    this.entidadService.create(this.entidad)
      .subscribe(
        entidad => {
          this.router.navigate(['/entidades'])
          alert(`Entidad ${entidad.nombre_comercial} ha sido creado con éxito!`)
        },
        err => {
          this.errores = err.error.errors as string[]
          console.error('codigo del error desde el backend: ' + err.status)
          console.error(err.error.errors)
        }
    )
  }

  public update(): void{
    this.entidadService.update(this.entidad)
      .subscribe(
        json =>{
          this.router.navigate(['/entidades'])
          alert(`Entidad ${json.entidad.nombre_comercial} ha sido actualizado con éxito`)
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error('codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    )
  }

  compararDocumentos(o1: Documento, o2: Documento): boolean{
    if( o1 === undefined && o2 === undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined ? false : o1.id_tipo_documento===o2.id_tipo_documento;

  }

  compararContribuyentes(o1: Contribuyente, o2: Contribuyente): boolean{
    if( o1 === undefined && o2 === undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined ? false : o1.id_tipo_contribuyente===o2.id_tipo_contribuyente;

  }

}
