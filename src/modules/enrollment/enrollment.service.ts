import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Course } from '../course/course.entity';
import { Prerequisite } from '../prerequisite/prerequisite.entity';
import { Evaluation } from '../evaluation/evaluation.entity';

@Injectable()
export class EnrollmentService {

      constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Prerequisite)
        private readonly prerequisiteRepository: Repository<Prerequisite>,
        @InjectRepository(Evaluation)
        private readonly evaluationRepository: Repository<Evaluation>,
      ) {}
    
      async create(createEnrollmentDto: CreateEnrollmentDto) {
          try {
            const { studentId, courseId } = createEnrollmentDto;

            // Validar que el curso existe
            const course = await this.courseRepository.findOne({ where: { id: courseId } });
            if (!course) {
              throw new NotFoundException(`Course with id ${courseId} not found`);
            }

            // Obtener los prerrequisitos del curso
            const prerequisites = await this.prerequisiteRepository.find({ where: { course: { id: courseId } } });

            if (prerequisites.length > 0) {
              // Obtener los cursos que el estudiante ha completado con nota > 0
              const passedCourses = await this.evaluationRepository
                .createQueryBuilder('evaluation')
                .leftJoin('evaluation.enrollment', 'enrollment')
                .leftJoin('enrollment.course', 'course')
                .where('enrollment.studentId = :studentId', { studentId })
                .andWhere('evaluation.grade > 3') // Solo considerar cursos aprobados
                .getMany();

              const passedCourseIds = passedCourses.map(e => e.enrollment.course.id);

              // Verificar si ha completado los prerrequisitos con una nota válida
              for (const prereq of prerequisites) {
                if (!passedCourseIds.includes(prereq.prerequisite.id)) {
                  throw new BadRequestException(
                    `Student must complete and pass the prerequisite course with id ${prereq.prerequisite.id} before enrolling in course ${courseId}`,
                  );
                }
              }
            }

            // Crear la inscripción
            const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
            return await this.enrollmentRepository.save(enrollment);
          } catch (error) {
            throw new InternalServerErrorException('Error creating Enrollment');
          }
      }
    
      async findAll() {
          return await this.enrollmentRepository.find({ relations: ['student', 'course'] });
      }
    
      async findOne(id: number) {
        const enrollment = await this.enrollmentRepository.findOne({ where: { id }, relations: ['student', 'course'] });
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
          await this.enrollmentRepository.update(id, updateEnrollmentDto);
          return this.findOne(id);
        } catch (error) {
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
