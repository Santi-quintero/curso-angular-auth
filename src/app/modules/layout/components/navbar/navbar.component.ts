import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { Users } from '@models/users';
import { AuthServiceService } from '@services/auth-service.service';
import { TokenService } from '@services/token.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  public User$ = this.authSrv.user$;

  constructor(
    private authSrv: AuthServiceService,
    private token: TokenService,
    private router: Router,
  ) {
  }

  public logout() {
    this.authSrv.logout();
    this.router.navigateByUrl('/login');
  }

  public prueba(){
    console.log(this.token.isValidToken());
  }
}
