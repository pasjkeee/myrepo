const {Router, response} = require('express');
const router = Router();
const Todo = require('../models/todo');
const bcrypt = require ('bcrypt-nodejs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database');
const { QueryTypes } = require('sequelize');


router.get('/tasks',
async (req, res) => {
    try {
        console.log(req.query);
        console.log(req.session);

        let dataTask = await sequelize.query(`SELECT tasks.subject_id, tasks.task_id, tasks.task, tasks.date, tasks.end_date, tasks.description, subjects.subject, themes.theme, task_types.task_type, tasks.theme_id FROM tasks JOIN subjects JOIN themes JOIN task_types ON tasks.subject_id = subjects.subject_id AND tasks.theme_id = themes.theme_id AND tasks.task_type_id = task_types.task_type_id WHERE tasks.subject_id = ${req.query.subjId}`, { type: QueryTypes.SELECT });

        let newSataTask = dataTask.map(item => {
            let newItem = {...item};
            newItem.date = newItem.date.toLocaleDateString();
            newItem.end_date = newItem.end_date.toLocaleDateString();
            return newItem;
        })
        
        console.log(dataTask);
        res.json(newSataTask);

    }
    catch(e){
        res.status(500).json({message: 'ЧТо-то пошло не так subj, попробуйте снова'})
    }
});

module.exports = router;