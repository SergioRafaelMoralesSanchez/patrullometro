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
import { PuntosPatrullaService } from '../../services/puntos-patrulla.service'
import { Accion, PuntosPatrullasDTO } from '../tabla-puntos/tabla-puntos.model'

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
  puntosPatrullas: PuntosPatrullasDTO[] = []
  accionForm: Nullable<FormGroup>
  accionEdited = false

  constructor (
    private readonly puntosPatrullaService: PuntosPatrullaService,
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
      id: [],
      descripcion: [null, Validators.required],
      puntos: [null, Validators.required]
    })
  }

  async getData () {
    this.puntosPatrullas = await this.puntosPatrullaService.getAll()
    this.acciones = await this.accionesService.getAll()
    this.acciones.forEach(accion => {
      const puntosPatrulla = this.puntosPatrullas.find(
        p => p.accion === accion.id
      )
      accion.canDelete = !puntosPatrulla
    })
  }

  setEditAccion (accion: Accion) {
    debugger
    this.accionEdited = true
    this.accionForm?.patchValue({
      id: accion?.id,
      descripcion: accion?.descripcion,
      puntos: accion?.puntos
    })
  }

  editAccion () {
    const { id, descripcion, puntos } = this.accionForm?.value
    const accionUpdated: Accion = {
      id,
      descripcion,
      puntos
    }
    accionUpdated.id &&
      this.accionesService
        .updateDoc(accionUpdated.id, accionUpdated)
        .then(() => {
          this.accionEdited = false
          this.cleanForm()
          this.messageService.add({
            severity: 'success',
            summary: 'Accion actualizada'
          })
          this.getData()
        })
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

  sendAccion () {
    this.accionForm?.markAsDirty()
    this.accionForm?.markAllAsTouched()
    if (this.accionForm?.valid) {
      const { descripcion, puntos } = this.accionForm.value
      const accion: Accion = {
        descripcion,
        puntos
      }

      this.accionesService.addDoc(accion).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Accion añadida'
        })

        this.getData()
        this.cleanForm()
      })
    }
  }

  getFormControl (name: string): Nullable<FormControl> {
    return this.accionForm?.get(name) as FormControl
  }

  cleanForm () {
    this.accionEdited = false
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
