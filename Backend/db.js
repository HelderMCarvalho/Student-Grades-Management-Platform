const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('sgmpdb', 'sgmp1', 'sgmp1', {
    dialect: 'sqlite',
    storage: 'storage.sqlite',
    logging: false,
    dialectOptions: {
        encrypt: true
    }
});

const Course = require('./models/Course')(sequelize, Sequelize);
const Subject = require('./models/Subject')(sequelize, Sequelize);
const Teacher = require('./models/Teacher')(sequelize, Sequelize);
const FrequencyRegime = require('./models/FrequencyRegime')(sequelize, Sequelize);
const Year = require('./models/Year')(sequelize, Sequelize);
const Note = require('./models/Note')(sequelize, Sequelize);
const Student = require('./models/Student')(sequelize, Sequelize);
const Class = require('./models/Class')(sequelize, Sequelize);
const Criteria = require('./models/Criteria')(sequelize, Sequelize);
const EvaluationComponent = require('./models/EvaluationComponent')(sequelize, Sequelize);
const Class_Note = require('./models/Class_Note')(sequelize, Sequelize);
const Student_Class = require('./models/Student_Class')(sequelize, Sequelize);
const Note_Student_Class = require('./models/Note_Student_Class')(sequelize, Sequelize);

// Relations
Course.hasMany(Subject, {foreignKey: '_id_course', onDelete: 'CASCADE'});
Subject.belongsTo(Course, {foreignKey: '_id_course'});

Subject.hasMany(Class, {foreignKey: '_id_subject'});
Class.belongsTo(Subject, {foreignKey: '_id_subject'});

Teacher.hasMany(Class, {foreignKey: '_id_teacher', onDelete: 'CASCADE'});
Class.belongsTo(Teacher, {foreignKey: '_id_teacher'});

FrequencyRegime.hasMany(Class, {foreignKey: '_id_frequency_regime'});
Class.belongsTo(FrequencyRegime, {foreignKey: '_id_frequency_regime'});

Year.hasMany(Class, {foreignKey: '_id_year'});
Class.belongsTo(Year, {foreignKey: '_id_year'});

Class.hasMany(Criteria, {foreignKey: '_id_class', onDelete: 'CASCADE'});
Criteria.belongsTo(Class, {foreignKey: '_id_class'});

Criteria.hasOne(EvaluationComponent, {foreignKey: '_id_criteria', onDelete: 'CASCADE'});
EvaluationComponent.belongsTo(Criteria, {foreignKey: '_id_criteria'});

Student.hasMany(EvaluationComponent, {foreignKey: '_id_student', onDelete: 'CASCADE'});
EvaluationComponent.belongsTo(Student, {foreignKey: '_id_student'});

Class.belongsToMany(Note, {foreignKey: '_id_class', through: Class_Note, onDelete: 'CASCADE'});
Note.belongsToMany(Class, {foreignKey: '_id_note', through: Class_Note});

Student.belongsToMany(Class, {foreignKey: '_id_student', through: Student_Class});
Class.belongsToMany(Student, {foreignKey: '_id_class', through: Student_Class});

Student_Class.belongsToMany(Note, {foreignKey: '_id_student_class', through: Note_Student_Class, onDelete: 'CASCADE'});
Note.belongsToMany(Student_Class, {foreignKey: '_id_note', through: Note_Student_Class});

// END Relations

// Connect to DB
sequelize.authenticate().then(() => {
    console.log('Connected to DB!');

    /*sequelize.sync({force: true}).then(() => {
        async function run() {
            await Course.bulkCreate([{
                    name: 'Licenciatura em Engenharia de Sistemas Informáticos',
                    Subjects: [
                        {name: 'Multimédia e Tecnologia Web', code: 1},
                        {name: 'Interface Homem Máquina', code: 2}
                    ]
                }, {
                    name: 'Curso TeSP em Desenvolvimento Web e Multimédia',
                    Subjects: [
                        {name: 'Desenvolvimento Web I', code: 3},
                        {name: 'Desenvolvimento Web II', code: 4}
                    ]
                }], {include: [Subject]}
            );
            await Student.bulkCreate([{
                firstName: 'Hélder',
                lastName: 'Carvalho',
                code: 15310
            }, {
                firstName: 'Eduardo',
                lastName: 'Oliveira',
                code: 15475
            }]);
            await Year.bulkCreate([{
                name: '1st'
            }, {
                name: '2nd'
            }, {
                name: '3rd'
            }])
            await FrequencyRegime.bulkCreate([{
                name: 'Daytime'
            }, {
                name: 'Nighttime'
            }]);
            await Teacher.bulkCreate([{
                email: 'test@test.com',
                firstName: 'Teacher',
                lastName: 'One',
                code: 11111,
                password: 'b3eebd72b43b377f8c814c6799723c89c2d134181a9bde7613e2f7c86916522232504510909adcd7be43e84d3b1c2d4c51985bdfc4804633330fc75816d03ff2'
            }]);
            console.log('Synced');
        }

        run().then();
    });*/
}).catch((error) => {
    console.error('Not connected to DB because ', error);
});

module.exports = sequelize;
