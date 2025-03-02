CREATE DATABASE IF NOT exists AcademicManager; 

USE AcademicManager;

CREATE TABLE University(
	id int Primary key auto_increment,
    name varchar(50)
);

CREATE TABLE Department(
	id int Primary key auto_increment,
    name varchar(50),
    universityId int,
    Foreign key(universityId) References University(id)
);


CREATE TABLE Professor(
	identification varchar(20) primary key,
    firstName varchar(30),
    lastName varchar(30),
    departmentId int,
    Foreign key(departmentId) references Department(id)
);

CREATE TABLE Course(
	id int primary key auto_increment,
    name varchar(30),
    description varchar(100),
    departmentId int,
    professorId varchar(20),
    foreign key(departmentId) references Department(id),
    foreign key(professorId) references Professor(identification)
);

CREATE TABLE Prerequisite(
	id int primary key auto_increment,
    courseToTake int,
    prerequisiteCourse int,
    foreign key(courseToTake) references Course(id),
    foreign key(prerequisiteCourse) references Course(id)
);

CREATE TABLE Student(
	identification varchar(20) primary key,
    firstName varchar(30),
    lastName varchar(30),
    birthDate Date,
    departmentId int,
    foreign key(departmentId) references Department(id)
);

CREATE TABLE Enrollment(
	id int primary key auto_increment,
    enrollmentDate Date,
    studentId varchar(20),
    courseId int,
    foreign key(studentId) references Student(identification),
    foreign key(courseId) references Course(id)
);

CREATE TABLE EvaluationType(
	id int primary key auto_increment,
    name varchar(30),
    percentage float
);

CREATE TABLE Evaluation(
	id int primary key auto_increment,
    evaluationDate Date,
    grade float,
    evaluationType varchar(30),
    enrollmentId int,
    evaluationTypeId int,
    foreign key(enrollmentId) references Enrollment(id),
    foreign key(evaluationTypeId) references EvaluationType(id)
);

CREATE TABLE Schedule(
	id int primary key auto_increment,
    startTime time,
    endTime time,
    dayOfWeek varchar(10),
    courseId int,
    foreign key(courseId) references Course(id)
);

INSERT INTO University (name) VALUES ('Autonomous University of Manizales');

INSERT INTO Department (name, universityId) VALUES 
('Computer Science', 1),
('Physics and Mathematics', 1),
('Electronics', 1);

INSERT INTO Professor (identification, firstName, lastName, departmentId) VALUES 
('P001', 'Javier', 'Hernandez', 1),
('P002', 'Miguel', 'Castro', 1),
('P003', 'Laura', 'Gomez', 1),
('P004', 'Andres', 'Ramirez', 2),
('P005', 'Monica', 'Torres', 2),
('P006', 'Cesar', 'Martinez', 2),
('P007', 'Fernanda', 'Diaz', 3),
('P008', 'Luis', 'Vega', 3),
('P009', 'Carolina', 'Rojas', 3);

INSERT INTO Course (name, description, departmentId, professorId) VALUES 
('Basic Programming', 'Introduction to programming', 1, 'P001'),
('Data Structures', 'Use of data structures', 1, 'P002'),
('Databases', 'Database management', 1, 'P003'),
('Basic Mathematics', 'Fundamental concepts', 2, 'P004'),
('Differential Calculus', 'Derivatives and limits', 2, 'P005'),
('Differential Equations', 'Solution of equations', 2, 'P006'),
('Electrical Circuits', 'Circuit analysis', 3, 'P007'),
('Digital Electronics', 'Digital systems', 3, 'P008'),
('Embedded Systems', 'Microcontroller programming', 3, 'P009');

INSERT INTO Prerequisite (courseToTake, prerequisiteCourse) VALUES 
(2, 1),  -- Data Structures requires Basic Programming
(3, 2),  -- Databases requires Data Structures
(5, 4),  -- Differential Calculus requires Basic Mathematics
(6, 5),  -- Differential Equations requires Differential Calculus
(8, 7),  -- Digital Electronics requires Electrical Circuits
(9, 7),  -- Embedded Systems requires Electrical Circuits
(9, 8);  -- Embedded Systems requires Digital Electronics

