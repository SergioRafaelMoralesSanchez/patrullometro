import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { SelectModule } from 'primeng/select'
import { AccionesService } from '../../services/acciones.service'
import { PatrullasService } from '../../services/patrullas.service'
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import {
  Accion,
  Patrulla,
  PuntosPatrullasDTO
} from '../tabla-puntos/tabla-puntos.model'

@Component({
  selector: 'app-add-puntos-patrulla',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './add-puntos-patrulla.component.html',
  styleUrl: './add-puntos-patrulla.component.css'
})
export class AddPuntosPatrullaComponent implements OnInit {
  patrullas: Patrulla[] = []
  acciones: Accion[] = []

  patrulla: string | undefined
  accion: Accion | undefined
  puntos: number = 1
  numero: number = 1
  descripcionAddicional: string = ''
  constructor (
    private puntosPatrullaService: PuntosPatrullaService,
    private patrullasService: PatrullasService,
    private accionesService: AccionesService
  ) {}

  async ngOnInit (): Promise<void> {
    this.patrullas = await this.patrullasService.getAll()
    this.acciones = await this.accionesService.getAll()
  }

  accionChange (accion: Accion) {
    this.puntos = accion.puntos
  }

  sendPuntosPatrulla () {
    if (this.patrulla && this.accion) {
      const puntosPatrulla: PuntosPatrullasDTO = {
        patrulla: this.patrulla,
        accion: this.accion.id!,
        puntos: this.puntos,
        descripcionAddicional: this.descripcionAddicional,
        fecha: '08/03/2025'
      }

      for (let i = 0; i < this.numero; i++) {
        this.puntosPatrullaService.addDoc(puntosPatrulla)
      }
    }
  }
}
