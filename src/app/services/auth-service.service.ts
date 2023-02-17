import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Users } from '@models/users';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url = environment.API_URL;
  public user$ = new BehaviorSubject<Users | null>(null);

  constructor(private httpClient: HttpClient, private tokenSrv: TokenService) {}

  public async login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${this.url}/api/v1/auth/login`, {
          email,
          password,
        })
        .subscribe({
          next: (data: any) => {
            this.tokenSrv.saveToken(data.access_token);
            this.tokenSrv.saveRefreshToken(data.refresh_token)
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${this.url}/api/v1/auth/register`, {
          name,
          email,
          password,
        })
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  public async registerAndLogin(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    return await this.register(name, email, password)
      .then(() => {
        this.login(email, password);
      })
      .catch((error) => {
        return error;
      });
  }

  public async isAvailable(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<{ isAvailable: boolean }>(
          `${this.url}/api/v1/auth/is-available`,
          {
            email,
          }
        )
        .subscribe({
          next: ({ isAvailable }) => {
            resolve(isAvailable);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public async getProfile(): Promise<Users> {
    return new Promise((resolve, reject) => {
      const token = this.tokenSrv.getToken();
      this.httpClient
        .get<Users>(`${this.url}/api/v1/auth/profile`, {
          context: checkToken(),
        })
        .subscribe({
          next: (user) => {
            this.user$.next(user);
            resolve(user);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public logout() {
    this.tokenSrv.removeToken();
  }
}
