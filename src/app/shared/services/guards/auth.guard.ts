import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private router: Router
    ) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let pr =window.location.href;//next['_routerState']['url'];// state.url;

        const _uInfo=localStorage.getItem("authorization");
        if (_uInfo) {
           
            return true;
          }
        // this.router.navigateByUrl('login');
        this.router.navigate(['login']);
        return false;
      

      }
    }