import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { AppRoutes } from '../../app.routes';
@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    RippleModule,
    ReactiveFormsModule,
    MessageModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.messageService.add({
      severity: 'info',
      summary: 'HOLA',
    });
    this.loginForm?.markAsDirty();
    this.loginForm?.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.signInWithEmailAndPassword(
        this.f['email'].value,
        this.f['password'].value,
        this.messageService
      );
    }
  }

  ngOnInit(): void {
    if (this.authService.isAuthorithed()) {
      this.router.navigate([AppRoutes.INICI]);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getFormControl(name: string): Nullable<FormControl> {
    return this.loginForm?.get(name) as FormControl;
  }

  hasError(name: string): boolean {
    return (
      (this.getFormControl(name)?.errors &&
        this.getFormControl(name)?.touched) ??
      false
    );
  }
}
