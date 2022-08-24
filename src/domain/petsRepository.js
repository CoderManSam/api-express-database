const { getAll, postNew, getById, updateById, deleteById } = require("./repository")


async function getAllPets(queryParams) {

    return getAll(queryParams, 'pets')
}

function postNewPet(queryParams) {

    return postNew(queryParams, 'pets')
}

async function getPetById(queryParams) {

    return getById(queryParams, 'pets')
}

async function updatePetById(queryParams, queryBody) {

    return updateById(queryParams, queryBody, 'pets')
}

async function deletePetById(queryParams) {

    return deleteById(queryParams, 'pets')
}


module.exports = {
    getAllPets,
    postNewPet,
    getPetById,
    updatePetById,
    deletePetById
}