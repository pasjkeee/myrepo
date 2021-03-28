const {User, Subject, Teacher, Task, Task_type, Event} = require('../models/todo');
const {Router, response} = require('express');
const router = Router();
const Todo = require('../models/todo');
const bcrypt = require ('bcrypt-nodejs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');

//Создание новой задачи
router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ], 
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Некорректные данные при регистрации'})
        }

        const {email, password} = req.body;

        const data = await User.findOne({email});

        if(data){
            return res.status(400).json({message: "Такой пользователь уже существует"})
        }

        const hashedPass = await bcrypt.hash(password, "12");
        const user = new Todo({email, password: hashedPass})

        await user.save();

        res.status(201).json({message: "Пользователь создан"});

    } 
    catch (e) {
        res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
    }
})


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

        console.log(req.sessionID, "hi");

        const {email, pas} = req.body;

        const data = await User.findOne({where: { email: email }});

        console.log(data);

        if(!data){
            return res.status(400).json({message: "Пользователь не найден"})
        }
        
        
        let isMatch = true; 
        let hashedPass = await bcrypt.genSalt(12, async function(err, salt) {
            
                await bcrypt.hash(pas, salt, null, async function(err, hash) {
                    
                     await bcrypt.compare(pas, data.dataValues.password, function(err, result) {
                         console.log(result);
                            if(!result){
                                isMatch = false;
                            }
                            if(!isMatch){
                                return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
                            }
    
                            const token = jwt.sign({userId: data.user_id}, "pavel", { expiresIn: '15m' });

                            req.session.authenticated = true;
                            req.session.user = data.user_id;
                            req.session.access_lvl = data.access_lvl;
                        
                            console.log(req.session);
                            res.json({ token, userId: data.user_id});
                        });
                }
            ); 
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

                let newItem;
                let dataTaskType = await Task_type.findAll();
                let dataTasks = await Task.findAll().then(
                    item => {
                        newItem = item.map(prod => prod.dataValues);
                        
                        newItem.forEach(itemDate => {
                            itemDate.date = itemDate.date.toLocaleDateString();
                            itemDate.end_date = itemDate.end_date.toLocaleDateString();
                        })
                            
                        data.forEach(dataItem => {
                            
                            newItem = newItem.map( itemTask => {

                                if(dataItem.dataValues.subject_id === itemTask.subject_id){
                                    itemTask.subject = dataItem.dataValues.subject;
                                }

                                return itemTask;
                            });
                            
                        });

                        dataTaskType.forEach(dataTaskTypeItem => {
                            newItem = newItem.map( itemTask => {

                                if(dataTaskTypeItem.dataValues.task_type_id === itemTask.task_type_id){
                                    itemTask.task_type = dataTaskTypeItem.dataValues.task_type;
                                }

                                return itemTask;
                            });
                        })
                    }
                )

                resData.tasks = newItem;

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