INSERT INTO EvaluationType (name, percentage) VALUES 
('Exam', 50.0),
('Project', 45.0),
('Workshop', 5.0);

INSERT INTO Student (identification, firstName, lastName, birthDate, departmentId) VALUES
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

INSERT INTO Enrollment (enrollmentDate, studentId, courseId) VALUES
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

INSERT INTO Schedule (startTime, endTime, dayOfWeek, courseId) VALUES
('07:00:00', '09:00:00', 'Monday', 1),
('07:00:00', '09:00:00', 'Thursday', 1),
('09:00:00', '11:00:00', 'Monday', 4),
('09:00:00', '11:00:00', 'Thursday', 4),
('11:00:00', '13:00:00', 'Tuesday', 2),
('11:00:00', '13:00:00', 'Friday', 2),
('13:00:00', '15:00:00', 'Wednesday', 3),
('13:00:00', '15:00:00', 'Saturday', 3),
('15:00:00', '17:00:00', 'Monday', 5),
('15:00:00', '17:00:00', 'Thursday', 5),
('07:00:00', '09:00:00', 'Tuesday', 6),
('07:00:00', '09:00:00', 'Friday', 6),
('09:00:00', '11:00:00', 'Wednesday', 7),
('09:00:00', '11:00:00', 'Saturday', 7),
('11:00:00', '13:00:00', 'Monday', 8),
('11:00:00', '13:00:00', 'Thursday', 8),
('13:00:00', '15:00:00', 'Tuesday', 9),
('13:00:00', '15:00:00', 'Friday', 9);

