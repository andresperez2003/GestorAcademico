/**
 * @fileoverview Estrategia de Autenticación JWT
 * @description Esta estrategia maneja la validación de tokens JWT para la autenticación.
 * Configura Passport para extraer y validar tokens JWT de los encabezados de autorización.
 * 
 * @module JwtStrategy
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del encabezado Authorization
      ignoreExpiration: false, // No ignora la expiración del token
      secretOrKey: 'SECRETO_SUPER_SEGURO', // TODO: Usar variable de entorno en producción
    });
  }

  /**
   * Valida el payload del token JWT
   * @param payload - Payload decodificado del token JWT
   * @returns Objeto con la información del usuario autenticado
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
