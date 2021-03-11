const {User} = require('../models/todo');
const {Router, response} = require('express');
const router = Router();
const Todo = require('../models/todo');
const bcrypt = require ('bcrypt-nodejs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

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
    
    
                            res.json({ token, userId: data.user_id })
                        });
                }
            ); 
        });
    } 
    catch (e) {
        res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
    }
});

// router.get('/subjects', 
// async (req, res) => {
//     console.log(req.url, "hi");
//         try {
//             const {userGroupId, userId} = req.body;
//             if(userGroupId === 1){
//                 const data = await Subject.findAll();
//                 console.log(data);
//             }

//             if(userGroupId === 2){
//                 const data = await Teacher.findAll({where: {userId: userId}});
//                 console.log(data);
//             }
//         }
//         catch(e){
//             res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
//         }
//     }
// );


module.exports = router;