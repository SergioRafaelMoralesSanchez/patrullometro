export interface PuntosPatrullasDTO {
  id?: string
  patrulla: string
  accion: string
  puntos: number
  descripcionAddicional?: string
  fecha: string
}
export interface PuntosPatrullas {
  id: string
  patrulla: Patrulla
  accion: Accion
  puntos: number
  descripcionAddicional?: string
  fecha: string
}

export interface Patrulla {
  id: string
  name: string
  nombreImagen: string
}

export interface Accion {
  id?: string
  descripcion: string
  puntos: number
  canDelete?: boolean
}