-- Insert Evaluations
INSERT INTO Evaluation (evaluationDate, grade, evaluationType, enrollmentId, evaluationTypeId) VALUES
('2024-02-01', 4.2, 'Exam', 1, 1),  ('2024-02-05', 3.8, 'Project', 1, 2),  ('2024-02-10', 4.5, 'Workshop', 1, 3),  ('2024-02-11', 3.9, 'Workshop', 1, 3),
('2024-02-01', 4.3, 'Exam', 2, 1),  ('2024-02-05', 3.9, 'Project', 2, 2),  ('2024-02-10', 4.6, 'Workshop', 2, 3),  ('2024-02-11', 4.0, 'Workshop', 2, 3),
('2024-02-01', 4.1, 'Exam', 3, 1),  ('2024-02-05', 3.7, 'Project', 3, 2),  ('2024-02-10', 4.4, 'Workshop', 3, 3),  ('2024-02-11', 3.8, 'Workshop', 3, 3),
('2024-02-01', 4.4, 'Exam', 4, 1),  ('2024-02-05', 4.0, 'Project', 4, 2),  ('2024-02-10', 4.7, 'Workshop', 4, 3),  ('2024-02-11', 4.1, 'Workshop', 4, 3),
('2024-02-01', 4.0, 'Exam', 5, 1),  ('2024-02-05', 3.6, 'Project', 5, 2),  ('2024-02-10', 4.3, 'Workshop', 5, 3),  ('2024-02-11', 3.7, 'Workshop', 5, 3),
('2024-02-01', 4.2, 'Exam', 6, 1),  ('2024-02-05', 3.8, 'Project', 6, 2),  ('2024-02-10', 4.5, 'Workshop', 6, 3),  ('2024-02-11', 3.9, 'Workshop', 6, 3),
('2024-02-01', 4.3, 'Exam', 7, 1),  ('2024-02-05', 3.9, 'Project', 7, 2),  ('2024-02-10', 4.6, 'Workshop', 7, 3),  ('2024-02-11', 4.0, 'Workshop', 7, 3),
('2024-02-01', 4.1, 'Exam', 8, 1),  ('2024-02-05', 3.7, 'Project', 8, 2),  ('2024-02-10', 4.4, 'Workshop', 8, 3),  ('2024-02-11', 3.8, 'Workshop', 8, 3),
('2024-02-01', 4.4, 'Exam', 9, 1),  ('2024-02-05', 4.0, 'Project', 9, 2),  ('2024-02-10', 4.7, 'Workshop', 9, 3),  ('2024-02-11', 4.1, 'Workshop', 9, 3),
('2024-02-01', 4.0, 'Exam', 10, 1), ('2024-02-05', 3.6, 'Project', 10, 2), ('2024-02-10', 4.3, 'Workshop', 10, 3), ('2024-02-11', 3.7, 'Workshop', 10, 3),
('2024-02-01', 4.2, 'Exam', 11, 1), ('2024-02-05', 3.8, 'Project', 11, 2), ('2024-02-10', 4.5, 'Workshop', 11, 3), ('2024-02-11', 3.9, 'Workshop', 11, 3),
('2024-02-01', 4.3, 'Exam', 12, 1), ('2024-02-05', 3.9, 'Project', 12, 2), ('2024-02-10', 4.6, 'Workshop', 12, 3), ('2024-02-11', 4.0, 'Workshop', 12, 3),
('2024-02-01', 4.1, 'Exam', 13, 1), ('2024-02-05', 3.7, 'Project', 13, 2), ('2024-02-10', 4.4, 'Workshop', 13, 3), ('2024-02-11', 3.8, 'Workshop', 13, 3),
('2024-02-01', 4.4, 'Exam', 14, 1), ('2024-02-05', 4.0, 'Project', 14, 2), ('2024-02-10', 4.7, 'Workshop', 14, 3), ('2024-02-11', 4.1, 'Workshop', 14, 3),
('2024-02-01', 4.0, 'Exam', 15, 1), ('2024-02-05', 3.6, 'Project', 15, 2), ('2024-02-10', 4.3, 'Workshop', 15, 3), ('2024-02-11', 3.7, 'Workshop', 15, 3),
('2024-02-01', 4.2, 'Exam', 16, 1), ('2024-02-05', 3.8, 'Project', 16, 2), ('2024-02-10', 4.5, 'Workshop', 16, 3), ('2024-02-11', 3.9, 'Workshop', 16, 3),
('2024-02-01', 4.3, 'Exam', 17, 1), ('2024-02-05', 3.9, 'Project', 17, 2), ('2024-02-10', 4.6, 'Workshop', 17, 3), ('2024-02-11', 4.0, 'Workshop', 17, 3),
('2024-02-01', 4.1, 'Exam', 18, 1), ('2024-02-05', 3.7, 'Project', 18, 2), ('2024-02-10', 4.4, 'Workshop', 18, 3), ('2024-02-11', 3.8, 'Workshop', 18, 3),
('2024-02-01', 4.4, 'Exam', 19, 1), ('2024-02-05', 4.0, 'Project', 19, 2), ('2024-02-10', 4.7, 'Workshop', 19, 3), ('2024-02-11', 4.1, 'Workshop', 19, 3),
('2024-02-01', 4.0, 'Exam', 20, 1), ('2024-02-05', 3.6, 'Project', 20, 2), ('2024-02-10', 4.3, 'Workshop', 20, 3), ('2024-02-11', 3.7, 'Workshop', 20, 3),
('2024-02-01', 4.2, 'Exam', 21, 1), ('2024-02-05', 3.8, 'Project', 21, 2), ('2024-02-10', 4.5, 'Workshop', 21, 3), ('2024-02-11', 3.9, 'Workshop', 21, 3),
('2024-02-01', 4.3, 'Exam', 22, 1), ('2024-02-05', 3.9, 'Project', 22, 2), ('2024-02-10', 4.6, 'Workshop', 22, 3), ('2024-02-11', 4.0, 'Workshop', 22, 3),
('2024-02-01', 4.1, 'Exam', 23, 1), ('2024-02-05', 3.7, 'Project', 23, 2), ('2024-02-10', 4.4, 'Workshop', 23, 3), ('2024-02-11', 3.8, 'Workshop', 23, 3),
('2024-02-01', 4.4, 'Exam', 24, 1), ('2024-02-05', 4.0, 'Project', 24, 2), ('2024-02-10', 4.7, 'Workshop', 24, 3), ('2024-02-11', 4.1, 'Workshop', 24, 3),
('2024-02-01', 4.0, 'Exam', 25, 1), ('2024-02-05', 3.6, 'Project', 25, 2), ('2024-02-10', 4.3, 'Workshop', 25, 3), ('2024-02-11', 3.7, 'Workshop', 25, 3),
('2024-02-01', 4.2, 'Exam', 26, 1), ('2024-02-05', 3.8, 'Project', 26, 2), ('2024-02-10', 4.5, 'Workshop', 26, 3), ('2024-02-11', 3.9, 'Workshop', 26, 3),
('2024-02-01', 4.3, 'Exam', 27, 1), ('2024-02-05', 3.9, 'Project', 27, 2), ('2024-02-10', 4.6, 'Workshop', 27, 3), ('2024-02-11', 4.0, 'Workshop', 27, 3),
('2024-02-01', 4.1, 'Exam', 28, 1), ('2024-02-05', 3.7, 'Project', 28, 2), ('2024-02-10', 4.4, 'Workshop', 28, 3), ('2024-02-11', 3.8, 'Workshop', 28, 3),
('2024-02-01', 4.4, 'Exam', 29, 1), ('2024-02-05', 4.0, 'Project', 29, 2), ('2024-02-10', 4.7, 'Workshop', 29, 3), ('2024-02-11', 4.1, 'Workshop', 29, 3),
('2024-02-01', 4.0, 'Exam', 30, 1), ('2024-02-05', 3.6, 'Project', 30, 2), ('2024-02-10', 4.3, 'Workshop', 30, 3), ('2024-02-11', 3.7, 'Workshop', 30, 3),
('2024-02-01', 4.2, 'Exam', 31, 1), ('2024-02-05', 3.8, 'Project', 31, 2), ('2024-02-10', 4.5, 'Workshop', 31, 3), ('2024-02-11', 3.9, 'Workshop', 31, 3),
('2024-02-01', 4.3, 'Exam', 32, 1), ('2024-02-05', 3.9, 'Project', 32, 2), ('2024-02-10', 4.6, 'Workshop', 32, 3), ('2024-02-11', 4.0, 'Workshop', 32, 3),
('2024-02-01', 4.1, 'Exam', 33, 1), ('2024-02-05', 3.7, 'Project', 33, 2), ('2024-02-10', 4.4, 'Workshop', 33, 3), ('2024-02-11', 3.8, 'Workshop', 33, 3),
('2024-02-01', 4.4, 'Exam', 34, 1), ('2024-02-05', 4.0, 'Project', 34, 2), ('2024-02-10', 4.7, 'Workshop', 34, 3), ('2024-02-11', 4.1, 'Workshop', 34, 3),
('2024-02-01', 4.0, 'Exam', 35, 1), ('2024-02-05', 3.6, 'Project', 35, 2), ('2024-02-10', 4.3, 'Workshop', 35, 3), ('2024-02-11', 3.7, 'Workshop', 35, 3),
('2024-02-01', 4.2, 'Exam', 36, 1), ('2024-02-05', 3.8, 'Project', 36, 2), ('2024-02-10', 4.5, 'Workshop', 36, 3), ('2024-02-11', 3.9, 'Workshop', 36, 3),
('2024-02-01', 4.3, 'Exam', 37, 1), ('2024-02-05', 3.9, 'Project', 37, 2), ('2024-02-10', 4.6, 'Workshop', 37, 3), ('2024-02-11', 4.0, 'Workshop', 37, 3),
('2024-02-01', 4.1, 'Exam', 38, 1), ('2024-02-05', 3.7, 'Project', 38, 2), ('2024-02-10', 4.4, 'Workshop', 38, 3), ('2024-02-11', 3.8, 'Workshop', 38, 3),
('2024-02-01', 4.4, 'Exam', 39, 1), ('2024-02-05', 4.0, 'Project', 39, 2), ('2024-02-10', 4.7, 'Workshop', 39, 3), ('2024-02-11', 4.1, 'Workshop', 39, 3),
('2024-02-01', 4.0, 'Exam', 40, 1), ('2024-02-05', 3.6, 'Project', 40, 2), ('2024-02-10', 4.3, 'Workshop', 40, 3), ('2024-02-11', 3.7, 'Workshop', 40, 3),
('2024-02-01', 4.2, 'Exam', 41, 1), ('2024-02-05', 3.8, 'Project', 41, 2), ('2024-02-10', 4.5, 'Workshop', 41, 3), ('2024-02-11', 3.9, 'Workshop', 41, 3),
('2024-02-01', 4.3, 'Exam', 42, 1), ('2024-02-05', 3.9, 'Project', 42, 2), ('2024-02-10', 4.6, 'Workshop', 42, 3), ('2024-02-11', 4.0, 'Workshop', 42, 3),
('2024-02-01', 4.1, 'Exam', 43, 1), ('2024-02-05', 3.7, 'Project', 43, 2), ('2024-02-10', 4.4, 'Workshop', 43, 3), ('2024-02-11', 3.8, 'Workshop', 43, 3),
('2024-02-01', 4.4, 'Exam', 44, 1), ('2024-02-05', 4.0, 'Project', 44, 2), ('2024-02-10', 4.7, 'Workshop', 44, 3), ('2024-02-11', 4.1, 'Workshop', 44, 3),
('2024-02-01', 4.0, 'Exam', 45, 1), ('2024-02-05', 3.6, 'Project', 45, 2), ('2024-02-10', 4.3, 'Workshop', 45, 3), ('2024-02-11', 3.7, 'Workshop', 45, 3);

