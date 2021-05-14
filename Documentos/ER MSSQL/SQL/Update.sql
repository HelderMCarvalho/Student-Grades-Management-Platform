UPDATE Class SET _id_teacher = ?, _id_subject = ?, _id_year = ?, _id_frequency_regime = ?, lective_year = ? WHERE _id = ?;
UPDATE Class_Note SET  WHERE Class_id = ? AND Note_id = ?;
UPDATE Course SET name = ? WHERE _id = ?;
UPDATE Criteria SET _id_class = ?, name = ?, percentage = ? WHERE _id = ?;
UPDATE EvaluationComponent SET _id_criteria = ?, _id_student = ?, grade = ? WHERE _id = ?;
UPDATE FrequencyRegime SET name = ? WHERE _id = ?;
UPDATE Note SET content = ? WHERE _id = ?;
UPDATE Note_Student_Class SET  WHERE Note_id = ? AND Student_ClassStudent_id = ? AND Student_ClassClass_id = ?;
UPDATE Student SET code = ?, name = ?, photo_blob = ? WHERE _id = ?;
UPDATE Student_Class SET  WHERE Student_id = ? AND Class_id = ?;
UPDATE Subject SET _id_course = ?, code = ?, name = ? WHERE _id = ?;
UPDATE Teacher SET name = ?, code = ?, email = ?, password = ?, photo_blob = ? WHERE _id = ?;
UPDATE Year SET name = ? WHERE _id = ?;

