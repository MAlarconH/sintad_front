import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contribuyente } from '../models/contribuyente';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  private urlEndPoint: string = 'http://localhost:8080/contribuyentes'

  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

}
