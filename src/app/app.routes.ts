import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { PatrullometroComponent } from './components/patrullometro/patrullometro.component'
import { AddPuntosPatrullaComponent } from './components/add-puntos-patrulla/add-puntos-patrulla.component'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: PatrullometroComponent
  },
  {
    path: 'add/puntos',
    component: AddPuntosPatrullaComponent
  },
  { path: '**', redirectTo: '' }
]
