import { Routes } from '@angular/router'
import { AddAccionComponent } from './components/add-accion/add-accion.component'
import { AddPuntosPatrullaComponent } from './components/add-puntos-patrulla/add-puntos-patrulla.component'
import { LoginComponent } from './components/login/login.component'
import { PatrullometroComponent } from './components/patrullometro/patrullometro.component'
import { AuthGuard } from './guards/auth.guard'

export enum AppRoutes {
  INICI = '',
  PATRULLOMETRO = 'patrullometro',
  PUNTOS_PATRULLA = 'puntos',
  ACCIONES = 'acciones',
  LOGIN = 'login'
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.PATRULLOMETRO,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.LOGIN,
    component: LoginComponent
  },
  {
    path: AppRoutes.PATRULLOMETRO,
    component: PatrullometroComponent
  },
  {
    path: AppRoutes.PUNTOS_PATRULLA,
    component: AddPuntosPatrullaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.ACCIONES,
    component: AddAccionComponent,
    canActivate: [AuthGuard]
  }
]
