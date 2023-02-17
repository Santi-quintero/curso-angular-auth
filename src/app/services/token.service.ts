import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  public getToken() {
    const token = getCookie('token');
    return token;
  }

  public removeToken() {
    removeCookie('token');
  }
  public saveRefreshToken(token: string) {
    setCookie('refresh-token', token, { expires: 365, path: '/' });
  }

  public getRefreshToken() {
    const token = getCookie('refresh-token');
    return token;
  }

  public removeRefreshToken() {
    removeCookie('refresh-token');
  }

  public isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decoteToken = jwt_decode<JwtPayload>(token);
    if (decoteToken && decoteToken?.exp) {
      let tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decoteToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  public isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decoteToken = jwt_decode<JwtPayload>(token);
    if (decoteToken && decoteToken?.exp) {
      let tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decoteToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
