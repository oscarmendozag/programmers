import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Usuarios } from '../interfaces/user';
import { Locales } from './../interfaces/locales';
import { LocalesService } from '../services/locales.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private RegisterService: RegisterService, private LocalesService: LocalesService, private router: Router, private route: ActivatedRoute) {
  }
  users: any;
  locals: any;
  us: Usuarios;
  local: Locales;
   
  ngOnInit() {
    this.getLocal();
    this.us = this.RegisterService.getCurrentUser();
    console.log(localStorage.getItem("currentUser"));
  } 

  get() {
    this.RegisterService.get().subscribe(res => {
      this.users = res;
      //console.log(res);
    });
  }
  delete(id){
    this.RegisterService.deleteUser(id).subscribe(res => {
      console.log(res);
    });
  } 
///////////////////////////////////Metodos Locales//////////////////////////////////////
  registerLocal(nombre, propietario, direccion, cp, telefono, descripcion) {
    this.LocalesService.registro(nombre, propietario, direccion, cp, telefono, descripcion)
    .subscribe(local => {
      console.log(local);
    });
  }

  getLocal() {
    this.LocalesService.getlocal().subscribe(res => {
      this.locals = res;
      //console.log(res);
    }); 
  }

  deleteLocal(id){
    this.LocalesService.deletelocal(id).subscribe(res => {
      console.log(res);
    });
  } 

  
}
