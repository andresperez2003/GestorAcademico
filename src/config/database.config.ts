import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { University } from '../modules/university/university.entity'; // Importa tus entidades

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'academicmanager',
  entities: [University], 
  synchronize: true, // ⚠️ Solo en desarrollo, en producción usa migraciones
};