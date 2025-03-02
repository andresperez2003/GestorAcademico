CREATE DATABASE IF NOT exists GestorAcademico; 


USE GestorAcademico;

CREATE TABLE Universidad(
	codigo int Primary key auto_increment,
    nombre varchar(50)
);

CREATE TABLE Departamento(
	codigo int Primary key auto_increment,
    nombre varchar(50),
    idUniversidad int ,
    Foreign key(idUniversidad) References Universidad(codigo)
);

CREATE TABLE Carrera(
	codigo int primary key auto_increment,
    nombre varchar(30),
    idDepartamento int,
    foreign key(idDepartamento) references Departamento(codigo)
);

CREATE TABLE Profesor(
	identificacion varchar(20) primary key,
    nombres varchar(30),
    apellidos varchar(30),
    idDepartamento int,
    Foreign key(idDepartamento) references Departamento(codigo)
);

CREATE TABLE Curso(
	codigo int primary key auto_increment,
    nombre varchar(30),
    descripcion varchar(100),
    idDepartamento int,
    idProfesor varchar(20),
    foreign key(idDepartamento) references Departamento(codigo),
    foreign key(idProfesor) references Profesor(identificacion)
);

CREATE TABLE Prerequisito(
	codigo int primary key auto_increment,
    cursoCursar int,
    cursoRequisito int,
    foreign key(cursoCursar) references Curso(codigo),
    foreign key(cursoRequisito) references Curso(codigo)
);

CREATE TABLE Estudiante(
	identificacion varchar(20) primary key,
    nombres varchar(30),
    apellidos varchar(30),
    fechaNacimiento Date,
    idDepartamento int,
    foreign key(idDepartamento) references Departamento(codigo)
);

CREATE TABLE Matricula(
	codigo int primary key auto_increment,
    fechaInscripcion Date,
    idEstudiante varchar(20),
    idCurso int,
    foreign key(idEstudiante) references Estudiante(identificacion),
    foreign key(idCurso) references Curso(codigo)
);

CREATE TABLE TipoEvaluacion(
	codigo int primary key auto_increment,
    nombre varchar(30),
    porcentaje float
);

CREATE TABLE Evaluacion(
	codigo int primary key auto_increment auto_increment,
    fechaRealizacion Date,
    calificacion float,
    tipoEvaluacion varchar(30),
    idMatricula int,
    idTipoEvaluacion int,
    foreign key(idMatricula) references Matricula(codigo),
    foreign key(idTipoEvaluacion) references TipoEvaluacion(codigo)
);

CREATE TABLE Horario(
	codigo int primary key auto_increment,
    horaInicio time,
    horaFinal time,
    diaSemana varchar(10),
    idCurso int,
    foreign key(idCurso) references Curso(codigo)
);



INSERT INTO Universidad (nombre) VALUES ('Universidad Autonoma de Manizales');


INSERT INTO Departamento (nombre, idUniversidad) VALUES 
('Ciencia de la Computación', 1),
('Física y Matemáticas', 1),
('Electrónica', 1);


INSERT INTO Profesor (identificacion, nombres, apellidos, idDepartamento) VALUES 
('P001', 'Javier', 'Hernandez', 1),
('P002', 'Miguel', 'Castro', 1),
('P003', 'Laura', 'Gomez', 1),
('P004', 'Andres', 'Ramirez', 2),
('P005', 'Monica', 'Torres', 2),
('P006', 'Cesar', 'Martinez', 2),
('P007', 'Fernanda', 'Diaz', 3),
('P008', 'Luis', 'Vega', 3),
('P009', 'Carolina', 'Rojas', 3);



INSERT INTO Curso (nombre, descripcion, idDepartamento, idProfesor) VALUES 
('Programación Básica', 'Introducción a la programación', 1, 'P001'),
('Estructuras de Datos', 'Uso de estructuras de datos', 1, 'P002'),
('Bases de Datos', 'Manejo de bases de datos', 1, 'P003'),
('Matemáticas Básicas', 'Conceptos fundamentales', 2, 'P004'),
('Cálculo Diferencial', 'Derivadas y límites', 2, 'P005'),
('Ecuaciones Diferenciales', 'Solución de ecuaciones', 2, 'P006'),
('Circuitos Eléctricos', 'Análisis de circuitos', 3, 'P007'),
('Electrónica Digital', 'Sistemas digitales', 3, 'P008'),
('Sistemas Embebidos', 'Programación de microcontroladores', 3, 'P009');


