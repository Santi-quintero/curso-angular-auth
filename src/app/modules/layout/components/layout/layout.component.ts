import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '@services/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  constructor(private authSrv: AuthServiceService) {}

  async ngOnInit(): Promise<any> {
    await this.authSrv.getProfile();
  }
}
