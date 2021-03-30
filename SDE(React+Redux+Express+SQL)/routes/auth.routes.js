const {User, Subject, Teacher} = require('../models/todo');
const {Router, response} = require('express');
const router = Router();
const bcrypt = require ('bcrypt-nodejs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const sequelize = require('../utils/database');
const { QueryTypes } = require('sequelize');


router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        // check('password', 'Введите пароль').exists()
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Некорректные данные при входе в систему lol'})
        }

        const {email, pas} = req.body;

        const data = await User.findOne({where: { email: email }});
        
        if(!data){
            return res.status(400).json({message: "Пользователь не найден"})
        }
                
        await bcrypt.compare(pas, data.dataValues.password, function(err, result) {
                 
            if(!result){
                return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
            }
            
            const token = jwt.sign({userId: data.user_id}, "pavel", { expiresIn: '15m' });
            req.session.authenticated = true;
            req.session.user = data.user_id;
            req.session.access_lvl = data.access_lvl;
                
            res.json({ token, userId: data.user_id});
        });
    } 
    catch (e) {
        res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
    }
});

router.get('/subjects', 
async (req, res) => {
        try {
            console.log(req.session);
            const {access_lvl, user} = req.session;
            
            if(access_lvl === 1){
                let data = await Subject.findAll();
                let resData = {};
                resData.subjects = [];
                let teacher = new Set();

                for(let i = 0; i < data.length; i++){
                    let dataTeacher = await Teacher.findAll({where: {subject_id: data[i].subject_id}});

                    for(let j = 0; j < dataTeacher.length; j++){
                    teacher.add(`${dataTeacher[j].first_name} ${dataTeacher[j].last_name[0]}. ${dataTeacher[j].patronymic[0]}.`);
                    }
                    resData.subjects.push({...data[i].dataValues, teachers: [...teacher].join(' ,')});
                }
                
                let dataTask = await sequelize.query(`SELECT tasks.task_id, tasks.task, tasks.task_type_id, tasks.theme_id, tasks.date, tasks.end_date, tasks.description, tasks.link, themes.theme, subjects.subject, task_types.task_type FROM tasks JOIN subjects JOIN themes JOIN task_types ON tasks.subject_id = subjects.subject_id AND tasks.theme_id = themes.theme_id AND tasks.task_type_id = task_types.task_type_id`, { type: QueryTypes.SELECT });

                let newDataTask = dataTask.map(item => {
                    let newItem = {...item};
                    newItem.date = newItem.date.toLocaleDateString();
                    newItem.end_date = newItem.end_date.toLocaleDateString();
                    return newItem;
                })

                resData.tasks = newDataTask;

                res.json(resData);
            }

            if(access_lvl === 2){
                const data = await Teacher.findAll({where: {user_id: user}});
                let resData = [];
                for(let i = 0; i < data.length; i ++){
                    let data1 = await Subject.findAll({where: {subject_id: data[i].subject_id}});
                    for(let j = 0; j < data1.length; j++){
                        resData.push(data1[j].dataValues);
                    }
                }
                console.log(resData);
                res.json(resData);
            }
        }
        catch(e){
            res.status(500).json({message: 'ЧТо-то пошло не так subj, попробуйте снова'})
        }
    }
);


module.exports = router;