import { Component, OnInit } from '@angular/core';
import { Entidad } from '../models/entidad';
import { EntidadesService } from '../services/entidades.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  entidades: Entidad[] = []

  constructor(private entidadService: EntidadesService,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.entidadService.getEntidades().subscribe(
      entidades => {
        this.entidades = entidades
        console.log(this.entidades)
      })
  }

  delete(entidad: Entidad): void{

    this.entidadService.delete(entidad.id_entidad).subscribe(
      _response => {
        this.entidades = this.entidades.filter(ent => ent !== entidad)
      }
    )
  }

}
