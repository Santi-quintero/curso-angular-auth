import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,

} from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenSrv: TokenService, private router: Router) {}
  public canActivate(): boolean {
    const isValidtoken = this.tokenSrv.isValidRefreshToken();
    if (!isValidtoken) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