SELECT * FROM University;
SELECT * FROM Department;
SELECT * FROM Professor;
SELECT * FROM Course;
SELECT * FROM Prerequisite;
SELECT * FROM Student;
SELECT * FROM Enrollment;
SELECT * FROM EvaluationType;
SELECT * FROM Evaluation;
SELECT * FROM Schedule;

-- Student along with the course they are enrolled in
SELECT S.identification, S.firstName, S.lastName, C.name AS Course
FROM Student S
JOIN Enrollment E ON S.identification = E.studentId
JOIN Course C ON E.courseId = C.id;

-- Complete information of the evaluation
SELECT 
    Eval.id AS EvaluationID,
    Eval.evaluationDate,
    Eval.grade,
    Eval.evaluationType,
    E.id AS EnrollmentID,
    ET.name AS EvaluationType,
    S.firstName AS Student,
    C.name AS Course
FROM Evaluation Eval
JOIN Enrollment E ON Eval.enrollmentId = E.id
JOIN Student S ON E.studentId = S.identification
JOIN Course C ON E.courseId = C.id
JOIN EvaluationType ET ON Eval.evaluationTypeId = ET.id;

-- Complete information of the course
SELECT 
    C.id AS CourseID,
    C.name AS CourseName,
    CONCAT(P.firstName, ' ', P.lastName) AS Professor,
    D.name AS Department
FROM Course C
JOIN Professor P ON C.professorId = P.identification
JOIN Department D ON C.departmentId = D.id;

-- Prerequisites of the course
SELECT 
    P.courseToTake AS Course,
    CT.name AS CourseToTake,
    P.prerequisiteCourse AS Prerequisite,
    PC.name AS PrerequisiteCourse
FROM Prerequisite P
JOIN Course CT ON P.courseToTake = CT.id
JOIN Course PC ON P.prerequisiteCourse = PC.id;


