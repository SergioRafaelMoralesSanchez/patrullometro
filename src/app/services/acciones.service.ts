import { Injectable } from '@angular/core'
import { Accion } from '../components/tabla-puntos/tabla-puntos.model'

@Injectable({
  providedIn: 'root'
})
export class AccionesService {
  constructor () {}

  getAcciones (): Accion[] {
    return [
      {
        descripcion: 'Por patrullero',
        puntos: 1,
        id: '1'
      },
      {
        descripcion: 'Por patrulla completa',
        puntos: 2,
        id: '2'
      },
      {
        descripcion: 'Uniforme completo Acampada',
        puntos: 3,
        id: '3'
      },
      {
        descripcion: 'Utensilios completos Acampada ',
        puntos: 3,
        id: '4'
      },
      {
        descripcion: 'Camisa, cuaderno de ruta y boligrafo ',
        puntos: 1,
        id: '5'
      },
      {
        descripcion: 'Voluntarios para acciones',
        puntos: 1,
        id: '6'
      },
      {
        descripcion: 'Actos de proactividad',
        puntos: 1,
        id: '7'
      },
      {
        descripcion: 'Traer amigos a la actividad',
        puntos: 5,
        id: '8'
      },
      {
        descripcion: 'Entrada de nuevos troperos buscados por la patrulla	',
        puntos: 2,
        id: '9'
      },
      {
        descripcion: 'Especialidades troncales	',
        puntos: 1,
        id: '10'
      },
      {
        descripcion: 'Especialidades normales',
        puntos: 5,
        id: '11'
      },
      {
        descripcion: 'Por actividad propuesta para las reuniones o acampadas',
        puntos: 5,
        id: '12'
      },
      { descripcion: 'Revision de parcela Mal	', puntos: 1, id: '13' },
      {
        descripcion: 'Revision de parcela Medio',
        puntos: 1,
        id: '14'
      },
      {
        descripcion: 'Revision de parcela Bien',
        puntos: 2,
        id: '15'
      },
      {
        descripcion: 'Patrulla mas rapida en llegar a la formacion',
        puntos: 1,
        id: '16'
      },
      {
        descripcion:
          'El mejor grito de cada acto comunitario y que sea entendible',
        puntos: 2,
        id: '17'
      },
      {
        descripcion:
          'La patrulla que monte la zona de acampada antes y todo este correcto',
        puntos: 5,
        id: '18'
      },
      {
        descripcion: 'Mejor evaluacion por patrulla',
        puntos: 1,
        id: '19'
      },
    ]
  }
}
