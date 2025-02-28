export interface PuntosPatrullasDTO {
  patrulla: string
  accion: string
  fecha: Date
}
export interface PuntosPatrullas {
  patrulla: Patrulla
  accion: Accion
  fecha: Date
}

export interface Patrulla {
  id: string
  name: string
  numPatrulleros: number
  nombreImagen: string
}

export interface Accion {
  id: string
  descripcion: string
  tooltip?: string
  categoria?: string
  puntos: number
}
