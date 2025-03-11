import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Accion, Patrulla, PuntosPatrullas } from './tabla-puntos.model';

@Component({
  selector: 'app-tabla-puntos',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, ButtonModule, TableModule],
  templateUrl: './tabla-puntos.component.html',
  styleUrl: './tabla-puntos.component.css',
})
export class TablaPuntosComponent {
  private _puntosPatrullasRaw: PuntosPatrullas[] = [];

  @Input() patrullas: Patrulla[] = [];
  @Input() acciones: Accion[] = [];
  @Input() set puntosPatrullasRaw(puntosPatrullas: PuntosPatrullas[]) {
    this._puntosPatrullasRaw = [...puntosPatrullas];
    this.puntosPatrullas = [...puntosPatrullas];
  }

  patrulla: Patrulla | undefined;
  accion: Accion | undefined;
  puntosPatrullas: PuntosPatrullas[] = [];

  onPatrullaChange(change: SelectChangeEvent) {
    if (!this.accion) {
      this.puntosPatrullas = [...this._puntosPatrullasRaw];
    }
    this.puntosPatrullas = this.puntosPatrullas.filter(
      (puntos) => puntos.patrulla.id === change.value
    );
  }

  onAccionChange(change: SelectChangeEvent) {
    if (!this.patrulla) {
      this.puntosPatrullas = [...this._puntosPatrullasRaw];
    }
    this.puntosPatrullas = this.puntosPatrullas.filter(
      (puntos) => puntos.accion.id === change.value
    );
  }

  clearFilters() {
    this.patrulla = undefined;
    this.accion = undefined;
    this.puntosPatrullas = [...this._puntosPatrullasRaw];
  }

  formatDescripcion(punto: PuntosPatrullas) {
    return `${punto.accion.descripcion} ${
      punto.descripcionAddicional ? `(${punto.descripcionAddicional})` : ''
    }`;
  }
}
