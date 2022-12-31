import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Entidad } from '../models/entidad';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  private urlEndPoint: string = 'http://localhost:8080/entidades'


  constructor(private http: HttpClient) { }

  getEntidades() : Observable<Entidad[]> {
    return this.http.get<Entidad[]>(this.urlEndPoint);
  }

  create(entidad: Entidad) : Observable<Entidad>{
    return this.http.post(this.urlEndPoint + '/crear', entidad).pipe(
      map( (response:any) => response.entidad as Entidad),
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        if( e.error.mensaje){
        console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  getById(id: number): Observable<Entidad>{
    return this.http.get<Entidad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }



  update(entidad: Entidad): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/editar/${entidad.id_entidad}`, entidad).pipe(
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        if( e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Entidad>{
    return this.http.delete<Entidad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        if( e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }
}
