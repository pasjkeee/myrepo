const express = require('express');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


const app = express();
const PORT = process.env.PORT || 3030;
const sequelize = require('./utils/database');
const routes = require('./routes/auth.routes');
const routesTasks = require('./routes/tasks.routes');


const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'diplom',
	clearExpired: true,
	checkExpirationInterval: 900000,
	expiration: 86400000,
	createDatabaseTable: true,
	connectionLimit: 100,
	endConnectionOnClose: true,
	charset: 'utf8',
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};

var sessionStore = new MySQLStore(options);

app.use(express.json({ extended: true }));

//app.use(express.cookieDecoder());
app.use(
    session({
        key: 'session_cookie_name',
        secret: 'pavel',
        store: sessionStore,
        resave: false,
	    saveUninitialized: false,
        cookie: {
            maxAge: 600000, 
            expires: 600000
        }
    })
);

app.use('/api/auth', routes);
app.use('/api/tasks', routesTasks);

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