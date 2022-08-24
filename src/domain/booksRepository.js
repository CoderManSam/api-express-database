// const db = require("../../db")
const { getAll } = require("./repository")
// const { buildWhereClause } = require("./utils")


async function getAllBooks(queryParams) {

    return getAll(queryParams, 'books')
}

module.exports = {
    getAllBooks
}