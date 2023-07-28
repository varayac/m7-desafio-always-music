const { Pool } = require('pg');
require('dotenv').config();

const connPool = {
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	max: process.env.PG_MAX,
	idleTimeoutMillis: process.env.IDLETIMEOUTMILLIS,
	connectionTimeoutMillis: process.env.CONNECTIONTIMEOUTMILLIS,
};

const pool = new Pool(connPool);

module.exports = {
	pool,
};
