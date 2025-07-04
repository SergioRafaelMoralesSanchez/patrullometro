import { CommonModule, formatDate } from '@angular/common'
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { SelectChangeEvent, SelectModule } from 'primeng/select'
import { Nullable } from 'primeng/ts-helpers'
import { AccionesService } from '../../services/acciones.service'
import { PatrullasService } from '../../services/patrullas.service'
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import {
  Accion,
  Patrulla,
  PuntosPatrullas,
  PuntosPatrullasDTO
} from '../tabla-puntos/tabla-puntos.model'

import { MessageService } from 'primeng/api'
import { DatePickerModule } from 'primeng/datepicker'
import { TablaPuntosComponent } from '../tabla-puntos/tabla-puntos.component'

@Component({
  selector: 'app-add-puntos-patrulla',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    MessageModule,
    TablaPuntosComponent
  ],
  templateUrl: './add-puntos-patrulla.component.html',
  styleUrl: './add-puntos-patrulla.component.css'
})
export class AddPuntosPatrullaComponent implements OnInit {
  patrullas: Patrulla[] = []
  acciones: Accion[] = []
  puntosPatrullas: PuntosPatrullas[] = []

  puntosForm: Nullable<FormGroup>

  constructor (
    private readonly puntosPatrullaService: PuntosPatrullaService,
    private readonly patrullasService: PatrullasService,
    private readonly accionesService: AccionesService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {}

  ngOnInit (): void {
    this.setForm()
    this.getData()
  }

  setForm () {
    this.puntosForm = this.fb.group({
      patrulla: [null, Validators.required],
      accion: [null, Validators.required],
      fecha: [new Date(), Validators.required],
      descripcionAddicional: [],
      puntos: [null, Validators.required],
      numero: [1, Validators.min(1)]
    })
  }

  async getData () {
    this.patrullas = await this.patrullasService.getAll()
    this.acciones = await this.accionesService.getAll()

    await this.setPuntosPatrullas()
  }

  accionChange (accion: SelectChangeEvent) {
    this.getFormControl('puntos')?.setValue(accion.value.puntos)
  }

  async sendPuntosPatrulla () {
    this.puntosForm?.markAsDirty()
    this.puntosForm?.markAllAsTouched()
    if (this.puntosForm?.valid) {
      const { patrulla, accion, fecha, puntos, descripcionAddicional, numero } =
        this.puntosForm.value
      const puntosPatrulla: PuntosPatrullasDTO = {
        patrulla,
        accion: accion?.id,
        puntos,
        descripcionAddicional,
        fecha: formatDate(fecha, 'yyyy-MM-dd', this.locale)
      }

      for (let i = 0; i < numero; i++) {
        await this.puntosPatrullaService.addDoc(puntosPatrulla)
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Puntos añadidos'
      })
      this.setPuntosPatrullas()
    }
  }
  async setPuntosPatrullas () {
    this.puntosPatrullas =
      await this.puntosPatrullaService.getPuntosPatrullaMapped(
        this.acciones,
        this.patrullas
      )
  }

  getFormControl (name: string): Nullable<FormControl> {
    return this.puntosForm?.get(name) as FormControl
  }

  cleanForm () {
    this.puntosForm?.reset()
    this.puntosForm?.markAsPristine()
    this.puntosForm?.markAsUntouched()
    this.puntosForm?.patchValue({
      fecha: new Date(),
      numero: 1
    })
  }

  hasError (name: string): boolean {
    return (
      (this.getFormControl(name)?.errors &&
        this.getFormControl(name)?.touched) ??
      false
    )
  }
}
