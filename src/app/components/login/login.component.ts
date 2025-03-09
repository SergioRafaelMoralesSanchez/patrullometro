import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { ToastModule } from 'primeng/toast'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  error = ''
  loginForm!: FormGroup
  loading = false
  returnUrl!: string
  submitted!: boolean

  constructor (
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.authService.user) {
      this.router.navigate([''])
    }
  }

  get f () {
    return this.loginForm.controls
  }

  onSubmit () {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }
    this.loading = true

    this.authService.signInWithEmailAndPassword(
      this.f['username'].value,
      this.f['password'].value
    )
  }

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
}
