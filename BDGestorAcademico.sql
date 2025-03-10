CREATE DATABASE IF NOT EXISTS AcademicManager;

USE AcademicManager;

CREATE TABLE university (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    universityId INT,
    FOREIGN KEY (universityId) REFERENCES university(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE professor (
    identification VARCHAR(20) PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    departmentId INT,
    FOREIGN KEY (departmentId) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    description VARCHAR(100),
    professorId VARCHAR(20),
    FOREIGN KEY (professorId) REFERENCES professor(identification) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prerequisite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseToTake INT,
    prerequisiteCourse INT,
    FOREIGN KEY (courseToTake) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (prerequisiteCourse) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE student (
    identification VARCHAR(20) PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    birthDate DATE
);

CREATE TABLE enrollment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enrollmentDate DATE,
    studentId VARCHAR(20),
    courseId INT,
    FOREIGN KEY (studentId) REFERENCES student(identification) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (courseId) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE evaluationType (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE evaluation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evaluationDate DATE,
    grade FLOAT,
    evaluationTypeId INT,
    enrollmentId INT,
    FOREIGN KEY (evaluationTypeId) REFERENCES evaluationType(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (enrollmentId) REFERENCES enrollment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE schedule (
    id INT PRIMARY KEY AUTO_INCREMENT,
    startTime TIME,
    endTime TIME,
    dayOfWeek VARCHAR(10),
    courseId INT,
    FOREIGN KEY (courseId) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO university (name) VALUES ('Autonomous University of Manizales');

INSERT INTO department (name, universityId) VALUES 
('Computer Science', 1),
('Physics and Mathematics', 1),
('Electronics', 1);

INSERT INTO professor (identification, firstName, lastName, departmentId) VALUES 
('P001', 'Javier', 'Hernandez', 1),
('P002', 'Miguel', 'Castro', 1),
('P003', 'Laura', 'Gomez', 1),
('P004', 'Andres', 'Ramirez', 2),
('P005', 'Monica', 'Torres', 2),
('P006', 'Cesar', 'Martinez', 2),
('P007', 'Fernanda', 'Diaz', 3),
('P008', 'Luis', 'Vega', 3),
('P009', 'Carolina', 'Rojas', 3);

INSERT INTO course (name, description, professorId) VALUES 
('Basic Programming', 'Introduction to programming', 'P001'),
('Data Structures', 'Use of data structures', 'P002'),
('Databases', 'Database management', 'P003'),
('Basic Mathematics', 'Fundamental concepts', 'P004'),
('Differential Calculus', 'Derivatives and limits', 'P005'),
('Differential Equations', 'Solution of equations', 'P006'),
('Electrical Circuits', 'Circuit analysis', 'P007'),
('Digital Electronics', 'Digital systems', 'P008'),
('Embedded Systems', 'Microcontroller programming', 'P009');

INSERT INTO prerequisite (courseToTake, prerequisiteCourse) VALUES 
(2, 1),  -- Data Structures requires Basic Programming
(3, 2),  -- Databases requires Data Structures
(5, 4),  -- Differential Calculus requires Basic Mathematics
(6, 5),  -- Differential Equations requires Differential Calculus
(8, 7),  -- Digital Electronics requires Electrical Circuits
(9, 7),  -- Embedded Systems requires Electrical Circuits
(9, 8);  -- Embedded Systems requires Digital Electronics

INSERT INTO EvaluationType (name) VALUES 
('Exam'),
('Project'),
('Workshop');

INSERT INTO student (identification, firstName, lastName, birthDate) VALUES
('E001', 'Juan', 'Perez', '2003-05-12'),
('E002', 'Ana', 'Gomez', '2004-07-19'),
('E003', 'Carlos', 'Lopez', '2002-03-15'),
('E004', 'Maria', 'Diaz', '2001-11-30'),
('E005', 'Luis', 'Martinez', '2003-06-20'),
('E006', 'Elena', 'Rodriguez', '2002-09-10'),
('E007', 'Pedro', 'Fernandez', '2003-12-01'),
('E008', 'Lucia', 'Ramirez', '2001-05-22'),
('E009', 'Ricardo', 'Torres', '2002-07-14'),
('E010', 'Camila', 'Vargas', '2003-08-18'),
('E011', 'Andres', 'Mendoza', '2001-10-09'),
('E012', 'Sofia', 'Jimenez', '2004-02-14'),
('E013', 'Diego', 'Castro', '2002-04-17'),
('E014', 'Valeria', 'Rojas', '2003-11-28'),
('E015', 'Fernando', 'Gutierrez', '2001-06-05'),
('E016', 'Gabriel', 'Ortiz', '2003-01-15'),
('E017', 'Patricia', 'Suarez', '2002-08-24'),
('E018', 'David', 'Sanchez', '2001-12-30'),
('E019', 'Daniela', 'Morales', '2004-06-18'),
('E020', 'Jorge', 'Nuñez', '2002-09-10'),
('E021', 'Raquel', 'Vargas', '2003-05-22'),
('E022', 'Oscar', 'Salazar', '2004-03-19'),
('E023', 'Manuel', 'Luna', '2001-07-12'),
('E024', 'Jessica', 'Pineda', '2002-10-29'),
('E025', 'Adriana', 'Espinoza', '2003-11-14'),
('E026', 'Gustavo', 'Herrera', '2001-06-07'),
('E027', 'Carmen', 'Mejia', '2004-01-25'),
('E028', 'Rodrigo', 'Garrido', '2003-04-03'),
('E029', 'Angela', 'Beltran', '2001-09-08'),
('E030', 'Vicente', 'Avila', '2002-11-26'),
('E031', 'Sebastian', 'Ortega', '2002-05-30'),
('E032', 'Nicolas', 'Guerra', '2003-08-14'),
('E033', 'Carla', 'Fernandez', '2001-12-01'),
('E034', 'Martina', 'Lopez', '2002-07-23'),
('E035', 'Hector', 'Vasquez', '2004-04-20'),
('E036', 'Emilia', 'Paredes', '2003-10-11'),
('E037', 'Leonardo', 'Cortez', '2002-06-25'),
('E038', 'Marta', 'Silva', '2001-09-18'),
('E039', 'Isabel', 'Ruiz', '2004-05-27'),
('E040', 'Pablo', 'Mendoza', '2002-03-12'),
('E041', 'Andrea', 'Castillo', '2003-07-08'),
('E042', 'Esteban', 'Navarro', '2001-11-21'),
('E043', 'Belen', 'Guerrero', '2004-02-05'),
('E044', 'Facundo', 'Rico', '2003-09-30'),
('E045', 'Renata', 'Delgado', '2001-12-15');

INSERT INTO enrollment (enrollmentDate, studentId, courseId) VALUES
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

INSERT INTO schedule (startTime, endTime, dayOfWeek, courseId) VALUES
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

INSERT INTO evaluation (evaluationDate, grade, enrollmentId, evaluationTypeId) VALUES
('2024-02-01', 4.2, 1, 1), ('2024-02-05', 3.8, 1, 2), ('2024-02-10', 4.5, 1, 3), ('2024-02-11', 3.9, 1, 3),
('2024-02-01', 4.3, 2, 1), ('2024-02-05', 3.9, 2, 2), ('2024-02-10', 4.6, 2, 3), ('2024-02-11', 4.0, 2, 3),
('2024-02-01', 4.1, 3, 1), ('2024-02-05', 3.7, 3, 2), ('2024-02-10', 4.4, 3, 3), ('2024-02-11', 3.8, 3, 3),
('2024-02-01', 4.0, 4, 1), ('2024-02-05', 3.6, 4, 2), ('2024-02-10', 4.2, 4, 3), ('2024-02-11', 3.7, 4, 3),
('2024-02-01', 4.5, 5, 1), ('2024-02-05', 4.0, 5, 2), ('2024-02-10', 4.7, 5, 3), ('2024-02-11', 4.2, 5, 3);

SELECT * FROM university;
SELECT * FROM department;
SELECT * FROM professor;
SELECT * FROM course;
SELECT * FROM prerequisite;
SELECT * FROM student;
SELECT * FROM enrollment;
SELECT * FROM evaluationType;
SELECT * FROM evaluation;
SELECT * FROM schedule;

-- Student along with the course they are enrolled in
SELECT S.identification, S.firstName, S.lastName, C.name AS Course
FROM student S
JOIN enrollment E ON S.identification = E.studentId
JOIN course C ON E.courseId = C.id;

-- Complete information of the evaluation
SELECT 
    Eval.id AS EvaluationID,
    Eval.evaluationDate,
    Eval.grade,
    E.id AS EnrollmentID,
    ET.name AS EvaluationType,
    S.firstName AS Student,
    C.name AS Course
FROM evaluation Eval
JOIN enrollment E ON Eval.enrollmentId = E.id
JOIN student S ON E.studentId = S.identification
JOIN course C ON E.courseId = C.id
JOIN evaluationType ET ON Eval.evaluationTypeId = ET.id;

-- Complete information of the course
SELECT 
    C.id AS CourseID,
    C.name AS CourseName,
    CONCAT(P.firstName, ' ', P.lastName) AS Professor
FROM course C
JOIN professor P ON C.professorId = P.identification;

-- Prerequisites of the course
SELECT 
    P.courseToTake AS Course,
    CT.name AS CourseToTake,
    P.prerequisiteCourse AS Prerequisite,
    PC.name AS PrerequisiteCourse
FROM prerequisite P
JOIN course CT ON P.courseToTake = CT.id
JOIN course PC ON P.prerequisiteCourse = PC.id;
