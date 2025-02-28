import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RankingComponent } from './components/ranking/ranking.component'
import { TablaPuntosComponent } from './components/tabla-puntos/tabla-puntos.component'
import {
  Accion,
  Patrulla,
  PuntosPatrullas
} from './components/tabla-puntos/tabla-puntos.model'
import { AccionesService } from './services/acciones.service'
import { PatrullasService } from './services/patrullas.service'
import { PuntosPatrullaService } from './services/puntos-patrulla.service'

@Component({
  selector: 'app-root',
  imports: [CommonModule, RankingComponent, TablaPuntosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  puntosPatrullas: PuntosPatrullas[] = []
  patrullas: Patrulla[] = []
  acciones: Accion[] = []

  constructor (
    private puntosPatrullaService: PuntosPatrullaService,
    private patrullasService: PatrullasService,
    private accionesService: AccionesService
  ) {}

  ngOnInit (): void {
    this.patrullas = this.patrullasService.getPatrullas()
    this.acciones = this.accionesService.getAcciones()
    this.puntosPatrullas = this.puntosPatrullaService.getPuntosPatrullaMapped(
      this.acciones,
      this.patrullas
    )
  }
}
