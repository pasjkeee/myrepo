const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3030;
const sequelize = require('./utils/database');
const routes = require('./routes/auth.routes');

app.use(express.json({ extended: true }));

//app.use(express.cookieDecoder());
app.use(
    session({
      secret: 'pavel',
      saveUninitialized: true,
      rolling: true
    })
);

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