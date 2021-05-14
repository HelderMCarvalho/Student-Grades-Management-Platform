DELETE FROM Class WHERE _id = ?;
DELETE FROM Class_Note WHERE Class_id = ? AND Note_id = ?;
DELETE FROM Course WHERE _id = ?;
DELETE FROM Criteria WHERE _id = ?;
DELETE FROM EvaluationComponent WHERE _id = ?;
DELETE FROM FrequencyRegime WHERE _id = ?;
DELETE FROM Note WHERE _id = ?;
DELETE FROM Note_Student_Class WHERE Note_id = ? AND Student_ClassStudent_id = ? AND Student_ClassClass_id = ?;
DELETE FROM Student WHERE _id = ?;
DELETE FROM Student_Class WHERE Student_id = ? AND Class_id = ?;
DELETE FROM Subject WHERE _id = ?;
DELETE FROM Teacher WHERE _id = ?;
DELETE FROM Year WHERE _id = ?;

