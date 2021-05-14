SELECT _id, _id_teacher, _id_subject, _id_year, _id_frequency_regime, lective_year FROM Class;
SELECT Class_id, Note_id FROM Class_Note;
SELECT _id, name FROM Course;
SELECT _id, _id_class, name, percentage FROM Criteria;
SELECT _id, _id_criteria, _id_student, grade FROM EvaluationComponent;
SELECT _id, name FROM FrequencyRegime;
SELECT _id, content FROM Note;
SELECT Note_id, Student_ClassStudent_id, Student_ClassClass_id FROM Note_Student_Class;
SELECT _id, code, name, photo_blob FROM Student;
SELECT Student_id, Class_id FROM Student_Class;
SELECT _id, _id_course, code, name FROM Subject;
SELECT _id, name, code, email, password, photo_blob FROM Teacher;
SELECT _id, name FROM Year;

