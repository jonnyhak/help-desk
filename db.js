const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Funboy2424",
    host: "localhost",
    port: 5432,
    database: "pernhelpdesk"
});

module.exports = pool;