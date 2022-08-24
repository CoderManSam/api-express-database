const { getAll, postNew, getById, updateById, deleteById } = require("./repository")


async function getAllBooks(queryParams) {

    return getAll(queryParams, 'books')
}

function postNewBook(queryParams) {

    return postNew(queryParams, 'books')
}

async function getBookById(queryParams) {

    return getById(queryParams, 'books')
}

async function updateBookById(queryParams, queryBody) {

    return updateById(queryParams, queryBody, 'books')
}

async function deleteBookById(queryParams) {

    return deleteById(queryParams, 'books')
}


module.exports = {
    getAllBooks,
    postNewBook,
    getBookById,
    updateBookById,
    deleteBookById
}