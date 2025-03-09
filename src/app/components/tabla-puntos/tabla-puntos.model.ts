export interface PuntosPatrullasDTO {
  id?: string
  patrulla: string
  accion: string
  fecha: string
}
export interface PuntosPatrullas {
  patrulla: Patrulla
  accion: Accion
  fecha: string
}

export interface Patrulla {
  id: string
  name: string
  nombreImagen: string
}

export interface Accion {
  id: string
  descripcion: string
  tooltip?: string
  categoria?: string
  puntos: number
}
