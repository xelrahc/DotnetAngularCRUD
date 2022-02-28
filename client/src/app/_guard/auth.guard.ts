import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {}
  // canActivate(): Observable<boolean> {
  //   return this.userService.currentUser$.pipe(
  //     map((user) => {
  //       if (user) return true;
  //       this.toastr.error("Unauthorize access.")
  //     })
  //   );
  // }

  canActivate() : boolean {
    if (localStorage.getItem('user')) {
        return true;
    }
    this.toastr.error("Unauthorize access.")
    this.router.navigate(['/']);
    return false;
}
}
