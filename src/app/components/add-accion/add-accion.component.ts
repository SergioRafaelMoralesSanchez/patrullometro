import { CommonModule } from '@angular/common'
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DatePickerModule } from 'primeng/datepicker'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { Nullable } from 'primeng/ts-helpers'
import { AccionesService } from '../../services/acciones.service'
import { Accion } from '../tabla-puntos/tabla-puntos.model'

@Component({
  selector: 'app-add-accion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    MessageModule,
    TableModule
  ],
  templateUrl: './add-accion.component.html'
})
export class AddAccionComponent implements OnInit {
  acciones: Accion[] = []

  accionForm: Nullable<FormGroup>

  constructor (
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
    this.accionForm = this.fb.group({
      descripcion: [null, Validators.required],
      puntos: [null, Validators.required]
    })
  }

  async getData () {
    this.acciones = await this.accionesService.getAll()
  }

  deleteAccion (accion: Accion) {
    accion?.id &&
      this.accionesService.deleteDoc(accion?.id).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Accion eliminada'
        })
        this.getData()
      })
  }

  async sendAccion () {
    this.accionForm?.markAsDirty()
    this.accionForm?.markAllAsTouched()
    if (this.accionForm?.valid) {
      const { descripcion, puntos } = this.accionForm.value
      const accion: Accion = {
        descripcion,
        puntos
      }

      await this.accionesService.addDoc(accion)
      this.messageService.add({
        severity: 'success',
        summary: 'Accion añadida'
      })

      this.getData()
      this.cleanForm()
    }
  }

  getFormControl (name: string): Nullable<FormControl> {
    return this.accionForm?.get(name) as FormControl
  }

  cleanForm () {
    this.accionForm?.reset()
    this.accionForm?.markAsPristine()
    this.accionForm?.markAsUntouched()
  }

  hasError (name: string): boolean {
    return (
      (this.getFormControl(name)?.errors &&
        this.getFormControl(name)?.touched) ??
      false
    )
  }
}
