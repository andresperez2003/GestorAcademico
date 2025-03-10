import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('students')
export class StudentsController {

    constructor(private readonly studentService: StudentsService) {}

    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Get()
    findAll() {
        return this.studentService.findAll();
    }

    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Get(':id')
    findOne(@Param('id') id: string) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return student;
    }

    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Put(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return this.studentService.update(id, updateStudentDto);
    }

    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Delete(':id')
    remove(@Param('id') id: string) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return this.studentService.remove(id);
    }
}
