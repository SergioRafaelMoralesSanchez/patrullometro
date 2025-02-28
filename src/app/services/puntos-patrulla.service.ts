import { Injectable } from '@angular/core'
import {
  Accion,
  Patrulla,
  PuntosPatrullas,
  PuntosPatrullasDTO
} from '../components/tabla-puntos/tabla-puntos.model'

@Injectable({
  providedIn: 'root'
})
export class PuntosPatrullaService {
  constructor () {}

  private getPuntosPatrullas (): PuntosPatrullasDTO[] {
    return [
      {
        patrulla: '1',
        accion: '2',
        fecha: new Date()
      },
      {
        patrulla: '2',
        accion: '18',
        fecha: new Date()
      },
      {
        patrulla: '3',
        accion: '3',
        fecha: new Date()
      },
      {
        patrulla: '2',
        accion: '2',
        fecha: new Date()
      },
      {
        patrulla: '3',
        accion: '18',
        fecha: new Date()
      },
      {
        patrulla: '1',
        accion: '3',
        fecha: new Date()
      }
    ]
  }

  getPuntosPatrullaMapped (
    acciones: Accion[],
    patrullas: Patrulla[]
  ): PuntosPatrullas[] {
    return this.getPuntosPatrullas().map(punto => ({
      accion: acciones.find(accion => accion.id === punto.accion)!,
      patrulla: patrullas.find(patrulla => patrulla.id === punto.patrulla)!,
      fecha: punto.fecha
    }))
  }
}