INSERT INTO Prerequisito (cursoCursar, cursoRequisito) VALUES 
(2, 1),  -- Estructuras de Datos requiere Programación Básica
(3, 2),  -- Bases de Datos requiere Estructuras de Datos
(5, 4),  -- Cálculo Diferencial requiere Matemáticas Básicas
(6, 5),  -- Ecuaciones Diferenciales requiere Cálculo Diferencial
(8, 7),  -- Electrónica Digital requiere Circuitos Eléctricos
(9, 7),  -- Sistemas Embebidos requiere Circuitos Eléctricos
(9, 8);  -- Sistemas Embebidos requiere Electrónica Digital



INSERT INTO TipoEvaluacion (nombre, porcentaje) VALUES 
('Examen', 50.0),
('Proyecto', 45.0),
('Taller', 5.0);


INSERT INTO Estudiante (identificacion, nombres, apellidos, fechaNacimiento, idDepartamento) VALUES
('E001', 'Juan', 'Perez', '2003-05-12', 1),
('E002', 'Ana', 'Gomez', '2004-07-19', 2),
('E003', 'Carlos', 'Lopez', '2002-03-15', 1),
('E004', 'Maria', 'Diaz', '2001-11-30', 3),
('E005', 'Luis', 'Martinez', '2003-06-20', 1),
('E006', 'Elena', 'Rodriguez', '2002-09-10', 2),
('E007', 'Pedro', 'Fernandez', '2003-12-01', 3),
('E008', 'Lucia', 'Ramirez', '2001-05-22', 1),
('E009', 'Ricardo', 'Torres', '2002-07-14', 2),
('E010', 'Camila', 'Vargas', '2003-08-18', 3),
('E011', 'Andres', 'Mendoza', '2001-10-09', 1),
('E012', 'Sofia', 'Jimenez', '2004-02-14', 2),
('E013', 'Diego', 'Castro', '2002-04-17', 3),
('E014', 'Valeria', 'Rojas', '2003-11-28', 1),
('E015', 'Fernando', 'Gutierrez', '2001-06-05', 2),
('E016', 'Gabriel', 'Ortiz', '2003-01-15', 2),
('E017', 'Patricia', 'Suarez', '2002-08-24', 2),
('E018', 'David', 'Sanchez', '2001-12-30', 2),
('E019', 'Daniela', 'Morales', '2004-06-18', 2),
('E020', 'Jorge', 'Nuñez', '2002-09-10', 2),
('E021', 'Raquel', 'Vargas', '2003-05-22', 2),
('E022', 'Oscar', 'Salazar', '2004-03-19', 2),
('E023', 'Manuel', 'Luna', '2001-07-12', 2),
('E024', 'Jessica', 'Pineda', '2002-10-29', 2),
('E025', 'Adriana', 'Espinoza', '2003-11-14', 2),
('E026', 'Gustavo', 'Herrera', '2001-06-07', 3),
('E027', 'Carmen', 'Mejia', '2004-01-25', 3),
('E028', 'Rodrigo', 'Garrido', '2003-04-03', 3),
('E029', 'Angela', 'Beltran', '2001-09-08', 3),
('E030', 'Vicente', 'Avila', '2002-11-26', 3),
('E031', 'Sebastian', 'Ortega', '2002-05-30', 2),
('E032', 'Nicolas', 'Guerra', '2003-08-14', 2),
('E033', 'Carla', 'Fernandez', '2001-12-01', 2),
('E034', 'Martina', 'Lopez', '2002-07-23', 2),
('E035', 'Hector', 'Vasquez', '2004-04-20', 2),
('E036', 'Emilia', 'Paredes', '2003-10-11', 3),
('E037', 'Leonardo', 'Cortez', '2002-06-25', 3),
('E038', 'Marta', 'Silva', '2001-09-18', 3),
('E039', 'Isabel', 'Ruiz', '2004-05-27', 3),
('E040', 'Pablo', 'Mendoza', '2002-03-12', 3),
('E041', 'Andrea', 'Castillo', '2003-07-08', 3),
('E042', 'Esteban', 'Navarro', '2001-11-21', 3),
('E043', 'Belen', 'Guerrero', '2004-02-05', 3),
('E044', 'Facundo', 'Rico', '2003-09-30', 3),
('E045', 'Renata', 'Delgado', '2001-12-15', 3);



