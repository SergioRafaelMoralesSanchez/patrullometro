import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { MenubarModule } from 'primeng/menubar'
import { Nullable } from 'primeng/ts-helpers'
import { AppRoutes } from '../../app.routes'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  imports: [MenubarModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  AppRoutes = AppRoutes
  items: Nullable<MenuItem[]>

  constructor (private readonly authService: AuthService) {}

  ngOnInit () {
    this.setMenuBar()
    this.authService.isAuthorithed$.subscribe(isAuthorithed => {
      isAuthorithed && this.setMenuBar()
    })
  }

  setMenuBar () {
    this.items = [
      {
        label: 'Ranking',
        routerLink: AppRoutes.PATRULLOMETRO
      },
      {
        label: 'Scouters',
        routerLink: AppRoutes.LOGIN
      }
    ]
    if (this.authService.isAuthorithed()) {
      this.items.pop()
      this.items.push(
        {
          label: 'Puntos de patrulla',
          routerLink: AppRoutes.PUNTOS_PATRULLA
        },
        {
          label: 'Acciones',
          routerLink: AppRoutes.ACCIONES
        }
      )
    }
  }
}
