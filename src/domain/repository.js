const db = require("../../db")
const { buildWhereClause } = require("./utils")

async function getAll(queryParams, database) {
    const query = buildWhereClause(`select * from ${database}`, Object.keys(queryParams))

    return (await db.query(query, Object.values(queryParams))).rows
}

module.exports = {
    getAll
}