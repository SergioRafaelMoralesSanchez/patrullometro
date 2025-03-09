import { Injectable } from '@angular/core'
import { Patrulla } from '../components/tabla-puntos/tabla-puntos.model'
import { AuthService } from './auth.service'
import { BaseService } from './base-service.service'

@Injectable({
  providedIn: 'root'
})
export class PatrullasService extends BaseService<Patrulla> {
  constructor (authService: AuthService) {
    super(authService)
    this.collectionName = 'patrullas'
  }
}
