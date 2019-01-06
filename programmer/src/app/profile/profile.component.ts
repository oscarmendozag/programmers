import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private RegisterService: RegisterService, private route: ActivatedRoute, private router: Router) { }
  users: any;
  us: Usuarios;

  ngOnInit() {
    this.get();
    this.us = this.RegisterService.getCurrentUser();
    console.log(localStorage.getItem("currentUser"));
    
  }

  delete(id) {
    this.RegisterService.deleteUser(id).subscribe();
      console.log('Deleted', id );
      this.router.navigate(['/login']);
  }

  register(nombre, apaterno, correo, password) {
    this.RegisterService.registro(nombre, apaterno, correo, password)
    .subscribe(user => {
      console.log(user);
    });
  }

  /*update(nombre, apaterno, correo, password) {
    this.route.params.subscribe(params => {
    this.RegisterService.update(nombre, apaterno, correo, password, params['id']);
    console.log('Modificado', params)
    });
  }*/
  update(nombre, apaterno, correo, password) {
    this.RegisterService.update(nombre, apaterno, correo, password, this.route.snapshot.params['id'])
    .subscribe(user => {
      this.router.navigate(['/login']);
      console.log('Modificado', user.id)
    });
  }

  get() {
    this.RegisterService.get().subscribe(res => {
      this.users = res;
      //console.log(res);
    });
  }
  cerrarsesion(){
    this.router.navigate(['/login']);
    console.log('adios');
  }

}
