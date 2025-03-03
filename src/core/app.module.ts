import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from '../modules/university/university.entity';
import { UniversityModule } from '../modules/university/university.module';
import { DepartmentsModule } from '../modules/department/departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ⚠️ Ajusta el tipo según tu DB (mysql, postgres, sqlite, etc.)
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andres1004367716',
      database: 'academicmanager',
      entities: [University], // 📌 Incluye todas las entidades aquí
      synchronize: true, // ❗ Solo para desarrollo
      autoLoadEntities: true, // 🔹 Alternativa para cargar entidades automáticamente
    }),
    UniversityModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
