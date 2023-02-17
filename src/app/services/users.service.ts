import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { Users } from '@models/users';
import { HttpClient } from '@angular/common/http';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = environment.API_URL;

  constructor(private tokenSrv: TokenService, private httpClient: HttpClient) {}

  public async getUsers(): Promise<Users[]> {
    return new Promise((resolve, reject) => {
      const token = this.tokenSrv.getToken();
      this.httpClient
        .get<Users[]>(`${this.url}/api/v1/users`, {
          context: checkToken(),
        })
        .subscribe({
          next: (users) => {
            resolve(users);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
