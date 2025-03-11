import { Component } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="spinner-container">
      <div class="lds-ring">
        <div class="ring-segment"></div>
        <div class="ring-segment"></div>
        <div class="ring-segment"></div>
        <div class="ring-segment"></div>
      </div>
      <h4 class="m-2">Cargando...</h4>
    </div>
  `,
  imports: [],
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {}
