var knex = require('knex');

var db = knex({
    client: "mysql",
    connection: {
        host: "skus-storage.crnrqk57qmx5.ap-southeast-1.rds.amazonaws.com",
        user: "cresowadmin",
        password: "cresow$admin",
        database: "cresowdb"
    }
});

module.exports = db;