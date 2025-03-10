import { Injectable } from '@angular/core';
import {
  Accion,
  Patrulla,
  PuntosPatrullas,
  PuntosPatrullasDTO,
} from '../components/tabla-puntos/tabla-puntos.model';
import { AuthService } from './auth.service';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root',
})
export class PuntosPatrullaService extends BaseService<PuntosPatrullasDTO> {
  constructor(authService: AuthService) {
    super(authService);
    this.collectionName = 'puntos-patrulla';
  }

  async getPuntosPatrullaMapped(
    acciones: Accion[],
    patrullas: Patrulla[]
  ): Promise<PuntosPatrullas[]> {
    const puntosPatrulla = await this.getAll();
    return puntosPatrulla.map((punto) => ({
      accion: acciones.find((accion) => accion.id === punto.accion)!,
      patrulla: patrullas.find((patrulla) => patrulla.id === punto.patrulla)!,
      fecha: punto.fecha,
      puntos: punto.puntos,
      descripcionAddicional: punto.descripcionAddicional,
    }));
  }
}
