import { Component, OnInit } from '@angular/core'
import { AccionesService } from '../../services/acciones.service'
import { PatrullasService } from '../../services/patrullas.service'
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import { RankingComponent } from '../ranking/ranking.component'
import { TablaPuntosComponent } from '../tabla-puntos/tabla-puntos.component'
import {
  Accion,
  Patrulla,
  PuntosPatrullas
} from '../tabla-puntos/tabla-puntos.model'

@Component({
  selector: 'app-patrullometro',
  imports: [RankingComponent, TablaPuntosComponent],
  templateUrl: './patrullometro.component.html',
})
export class PatrullometroComponent implements OnInit {
  puntosPatrullas: PuntosPatrullas[] = []
  patrullas: Patrulla[] = []
  acciones: Accion[] = []

  constructor (
    private puntosPatrullaService: PuntosPatrullaService,
    private patrullasService: PatrullasService,
    private accionesService: AccionesService
  ) {}

  async ngOnInit (): Promise<void> {
    this.patrullas = await this.patrullasService.getAll()
    this.acciones = await this.accionesService.getAll()
    this.puntosPatrullas =
      await this.puntosPatrullaService.getPuntosPatrullaMapped(
        this.acciones,
        this.patrullas
      )
  }
}