INSERT INTO Matricula (fechaInscripcion, idEstudiante, idCurso) VALUES
('2025-03-01', 'E001', 1),
('2025-03-01', 'E003', 2),
('2025-03-01', 'E005', 3),
('2025-03-01', 'E008', 1),
('2025-03-01', 'E011', 2),
('2025-03-01', 'E014', 3),
('2025-03-01', 'E002', 4),
('2025-03-01', 'E006', 5),
('2025-03-01', 'E009', 6),
('2025-03-01', 'E012', 4),
('2025-03-01', 'E015', 5),
('2025-03-01', 'E016', 6),
('2025-03-01', 'E017', 4),
('2025-03-01', 'E018', 5),
('2025-03-01', 'E019', 6),
('2025-03-01', 'E020', 4),
('2025-03-01', 'E021', 5),
('2025-03-01', 'E022', 6),
('2025-03-01', 'E023', 4),
('2025-03-01', 'E024', 5),
('2025-03-01', 'E025', 6),
('2025-03-01', 'E026', 7),
('2025-03-01', 'E027', 8),
('2025-03-01', 'E028', 9),
('2025-03-01', 'E029', 7),
('2025-03-01', 'E030', 8),
('2025-03-01', 'E031', 9),
('2025-03-01', 'E032', 7),
('2025-03-01', 'E033', 8),
('2025-03-01', 'E034', 9),
('2025-03-01', 'E035', 7),
('2025-03-01', 'E036', 8),
('2025-03-01', 'E037', 9),
('2025-03-01', 'E038', 7),
('2025-03-01', 'E039', 8),
('2025-03-01', 'E040', 9),
('2025-03-01', 'E041', 7),
('2025-03-01', 'E042', 8),
('2025-03-01', 'E043', 9),
('2025-03-01', 'E044', 7),
('2025-03-01', 'E045', 8),
('2025-03-01', 'E004', 9),
('2025-03-01', 'E007', 7),
('2025-03-01', 'E010', 8),
('2025-03-01', 'E013', 9);



INSERT INTO Horario (horaInicio, horaFinal, diaSemana, idCurso) VALUES
('07:00:00', '09:00:00', 'Lunes', 1),
('07:00:00', '09:00:00', 'Jueves', 1),
('09:00:00', '11:00:00', 'Lunes', 4),
('09:00:00', '11:00:00', 'Jueves', 4),
('11:00:00', '13:00:00', 'Martes', 2),
('11:00:00', '13:00:00', 'Viernes', 2),
('13:00:00', '15:00:00', 'Miércoles', 3),
('13:00:00', '15:00:00', 'Sábado', 3),
('15:00:00', '17:00:00', 'Lunes', 5),
('15:00:00', '17:00:00', 'Jueves', 5),
('07:00:00', '09:00:00', 'Martes', 6),
('07:00:00', '09:00:00', 'Viernes', 6),
('09:00:00', '11:00:00', 'Miércoles', 7),
('09:00:00', '11:00:00', 'Sábado', 7),
('11:00:00', '13:00:00', 'Lunes', 8),
('11:00:00', '13:00:00', 'Jueves', 8),
('13:00:00', '15:00:00', 'Martes', 9),
('13:00:00', '15:00:00', 'Viernes', 9);


