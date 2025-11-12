import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);


  public isAuthenticated$ = this._isAuthenticated.asObservable();

  private httpUrl = 'http://localhost:3001';




  constructor(private router: Router, private http:HttpClient) {


    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this._isAuthenticated.next(isLoggedIn);
  }

  public login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '123456') {


      localStorage.setItem('isLoggedIn', 'true');


      this._isAuthenticated.next(true);


      this.router.navigate(['/home']);
      return true;

    } else {

      this.loginError = true;
      return false;
    }
  }



  public logout(): void {

    localStorage.removeItem('isLoggedIn');

    this._isAuthenticated.next(false);


    this.router.navigate(['/login']);
  }



  public isLoggedIn(): boolean {
    return this._isAuthenticated.getValue();
  }


  public loginError: boolean = false;
}
