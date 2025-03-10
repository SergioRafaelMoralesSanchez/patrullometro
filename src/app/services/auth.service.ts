import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { BehaviorSubject } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { LocalUser } from '../models/auth/local-user.interface';

@Injectable()
export class AuthService {
  user: Nullable<LocalUser>;
  isAuthorithed$ = new BehaviorSubject<boolean>(false);
  constructor(private readonly router: Router) {
    this.user = this.getCurrentUser();
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const user = result.user;
          localStorage.setItem(
            'scouter-user',
            JSON.stringify({
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
          this.router.navigateByUrl('encargos');
        }
      })
      .catch((error) => {
        console.error(
          '🚀 ~ file: auth.service.ts:24 ~ AuthService ~ .then ~ error:',
          error
        );
      });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('scouter-user');
        // Sign-out successful.
      })
      .catch((error) => {
        console.error(
          '🚀 ~ file: auth.service.ts:48 ~ AuthService ~ signOut ~ error:',
          error
        );
        // An error happened.
      });
  }

  getCurrentUser(): Nullable<LocalUser> {
    const user = localStorage.getItem('scouter-user');
    if (user) {
      return JSON.parse(user) as LocalUser;
    }
    return null;
  }

  isAuthorithed(): boolean {
    return this.getCurrentUser() !== null;
  }

  signInWithEmailAndPassword(
    email: string,
    password: string,
    messageService: MessageService
  ) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          const user = userCredential.user;
          localStorage.setItem(
            'scouter-user',
            JSON.stringify({
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
          messageService.add({
            severity: 'success',
            summary: '¡Bienvenido Scouter de Orión!',
          });
          this.isAuthorithed$.next(true);
          this.router.navigate([AppRoutes.INICI]);
        }
      })
      .catch(() => {
        messageService.add({
          severity: 'error',
          summary: 'Email o contraseña incorrectos',
        });
      });
  }
}
