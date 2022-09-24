/*
global process
*/
const pgp = require("pg-promise")({})
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:nimda@localhost:5432/shoes_api"
const config = {
    connectionString
}

if(process.env.NODE_ENV == "production"){
    config.ssl = {
        rejectUnauthorized: false
    }
}

const db = pgp(config)

module.exports = db