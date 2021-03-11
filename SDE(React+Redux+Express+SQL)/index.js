const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const sequelize = require('./utils/database');
const routes = require('./routes/auth.routes');

app.use(express.json({ extended: true }))

app.use('/api/auth', routes);

async function start () {
    try {
        await sequelize.sync();
        app.listen(PORT);
    } catch (e) {
        console.log(e.message);
        process.exit();
    }
}

start();