-- Insertar Evaluaciones
INSERT INTO Evaluacion (fechaRealizacion, calificacion, tipoEvaluacion, idMatricula, idTipoEvaluacion) VALUES
('2024-02-01', 4.2, 'Examen', 1, 1),  ('2024-02-05', 3.8, 'Proyecto', 1, 2),  ('2024-02-10', 4.5, 'Talleres', 1, 3),  ('2024-02-11', 3.9, 'Talleres', 1, 3),
('2024-02-01', 4.3, 'Examen', 2, 1),  ('2024-02-05', 3.9, 'Proyecto', 2, 2),  ('2024-02-10', 4.6, 'Talleres', 2, 3),  ('2024-02-11', 4.0, 'Talleres', 2, 3),
('2024-02-01', 4.1, 'Examen', 3, 1),  ('2024-02-05', 3.7, 'Proyecto', 3, 2),  ('2024-02-10', 4.4, 'Talleres', 3, 3),  ('2024-02-11', 3.8, 'Talleres', 3, 3),
('2024-02-01', 4.4, 'Examen', 4, 1),  ('2024-02-05', 4.0, 'Proyecto', 4, 2),  ('2024-02-10', 4.7, 'Talleres', 4, 3),  ('2024-02-11', 4.1, 'Talleres', 4, 3),
('2024-02-01', 4.0, 'Examen', 5, 1),  ('2024-02-05', 3.6, 'Proyecto', 5, 2),  ('2024-02-10', 4.3, 'Talleres', 5, 3),  ('2024-02-11', 3.7, 'Talleres', 5, 3),
('2024-02-01', 4.2, 'Examen', 6, 1),  ('2024-02-05', 3.8, 'Proyecto', 6, 2),  ('2024-02-10', 4.5, 'Talleres', 6, 3),  ('2024-02-11', 3.9, 'Talleres', 6, 3),
('2024-02-01', 4.3, 'Examen', 7, 1),  ('2024-02-05', 3.9, 'Proyecto', 7, 2),  ('2024-02-10', 4.6, 'Talleres', 7, 3),  ('2024-02-11', 4.0, 'Talleres', 7, 3),
('2024-02-01', 4.1, 'Examen', 8, 1),  ('2024-02-05', 3.7, 'Proyecto', 8, 2),  ('2024-02-10', 4.4, 'Talleres', 8, 3),  ('2024-02-11', 3.8, 'Talleres', 8, 3),
('2024-02-01', 4.4, 'Examen', 9, 1),  ('2024-02-05', 4.0, 'Proyecto', 9, 2),  ('2024-02-10', 4.7, 'Talleres', 9, 3),  ('2024-02-11', 4.1, 'Talleres', 9, 3),
('2024-02-01', 4.0, 'Examen', 10, 1), ('2024-02-05', 3.6, 'Proyecto', 10, 2), ('2024-02-10', 4.3, 'Talleres', 10, 3), ('2024-02-11', 3.7, 'Talleres', 10, 3),
('2024-02-01', 4.2, 'Examen', 11, 1), ('2024-02-05', 3.8, 'Proyecto', 11, 2), ('2024-02-10', 4.5, 'Talleres', 11, 3), ('2024-02-11', 3.9, 'Talleres', 11, 3),
('2024-02-01', 4.3, 'Examen', 12, 1), ('2024-02-05', 3.9, 'Proyecto', 12, 2), ('2024-02-10', 4.6, 'Talleres', 12, 3), ('2024-02-11', 4.0, 'Talleres', 12, 3),
('2024-02-01', 4.1, 'Examen', 13, 1), ('2024-02-05', 3.7, 'Proyecto', 13, 2), ('2024-02-10', 4.4, 'Talleres', 13, 3), ('2024-02-11', 3.8, 'Talleres', 13, 3),
('2024-02-01', 4.4, 'Examen', 14, 1), ('2024-02-05', 4.0, 'Proyecto', 14, 2), ('2024-02-10', 4.7, 'Talleres', 14, 3), ('2024-02-11', 4.1, 'Talleres', 14, 3),
('2024-02-01', 4.0, 'Examen', 15, 1), ('2024-02-05', 3.6, 'Proyecto', 15, 2), ('2024-02-10', 4.3, 'Talleres', 15, 3), ('2024-02-11', 3.7, 'Talleres', 15, 3),
('2024-02-01', 4.2, 'Examen', 16, 1), ('2024-02-05', 3.8, 'Proyecto', 16, 2), ('2024-02-10', 4.5, 'Talleres', 16, 3), ('2024-02-11', 3.9, 'Talleres', 16, 3),
('2024-02-01', 4.3, 'Examen', 17, 1), ('2024-02-05', 3.9, 'Proyecto', 17, 2), ('2024-02-10', 4.6, 'Talleres', 17, 3), ('2024-02-11', 4.0, 'Talleres', 17, 3),
('2024-02-01', 4.1, 'Examen', 18, 1), ('2024-02-05', 3.7, 'Proyecto', 18, 2), ('2024-02-10', 4.4, 'Talleres', 18, 3), ('2024-02-11', 3.8, 'Talleres', 18, 3),
('2024-02-01', 4.4, 'Examen', 19, 1), ('2024-02-05', 4.0, 'Proyecto', 19, 2), ('2024-02-10', 4.7, 'Talleres', 19, 3), ('2024-02-11', 4.1, 'Talleres', 19, 3),
('2024-02-01', 4.0, 'Examen', 20, 1), ('2024-02-05', 3.6, 'Proyecto', 20, 2), ('2024-02-10', 4.3, 'Talleres', 20, 3), ('2024-02-11', 3.7, 'Talleres', 20, 3),
('2024-02-01', 4.2, 'Examen', 21, 1), ('2024-02-05', 3.8, 'Proyecto', 21, 2), ('2024-02-10', 4.5, 'Talleres', 21, 3), ('2024-02-11', 3.9, 'Talleres', 21, 3),
('2024-02-01', 4.3, 'Examen', 22, 1), ('2024-02-05', 3.9, 'Proyecto', 22, 2), ('2024-02-10', 4.6, 'Talleres', 22, 3), ('2024-02-11', 4.0, 'Talleres', 22, 3),
('2024-02-01', 4.1, 'Examen', 23, 1), ('2024-02-05', 3.7, 'Proyecto', 23, 2), ('2024-02-10', 4.4, 'Talleres', 23, 3), ('2024-02-11', 3.8, 'Talleres', 23, 3),
('2024-02-01', 4.4, 'Examen', 24, 1), ('2024-02-05', 4.0, 'Proyecto', 24, 2), ('2024-02-10', 4.7, 'Talleres', 24, 3), ('2024-02-11', 4.1, 'Talleres', 24, 3),
('2024-02-01', 4.0, 'Examen', 25, 1), ('2024-02-05', 3.6, 'Proyecto', 25, 2), ('2024-02-10', 4.3, 'Talleres', 25, 3), ('2024-02-11', 3.7, 'Talleres', 25, 3),
('2024-02-01', 4.2, 'Examen', 26, 1), ('2024-02-05', 3.8, 'Proyecto', 26, 2), ('2024-02-10', 4.5, 'Talleres', 26, 3), ('2024-02-11', 3.9, 'Talleres', 26, 3),
('2024-02-01', 4.3, 'Examen', 27, 1), ('2024-02-05', 3.9, 'Proyecto', 27, 2), ('2024-02-10', 4.6, 'Talleres', 27, 3), ('2024-02-11', 4.0, 'Talleres', 27, 3),
('2024-02-01', 4.1, 'Examen', 28, 1), ('2024-02-05', 3.7, 'Proyecto', 28, 2), ('2024-02-10', 4.4, 'Talleres', 28, 3), ('2024-02-11', 3.8, 'Talleres', 28, 3),
('2024-02-01', 4.4, 'Examen', 29, 1), ('2024-02-05', 4.0, 'Proyecto', 29, 2), ('2024-02-10', 4.7, 'Talleres', 29, 3), ('2024-02-11', 4.1, 'Talleres', 29, 3),
('2024-02-01', 4.0, 'Examen', 30, 1), ('2024-02-05', 3.6, 'Proyecto', 30, 2), ('2024-02-10', 4.3, 'Talleres', 30, 3), ('2024-02-11', 3.7, 'Talleres', 30, 3),
('2024-02-01', 4.2, 'Examen', 31, 1), ('2024-02-05', 3.8, 'Proyecto', 31, 2), ('2024-02-10', 4.5, 'Talleres', 31, 3), ('2024-02-11', 3.9, 'Talleres', 31, 3),
('2024-02-01', 4.3, 'Examen', 32, 1), ('2024-02-05', 3.9, 'Proyecto', 32, 2), ('2024-02-10', 4.6, 'Talleres', 32, 3), ('2024-02-11', 4.0, 'Talleres', 32, 3),
('2024-02-01', 4.1, 'Examen', 33, 1), ('2024-02-05', 3.7, 'Proyecto', 33, 2), ('2024-02-10', 4.4, 'Talleres', 33, 3), ('2024-02-11', 3.8, 'Talleres', 33, 3),
('2024-02-01', 4.4, 'Examen', 34, 1), ('2024-02-05', 4.0, 'Proyecto', 34, 2), ('2024-02-10', 4.7, 'Talleres', 34, 3), ('2024-02-11', 4.1, 'Talleres', 34, 3),
('2024-02-01', 4.0, 'Examen', 35, 1), ('2024-02-05', 3.6, 'Proyecto', 35, 2), ('2024-02-10', 4.3, 'Talleres', 35, 3), ('2024-02-11', 3.7, 'Talleres', 35, 3),
('2024-02-01', 4.2, 'Examen', 36, 1), ('2024-02-05', 3.8, 'Proyecto', 36, 2), ('2024-02-10', 4.5, 'Talleres', 36, 3), ('2024-02-11', 3.9, 'Talleres', 36, 3),
('2024-02-01', 4.3, 'Examen', 37, 1), ('2024-02-05', 3.9, 'Proyecto', 37, 2), ('2024-02-10', 4.6, 'Talleres', 37, 3), ('2024-02-11', 4.0, 'Talleres', 37, 3),
('2024-02-01', 4.1, 'Examen', 38, 1), ('2024-02-05', 3.7, 'Proyecto', 38, 2), ('2024-02-10', 4.4, 'Talleres', 38, 3), ('2024-02-11', 3.8, 'Talleres', 38, 3),
('2024-02-01', 4.4, 'Examen', 39, 1), ('2024-02-05', 4.0, 'Proyecto', 39, 2), ('2024-02-10', 4.7, 'Talleres', 39, 3), ('2024-02-11', 4.1, 'Talleres', 39, 3),
('2024-02-01', 4.0, 'Examen', 40, 1), ('2024-02-05', 3.6, 'Proyecto', 40, 2), ('2024-02-10', 4.3, 'Talleres', 40, 3), ('2024-02-11', 3.7, 'Talleres', 40, 3),
('2024-02-01', 4.2, 'Examen', 41, 1), ('2024-02-05', 3.8, 'Proyecto', 41, 2), ('2024-02-10', 4.5, 'Talleres', 41, 3), ('2024-02-11', 3.9, 'Talleres', 41, 3),
('2024-02-01', 4.3, 'Examen', 42, 1), ('2024-02-05', 3.9, 'Proyecto', 42, 2), ('2024-02-10', 4.6, 'Talleres', 42, 3), ('2024-02-11', 4.0, 'Talleres', 42, 3),
('2024-02-01', 4.1, 'Examen', 43, 1), ('2024-02-05', 3.7, 'Proyecto', 43, 2), ('2024-02-10', 4.4, 'Talleres', 43, 3), ('2024-02-11', 3.8, 'Talleres', 43, 3),
('2024-02-01', 4.4, 'Examen', 44, 1), ('2024-02-05', 4.0, 'Proyecto', 44, 2), ('2024-02-10', 4.7, 'Talleres', 44, 3), ('2024-02-11', 4.1, 'Talleres', 44, 3),
('2024-02-01', 4.0, 'Examen', 45, 1), ('2024-02-05', 3.6, 'Proyecto', 45, 2), ('2024-02-10', 4.3, 'Talleres', 45, 3), ('2024-02-11', 3.7, 'Talleres', 45, 3);


