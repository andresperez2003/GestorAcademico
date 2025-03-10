/**
 * @fileoverview Estrategia de Autenticación Local
 * @description Esta estrategia maneja la autenticación basada en credenciales locales
 * (nombre de usuario y contraseña). Utiliza el servicio de autenticación para validar
 * las credenciales del usuario.
 * 
 * @module LocalStrategy
 */

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Valida las credenciales del usuario
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   * @returns Promise<any> Información del usuario si las credenciales son válidas
   * @throws UnauthorizedException si las credenciales son inválidas
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
