/**
 * @fileoverview Servicio de autenticación
 * @description Este servicio maneja la lógica de autenticación, incluyendo la validación de usuarios
 * y la generación de tokens JWT para el acceso seguro al sistema.
 * 
 * @module AuthService
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Servicio para gestionar usuarios
    private jwtService: JwtService, // Servicio para manejar tokens JWT
  ) {}

  /**
   * Valida las credenciales de un usuario
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   * @returns Objeto con la información del usuario (sin la contraseña) o null si las credenciales son inválidas
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Genera un token JWT para un usuario autenticado
   * @param user - Objeto con la información del usuario
   * @returns Objeto con el token de acceso
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
