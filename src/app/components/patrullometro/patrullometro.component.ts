import { Component, OnInit } from '@angular/core'
import { AccionesService } from '../../services/acciones.service'
import { PatrullasService } from '../../services/patrullas.service'
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import { RankingComponent } from '../ranking/ranking.component'
import { SpinnerComponent } from '../spinner/spinner.component'
import { TablaPuntosComponent } from '../tabla-puntos/tabla-puntos.component'
import {
  Accion,
  Patrulla,
  PuntosPatrullas
} from '../tabla-puntos/tabla-puntos.model'

@Component({
  selector: 'app-patrullometro',
  imports: [RankingComponent, TablaPuntosComponent, SpinnerComponent],
  templateUrl: './patrullometro.component.html'
})
export class PatrullometroComponent implements OnInit {
  puntosPatrullas: PuntosPatrullas[] = []
  patrullas: Patrulla[] = []
  acciones: Accion[] = []

  constructor (
    private readonly puntosPatrullaService: PuntosPatrullaService,
    private readonly patrullasService: PatrullasService,
    private readonly accionesService: AccionesService
  ) {}

  ngOnInit (): void {
    this.getData()
  }

  async getData () {
    this.patrullas = await this.patrullasService.getAll()
    this.acciones = await this.accionesService.getAll()
    this.puntosPatrullas =
      await this.puntosPatrullaService.getPuntosPatrullaMapped(
        this.acciones,
        this.patrullas
      )
    this.filterAcciones()
  }

  filterAcciones () {
    this.acciones = this.acciones
      .filter(accion => {
        return this.puntosPatrullas.find(punto => punto.accion.id === accion.id)
      })
      .sort((a, b) => a.descripcion.localeCompare(b.descripcion))
  }
}
