import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/entidades']);
        swal.fire('Acceso Denegado',`Hola usuario usted no tienes acceso a este recurso`,'warning')
        return false;
      }

      let role = next.data['role'] as string;

      if(this.authService.hasrole(role)){
        return true;
      }

      swal.fire('Acceso Denegado',`Hola ${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
      this.router.navigate(['/entidades']);
      return false;
  }
}
