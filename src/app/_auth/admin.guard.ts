// src/app/auth/admin.guard.ts
import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from './auth0.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from '@angular/router';
@Injectable()
export class AdminGuard implements CanActivate {
  role: string;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ) {
    if (this.auth.isAuthenticated$) {
      this.auth.getUser().subscribe(user => {
        console.log(user['https://dfzservice.no/roles'])
        this.role = user['https://dfzservice.no/roles'][0]
        //console.log(this.role)
        // Possible to intercept and modify(?) POST requests still handled by API
        if (this.role === "admin") {
          // this.router.navigate([state.url]);
          return true
        } else {
          this.router.navigate(['/401']);

        }
      })
      return true;

    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
