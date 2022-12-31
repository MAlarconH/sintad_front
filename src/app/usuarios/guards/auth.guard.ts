import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.authService.logout();
          this.router.navigate(['/entidades'])
          return false;
        }
        return true;
      }
      this.router.navigate(['/entidades'])
      return false;
  }

  isTokenExpirado(): boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosPayload(token);
    let now = new Date().getTime() / 1000;

    if(payload.exp < now){
      return true;
    }
    return false;
  }

}
