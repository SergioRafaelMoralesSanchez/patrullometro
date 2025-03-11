import { Component, Input } from '@angular/core';
import { PuntosPatrullas } from '../tabla-puntos/tabla-puntos.model';
import { RankingPosition } from './ranking.model';

@Component({
  selector: 'app-ranking',
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent {
  _ranking: RankingPosition[] = [];
  rankingOrdenado: RankingPosition[] = [];

  @Input() set puntosPatrullas(puntosPatrullas: PuntosPatrullas[]) {
    let rankingMap: Map<string, RankingPosition> = new Map();

    puntosPatrullas.forEach((punto) => {
      if (rankingMap.has(punto.patrulla.id)) {
        rankingMap.get(punto.patrulla.id)!.puntos += punto.puntos;
      } else {
        rankingMap.set(punto.patrulla.id, {
          img: punto.patrulla.nombreImagen,
          puntos: punto.puntos,
          position: 'first',
        });
      }
    });

    this.rankingOrdenado = Array.from(rankingMap.values()).sort(
      (a, b) => b.puntos - a.puntos
    );
    this.rankingOrdenado = [
      { ...this.rankingOrdenado[0], position: 'first' },
      { ...this.rankingOrdenado[1], position: 'second' },
      { ...this.rankingOrdenado[2], position: 'third' },
    ];
    this._ranking = [
      { ...this.rankingOrdenado[2], position: 'third' },
      { ...this.rankingOrdenado[0], position: 'first' },
      { ...this.rankingOrdenado[1], position: 'second' },
    ];
  }

  get ranking() {
    if (window.screen.width < 325) {
      return this.rankingOrdenado;
    } else {
      return this._ranking;
    }
  }
}
