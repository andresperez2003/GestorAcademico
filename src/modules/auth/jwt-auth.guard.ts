/**
 * @fileoverview Guard de Autenticación JWT
 * @description Este guard protege las rutas que requieren autenticación mediante tokens JWT.
 * Verifica la presencia del token en el encabezado de autorización y valida su autenticidad.
 * 
 * @module JwtAuthGuard
 */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  /**
   * Verifica si la solicitud puede ser procesada basándose en la autenticación JWT
   * @param context - Contexto de ejecución que contiene la solicitud HTTP
   * @returns boolean - Indica si la solicitud puede proceder
   * @throws UnauthorizedException si no se encuentra el token de autorización
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    return super.canActivate(context);
  }
}
