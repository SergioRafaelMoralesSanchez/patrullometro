import { Injectable } from '@angular/core'
import { Accion, Patrulla } from '../components/tabla-puntos/tabla-puntos.model'
import { AuthService } from './auth.service'
import { BaseService } from './base-service.service'

@Injectable({
  providedIn: 'root'
})
export class AccionesService extends BaseService<Accion> {
  constructor (authService: AuthService) {
    super(authService)
    this.collectionName = 'acciones'
  }
}
