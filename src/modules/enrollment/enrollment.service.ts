import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Course } from '../course/course.entity';
import { Prerequisite } from '../prerequisite/prerequisite.entity';
import { Evaluation } from '../evaluation/evaluation.entity';
import { Student } from '../students/students.entity';

@Injectable()
export class EnrollmentService {

  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student) // Inyecta el repositorio de Student
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Prerequisite)
    private readonly prerequisiteRepository: Repository<Prerequisite>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, courseId } = createEnrollmentDto;

    // Validar que el curso existe
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    // Validar que el estudiante existe
    const student = await this.studentRepository.findOne({ where: { identification: String(studentId) } });

    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    // Obtener los prerrequisitos del curso
    const prerequisites = await this.prerequisiteRepository.find({
      where: { course: { id: courseId } },
      relations: ['prerequisite'], // Carga la información del curso que es prerrequisito
    });

    if (prerequisites.length > 0) {
      // Obtener los cursos que el estudiante ha aprobado: se calcula el promedio de evaluaciones para cada curso
      const passedCourses = await this.evaluationRepository
        .createQueryBuilder('evaluation')
        .leftJoin('evaluation.enrollment', 'enrollment')
        .leftJoin('enrollment.course', 'course')
        .where('enrollment.studentId = :studentId', { studentId })
        .groupBy('course.id')
        .having('AVG(evaluation.grade) > 3') // Promedio mayor a 3
        .select('course.id', 'courseId')
        .addSelect('course.name', 'courseName')
        .getRawMany();

      // Extrae los IDs de los cursos aprobados
      const passedCourseIds = passedCourses.map(p => p.courseId);

      // Verificar que el estudiante ha aprobado cada curso prerrequisito
      for (const prereq of prerequisites) {
        if (!passedCourseIds.includes(prereq.prerequisite.id)) {
          throw new BadRequestException(
            `Student must complete and pass the prerequisite course "${prereq.prerequisite.name}" before enrolling in course "${course.name}"`
          );
        }
      }
    }

    // Crear la inscripción asignando los objetos completos de estudiante y curso
    const enrollment = this.enrollmentRepository.create({
      student,
      course,
      enrollmentDate: new Date(createEnrollmentDto.enrollmentDate),
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll() {
    return await this.enrollmentRepository.find({ relations: ['student', 'course', 'evaluations'] });
  }
  
  async findOne(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({ 
      where: { id  }, 
      relations: ['student', 'course', 'evaluations'] 
    });
  
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
  
    return enrollment;
  }
  

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
  
      if (!enrollment) {
        throw new NotFoundException(`Enrollment with id ${id} not found`);
      }
  
      // Cargar entidades relacionadas si existen en updateEnrollmentDto
      let student: Student | null = null;
      let course: Course | null = null;
  
      if (updateEnrollmentDto.studentId) {
        student = await this.studentRepository.findOne({ where: { identification: String(updateEnrollmentDto.studentId) } });
        if (!student) {
          throw new NotFoundException(`Student with id ${updateEnrollmentDto.studentId} not found`);
        }
      }
  
      if (updateEnrollmentDto.courseId) {
        course = await this.courseRepository.findOne({ where: { id: updateEnrollmentDto.courseId } });
        if (!course) {
          throw new NotFoundException(`Course with id ${updateEnrollmentDto.courseId} not found`);
        }
      }
  
      // Crear el objeto de actualización con entidades correctas
      const updatedEnrollment = {
        ...updateEnrollmentDto,
        student: student ?? enrollment.student, // Mantiene la anterior si no se actualiza
        course: course ?? enrollment.course,
      };
  
      await this.enrollmentRepository.save({ id, ...updatedEnrollment });
  
      return this.findOne(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error updating enrollment');
    }
  }
  

  async remove(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    await this.enrollmentRepository.delete(id);
    return { message: 'Enrollment deleted successfully' };
  }
}
