import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  readonly cargando = signal(false);
  readonly errorMensaje = signal('');

  readonly loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this._authService.estaAutenticadoService()) {
      this._authService.redirigirSegunRolService();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.errorMensaje.set('');

    this._authService.loginService(this.loginForm.value).subscribe({
      next: usuario => {
        this.cargando.set(false);
        this._authService.guardarSesionService(usuario);
        this._authService.redirigirSegunRolService();
      },
      error: error => {
        console.log(error);
        this.cargando.set(false);
        this.errorMensaje.set(error?.error?.mensaje || 'No se pudo conectar con el servidor');
      }
    });
  }
}