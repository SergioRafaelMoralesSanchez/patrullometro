import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { SelectChangeEvent, SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import { Accion, Patrulla, PuntosPatrullas } from './tabla-puntos.model'

@Component({
  selector: 'app-tabla-puntos',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, ButtonModule, TableModule],
  templateUrl: './tabla-puntos.component.html',
  styleUrl: './tabla-puntos.component.css'
})
export class TablaPuntosComponent {
  private _puntosPatrullasRaw: PuntosPatrullas[] = []

  @Input() patrullas: Patrulla[] = []
  @Input() acciones: Accion[] = []
  @Input() hasAcciones: boolean = false
  @Input() set puntosPatrullasRaw (puntosPatrullas: PuntosPatrullas[]) {
    this._puntosPatrullasRaw = [...puntosPatrullas]
    this.puntosPatrullas = [...puntosPatrullas]
    this.onPatrullaChange()
    this.onAccionChange()
  }

  patrulla: string | undefined
  accion: string | undefined
  puntosPatrullas: PuntosPatrullas[] = []

  constructor (
    private readonly puntosPatrullaService: PuntosPatrullaService,
    private readonly messageService: MessageService
  ) {}

  onPatrullaChange (change?: SelectChangeEvent) {
    if (!this.accion) {
      this.puntosPatrullas = [...this._puntosPatrullasRaw]
    }
    if (change?.value) {
      this.patrulla = change.value
    }
    if (this.patrulla) {
      this.puntosPatrullas = this.puntosPatrullas.filter(
        puntos => puntos.patrulla.id === this.patrulla
      )
    }
  }

  onAccionChange (change?: SelectChangeEvent) {
    if (!this.patrulla) {
      this.puntosPatrullas = [...this._puntosPatrullasRaw]
    }
    if (change?.value) {
      this.accion = change.value
    }
    if (this.accion) {
      this.puntosPatrullas = this.puntosPatrullas.filter(
        puntos => puntos.accion.id === this.accion
      )
    }
  }

  clearFilters () {
    this.patrulla = undefined
    this.accion = undefined
    this.puntosPatrullas = [...this._puntosPatrullasRaw]
  }

  formatDescripcion (punto: PuntosPatrullas) {
    return `${punto.accion.descripcion} ${
      punto.descripcionAddicional ? `(${punto.descripcionAddicional})` : ''
    }`
  }

  async deletePunto (punto: PuntosPatrullas) {
    await this.puntosPatrullaService.deleteDoc(punto.id)
    this.puntosPatrullas = this.puntosPatrullas.filter(
      puntos => puntos.id !== punto.id
    )
    this.messageService.add({
      severity: 'warn',
      summary: `Puntos eliminados: ${punto.patrulla.name} ${punto.accion.descripcion}`
    })
  }
}
