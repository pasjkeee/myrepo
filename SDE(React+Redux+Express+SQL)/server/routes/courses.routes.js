const {Router, response} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const sequelize = require('../utils/database');
const { QueryTypes } = require('sequelize');


router.post('/postsubject', 
async (req, res) => {
        try {
            let token;
            console.log(req.cookies);
            const cookiesStr = `${req.cookies.session_cookie_name}`.slice(2, 12);
            const dataCookies = await sequelize.query(`SELECT data FROM sessions WHERE session_id LIKE '${cookiesStr}%'`, { type: QueryTypes.SELECT });
            for (let key of dataCookies){
                let k = key['data'];
                token = k.split('"data":"')[1].slice(0, -2);
            }
            let decoded = jwt.decode(token, "pavel");
            console.log(dataCookies);

            const {access_lvl, userId, authenticated} = decoded;

            if(!authenticated){
                res.status(401);
            }
            
            if(access_lvl === 1 || access_lvl === 2){
              
                const {text, imgNum, teachersId} = req.body;
                const newSubjTeach = [];

                const subject_id = await sequelize.query(`INSERT INTO subjects (subject, img_num) VALUES ('${text}', ${imgNum})`, { type: QueryTypes.INSERT });
                for(let i=0; i<teachersId.length; i++){
                    newSubjTeach[i] = await sequelize.query(`INSERT INTO teacher_subject (teacher_id, subject_id) VALUES (${teachersId[i]}, ${subject_id[0]})`, { type: QueryTypes.INSERT });
                }

                res.status(201);
                res.json({res: "OK"});
            }
        }
        catch(e){
            res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
        }
    }
);

router.put('/editsubject', 
async (req, res) => {
        try {
            let token;
            console.log(req.cookies);
            const cookiesStr = `${req.cookies.session_cookie_name}`.slice(2, 12);
            const dataCookies = await sequelize.query(`SELECT data FROM sessions WHERE session_id LIKE '${cookiesStr}%'`, { type: QueryTypes.SELECT });
            for (let key of dataCookies){
                let k = key['data'];
                token = k.split('"data":"')[1].slice(0, -2);
            }
            let decoded = jwt.decode(token, "pavel");
            console.log(dataCookies);

            const {access_lvl, userId, authenticated} = decoded;

            if(!authenticated){
                res.status(401);
            }
            
            if(access_lvl === 1 ){
              
                const {subject_id, text, imgNum, teachersId} = req.body;
                const newSubjTeach = [];

                const subject_idRes = await sequelize.query(`UPDATE subjects SET subject = '${text}', img_num = '${imgNum}' WHERE subject_id = ${subject_id}`, { type: QueryTypes.UPDATE });
                const oldTeachSubj = await sequelize.query(`DELETE FROM teacher_subject WHERE subject_id = ${subject_id}`, { type: QueryTypes.DELETE });
                for(let i=0; i<teachersId.length; i++){
                    newSubjTeach[i] = await sequelize.query(`INSERT INTO teacher_subject (teacher_id, subject_id) VALUES (${teachersId[i]}, ${subject_id})`, { type: QueryTypes.INSERT });
                }

                console.log(subject_idRes, oldTeachSubj, newSubjTeach);

                res.status(201);
                res.json({res: "OK"});
            }
        }
        catch(e){
            res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
        }
    }
);

router.delete('/deletesubject', 
async (req, res) => {
        try {
            let token;
            console.log(req.cookies);
            const cookiesStr = `${req.cookies.session_cookie_name}`.slice(2, 12);
            const dataCookies = await sequelize.query(`SELECT data FROM sessions WHERE session_id LIKE '${cookiesStr}%'`, { type: QueryTypes.SELECT });
            for (let key of dataCookies){
                let k = key['data'];
                token = k.split('"data":"')[1].slice(0, -2);
            }
            let decoded = jwt.decode(token, "pavel");
            console.log(dataCookies);

            const {access_lvl, userId, authenticated} = decoded;

            if(!authenticated){
                res.status(401);
            }
            
            if(access_lvl === 1 ){
              
                const {subject_id} = req.body;

                const subject_idRes = await sequelize.query(`DELETE FROM subjects WHERE subject_id = ${subject_id}`, { type: QueryTypes.DELETE });
                const oldTeachSubj = await sequelize.query(`DELETE FROM teacher_subject WHERE subject_id = ${subject_id}`, { type: QueryTypes.DELETE });

                console.log(subject_idRes, oldTeachSubj);

                res.status(201);
                res.json({res: "OK"});
            }
        }
        catch(e){
            res.status(500).json({message: 'ЧТо-то пошло не так, попробуйте снова'})
        }
    }
);


module.exports = router;