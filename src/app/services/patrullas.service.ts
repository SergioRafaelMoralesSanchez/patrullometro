import { Injectable } from '@angular/core';
import { Patrulla } from '../components/tabla-puntos/tabla-puntos.model';

@Injectable({
  providedIn: 'root'
})
export class PatrullasService {

  constructor() { }

  getPatrullas(): Patrulla[] {
    return [
      {
        id: '1',
        name: 'Fenix',
        nombreImagen: 'fenix.jpg',
        numPatrulleros: 6
      },
      {
        id: '2',
        name: 'Dragones',
        nombreImagen: 'dragones.jpg',
        numPatrulleros: 6
      },
      {
        id: '3',
        name: 'Tigres',
        nombreImagen: 'tigres.jpg',
        numPatrulleros: 6
      }
    ]
  }
}
