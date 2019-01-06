import { Injectable } from '@angular/core';
import { Locales } from './../interfaces/locales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  constructor(private http: HttpClient) { }
  
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registro(nombre: string, propietario: string, direccion: string, cp: string, telefono: string, descripcion: string) {
    const url = 'http://oscarmg-223307.appspot.com/locales/';
    const obj = { 
      nombre: nombre,
      propietario: propietario,
      direccion: direccion,
      cp: cp,
      telefono: telefono,
      descripcion: descripcion
    };
    return this
      .http
      .post<Locales>(url, obj, { headers: this.headers } )
      .pipe(map(res=> res, 
        console.log('Local registrado')));
  }

  getlocal() {
    const uri = 'http://oscarmg-223307.appspot.com/locales/';
    return this
      .http
      .get<Locales>(uri)
      .pipe(tap(_ => console.log('') )
    );
  }

  deletelocal(id: string) {
    const uri = 'http://oscarmg-223307.appspot.com/locales/' + id;
        return this
            .http
            .delete<Locales>(uri, { headers: this.headers })
            .pipe(map(res => {
              console.log('Local Eliminado', id)
              return res;
            }));
  }

  update( id, nombre, propietario, direccion, cp, telefono, descripcion, createdAt, updateAt ) {
    const uri = 'http://oscarmg-223307.appspot.com/locales/' + id;
    const obj = {
      id: id,
      nombre: nombre,
      propietario: propietario,
      direccion: direccion,
      cp: cp,
      telefono: telefono,
      descripcion: descripcion,
      createdAt: createdAt,
      updateAt: updateAt
    };
    return this
      .http
      .put<Locales>(uri, obj, { headers: this.headers })
      .pipe(map(res => {
        console.log('Ya modifica', descripcion)
        return res;
      }));  
  }

  getCurrentLocal(): Locales{
    let local_string = localStorage.getItem("currentLocal");
    if(!isNullOrUndefined(local_string)){
      let local: Locales=JSON.parse(local_string);
      return local;
    }
    
  }

  
}
