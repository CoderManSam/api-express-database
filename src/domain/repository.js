const db = require("../../db")
const { buildWhereClause, buildInsertInto, buildUpdateAndSet } = require("./utils")

async function getAll(queryParams, database) {
    const query = buildWhereClause(`select * from ${database}`, Object.keys(queryParams))

    return (await db.query(query, Object.values(queryParams))).rows
}

function postNew(queryParams, database) {
    const query = buildInsertInto(queryParams, database)

    const values = [...Object.values(queryParams)]

   return db.query(query, values)
}

async function getById(queryParams, database) {
    // const query = 'select * from books WHERE id = $1'

    const query = buildWhereClause(`select * from ${database}`, Object.keys(queryParams))

    const {id} = queryParams
    const idAsNumber = Number(id)

    const params = [idAsNumber]

    const qResult = await db.query(query, params)

    return qResult.rows[0]
}

async function updateById(queryParams, queryBody, database) {
    const sql = buildUpdateAndSet(queryParams, queryBody, database)

    // const sql = `UPDATE ${database} SET title = $2, type = $3, author = $4, topic = $5, publicationDate = $6, pages = $7 WHERE id = $1 RETURNING *;`

    // const {id} = queryParams
    // const idAsNumber = Number(id)

    // const {title, type, author, topic, publicationDate, pages} = queryBody
    // const pagesAsNumber = Number(pages)

    // const params = [idAsNumber, title, type, author, topic, publicationDate, pagesAsNumber]

    const values = [...Object.values(queryParams), ...Object.values(queryBody)]

    // const bodyValues = Object.values(queryBody)

    // bodyValues.forEach()

    const qResult = await db.query(sql, values)

    return qResult.rows[0]
}

async function deleteById(queryParams, database) {
    // let sqlInitialQuery = 'SELECT * from books WHERE id = $1;'

    const sqlInitialQuery = buildWhereClause(`SELECT * from ${database}`, Object.keys(queryParams))

    // let sqlQuery = `DELETE FROM books WHERE id = $1;`

    const sqlQuery = buildWhereClause(`DELETE from ${database}`, Object.keys(queryParams))

    const {id} = queryParams
    const idAsNumber = Number(id)

    const params = [idAsNumber]

    const qInitialResult = await db.query(sqlInitialQuery, params)

    await db.query(sqlQuery, params)

    return qInitialResult.rows[0]
}

module.exports = {
    getAll,
    postNew,
    getById,
    updateById,
    deleteById
}