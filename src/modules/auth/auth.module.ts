/**
 * @fileoverview Módulo de autenticación del sistema
 * @description Este módulo maneja toda la lógica de autenticación y autorización del sistema.
 * Implementa autenticación mediante JWT (JSON Web Tokens) y estrategia local.
 * 
 * @module AuthModule
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule, // Módulo para gestión de usuarios
    PassportModule, // Módulo para autenticación con Passport
    JwtModule.register({
      secret: 'SECRETO_SUPER_SEGURO', // TODO: Usar variables de entorno en producción
      signOptions: { expiresIn: '1h' }, // Los tokens expiran después de 1 hora
    }),
  ],
  controllers: [AuthController], // Controlador que maneja las rutas de autenticación
  providers: [AuthService, JwtStrategy, LocalStrategy], // Servicios y estrategias de autenticación
  exports: [AuthService], // Exporta el servicio para uso en otros módulos
})
export class AuthModule {}
