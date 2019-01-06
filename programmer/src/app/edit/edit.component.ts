import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Usuarios } from '../interfaces/user';
import { Locales } from './../interfaces/locales';
import { LocalesService } from '../services/locales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private RegisterService: RegisterService, private LocalesService: LocalesService, private router: Router, private route: ActivatedRoute) { }
  us: Usuarios;
  local: Locales;
  locals: any;

  ngOnInit() {
    this.getLocal();
    this.us = this.RegisterService.getCurrentUser();
    console.log(localStorage.getItem("currentUser"));

   //console.log(this.route.snapshot.paramMap.get('id'));
   let id = this.route.snapshot.paramMap.get('id');
   this.local = {
    'id': id,
   }
  }
  

  update(nombre, propietario, direccion, cp, telefono, descripcion, createdAt, updateAt ) {
    this.LocalesService.update(nombre, propietario, direccion, cp, telefono, descripcion, createdAt, updateAt, this.route.snapshot.params['id'])
    .subscribe(local => {
      this.router.navigate(['/home']);
      console.log('Modificado', local.descripcion)
    }); 
  }

  getLocal() {
    this.LocalesService.getlocal().subscribe(res => {
      this.locals = res;
      //console.log(res);
    }); 
  }
  

}
