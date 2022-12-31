import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../models/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private urlEndPoint: string = 'http://localhost:8080/documentos'

  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

}
