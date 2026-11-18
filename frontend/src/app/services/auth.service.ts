import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario, UsuarioLogin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = 'http://localhost:3000/api/auth';
  private _storageKey = 'nexo_academico_sesion';

  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);

  public loginService(credenciales: UsuarioLogin): Observable<Usuario> {
    return this._httpClient.post<Usuario>(`${this._url}/login`, credenciales);
  }

  public obtenerPerfilService(): Observable<Usuario> {
    const usuario = this.obtenerUsuarioActualService();
    
    const headers = new HttpHeaders({
      'x-user-id': usuario ? String(usuario.id) : ''
    });

    return this._httpClient.get<Usuario>(`${this._url}/perfil`, { headers });
  }

  public guardarSesionService(usuario: Usuario): void {
    localStorage.setItem(this._storageKey, JSON.stringify(usuario));
  }

  public obtenerUsuarioActualService(): Usuario | null {
    const raw = localStorage.getItem(this._storageKey);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as Usuario;
  }

  public estaAutenticadoService(): boolean {
    return this.obtenerUsuarioActualService() !== null;
  }

  public obtenerRolService(): string {
    const usuario = this.obtenerUsuarioActualService();
    return usuario ? usuario.rol.toUpperCase() : '';
  }

  public logoutService(): void {
    localStorage.removeItem(this._storageKey);
    this._router.navigate(['/login']);
  }

  public rutaInicioService(): string {
    const rol = this.obtenerRolService();
    if (rol === 'ADMIN') {
      return '/comisiones';
    } else if (rol === 'DOCENTE') {
      return '/asistencia-docente';
    } else if (rol === 'ALUMNO') {
      // cuando este la pantalla de mis-asistencias va a ir ahi
      return '/justificaciones';
    }
    return '/login';
  }

  public redirigirSegunRolService(): void {
    this._router.navigate([this.rutaInicioService()]);
  }
}