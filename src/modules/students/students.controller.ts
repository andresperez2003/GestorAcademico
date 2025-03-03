import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {

    constructor(private readonly studentService: StudentsService) {}

    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
    }

    @Get()
    findAll() {
    return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    const student = this.studentService.findOne(id);
    if (!student) {
        return new NotFoundException(`Student with id ${id} not foun`);
    }
    return student;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        const student = this.studentService.findOne(id);
        if (!student) {
            return new NotFoundException(`Student with id ${id} not foun`);
        }
        return this.studentService.update(id, updateStudentDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        const student = this.studentService.findOne(id);
        if (!student) {
            return new NotFoundException(`Student with id ${id} not foun`);
        }
        return this.studentService.remove(id);
    }
    
}
