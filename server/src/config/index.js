require('dotenv').config();

const { Pool } = require('pg')

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
};

const pool = new Pool(dbConfig);

const port = process.env.PORT || 7777;

module.exports = {
    port,
    pool
}