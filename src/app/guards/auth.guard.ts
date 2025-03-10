import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../app.routes';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthorited = this.authService.isAuthorithed();
    !isAuthorited && this.router.navigate([AppRoutes.INICI]);
    return isAuthorited;
  }
}
