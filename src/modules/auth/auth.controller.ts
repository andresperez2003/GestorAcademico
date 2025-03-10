/**
 * @fileoverview Controlador de Autenticación
 * @description Este controlador maneja las rutas relacionadas con la autenticación de usuarios.
 * Proporciona endpoints para el inicio de sesión y la generación de tokens JWT.
 * 
 * @module AuthController
 */

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint para iniciar sesión
   * @route POST /auth/login
   * @param req - Objeto de solicitud que contiene las credenciales del usuario
   * @returns Promise<{access_token: string}> Token JWT para acceso autenticado
   * @protected Requiere autenticación local (username/password)
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
