import { Component, OnInit } from '@angular/core';
import { Users } from '@models/users';
import { AuthServiceService } from '@services/auth-service.service';
import { UsersService } from '@services/users.service';

import { DataSourceUser } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  public user: Users | null = null;

  constructor(
    private userSrv: UsersService,
    private authSrv: AuthServiceService
  ) {
    this.loadData();
  }
  ngOnInit(): void {
    this.prueba();
  }

  public async loadData() {
    const response: Users[] = await this.userSrv.getUsers();
    this.dataSource.init(response);
  }
  public async prueba() {
    this.authSrv.user$.subscribe((response) => {
      this.user = response;
    });
  }
}