SELECT * FROM Universidad;
SELECT * FROM Departamento;
SELECT * FROM Carrera;
SELECT * FROM Profesor;
SELECT * FROM Curso;
SELECT * FROM Prerequisito;
SELECT * FROM Estudiante;
SELECT * FROM Matricula;
SELECT * FROM TipoEvaluacion;
SELECT * FROM Evaluacion;
SELECT * FROM Horario;


-- Estudiante junto al curso en el que esta
SELECT E.identificacion, E.nombres, E.apellidos, C.nombre AS Curso
FROM Estudiante E
JOIN Matricula M ON E.identificacion = M.idEstudiante
JOIN Curso C ON M.idCurso = C.codigo;


-- Informacion completa de la evaluacion
SELECT 
    Eval.codigo AS EvaluacionID,
    Eval.fechaRealizacion,
    Eval.calificacion,
    Eval.tipoEvaluacion,
    M.codigo AS MatriculaID,
    TE.nombre AS TipoEvaluacion,
    Est.nombres AS Estudiante,
    C.nombre AS Curso
FROM Evaluacion Eval
JOIN Matricula M ON Eval.idMatricula = M.codigo
JOIN Estudiante Est ON M.idEstudiante = Est.identificacion
JOIN Curso C ON M.idCurso = C.codigo
JOIN TipoEvaluacion TE ON Eval.idTipoEvaluacion = TE.codigo;


-- Informacion completa del curso
SELECT 
    C.codigo AS CursoID,
    C.nombre AS NombreCurso,
    CONCAT(P.nombres, ' ', P.apellidos) AS Profesor,
    D.nombre AS Departamento
FROM Curso C
JOIN Profesor P ON C.idProfesor = P.identificacion
JOIN Departamento D ON C.idDepartamento = D.codigo;

-- Prerequisitos del curso
SELECT 
    P.cursoCursar AS Curso,
    CC.nombre AS CursoCursar,
    P.cursoRequisito AS Prerequisito,
    CR.nombre AS CursoRequisito
FROM Prerequisito P
JOIN Curso CC ON P.cursoCursar = CC.codigo
JOIN Curso CR ON P.cursoRequisito = CR.codigo;
	

