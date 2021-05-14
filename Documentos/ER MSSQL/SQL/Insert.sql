INSERT INTO Class(_id, _id_teacher, _id_subject, _id_year, _id_frequency_regime, lective_year) VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO Class_Note(Class_id, Note_id) VALUES (?, ?);
INSERT INTO Course(_id, name) VALUES (?, ?);
INSERT INTO Criteria(_id, _id_class, name, percentage) VALUES (?, ?, ?, ?);
INSERT INTO EvaluationComponent(_id, _id_criteria, _id_student, grade) VALUES (?, ?, ?, ?);
INSERT INTO FrequencyRegime(_id, name) VALUES (?, ?);
INSERT INTO Note(_id, content) VALUES (?, ?);
INSERT INTO Note_Student_Class(Note_id, Student_ClassStudent_id, Student_ClassClass_id) VALUES (?, ?, ?);
INSERT INTO Student(_id, code, name, photo_blob) VALUES (?, ?, ?, ?);
INSERT INTO Student_Class(Student_id, Class_id) VALUES (?, ?);
INSERT INTO Subject(_id, _id_course, code, name) VALUES (?, ?, ?, ?);
INSERT INTO Teacher(_id, name, code, email, password, photo_blob) VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO Year(_id, name) VALUES (?, ?);

