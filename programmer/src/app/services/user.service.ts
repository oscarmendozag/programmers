import { Usuarios } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from "util";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
}) 
export class UserService {
  private url = 'http://oscarmg-223307.appspot.com';

  constructor(
    private http: HttpClient) { }

  login(correo: String, password: String): Observable<Usuarios> {
    const uri = `${this.url}/login?correo=${correo}&password=${password}`;
    return this.http.get<Usuarios>(uri).pipe(
      tap(_ => console.log('') ),
      catchError(this.handleError<Usuarios>()
    ) 
    ); 
  } 

  getCurrentUser(): Usuarios {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: Usuarios = JSON.parse(user_string);
      return user;
    //} else {
     // return null;
    }
  }
  
  userAuth(){
    return this.login;
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}
}

