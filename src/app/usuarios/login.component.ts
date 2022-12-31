import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {AuthService} from './auth.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor inicie sesión!"
  usuario: Usuario


  constructor(public authService: AuthService,
     private router: Router
    ) {
      this.usuario = new Usuario()
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      alert(`Hola ${this.authService.usuario.username} ya estas autenticado!`)
      this.router.navigate(['/entidades'])
    }
  }

  login(): void{
    console.log(this.usuario);

    if(this.usuario.username == null || this.usuario.password == null || this.usuario == undefined){
      alert('Username o password vacías!')
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response);
        // let jsonPayload = JSON.parse(atob(response.access_token.split(".")[1]));
        // console.log(jsonPayload);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;

        this.router.navigate(['/entidades']);
        alert(`Hola ${usuario.username}, has iniciado sesión con éxito`)
      },
      err=>{
        if(err.status == 401 || err.status == 400){
          alert('Usuario o clave incorrectas!');
        }
      }
    )
  }

}
