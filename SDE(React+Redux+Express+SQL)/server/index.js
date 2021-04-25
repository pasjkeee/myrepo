const express = require('express');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const cookieParser = require('cookie-parser');

const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = 3030;
const sequelize = require('./utils/database');
const routes = require('./routes/auth.routes');
const routesTasks = require('./routes/tasks.routes');
const routesCourses = require('./routes/courses.routes');


const options = {
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PAS,
	database: process.env.DB_NAME,
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

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',  
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(
    session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
	    saveUninitialized: false,
        cookie: {
			httpOnly: true,
            maxAge: 3600000, 
            expires: 3600000
        }
    })
);

app.use('/api/auth', routes);
app.use('/api/tasks', routesTasks);
app.use('/api', routesCourses);

async function start () {
    try {
        await sequelize.sync();
        app.listen(PORT);
        console.log(PORT);
    } catch (e) {
        console.log(e.message);
        process.exit();
    }
}

start();