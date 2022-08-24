const express = require('express')
const router = express.Router()
const db = require("../../db");
const { getAllPets, postNewPet, getPetById, updatePetById, deletePetById } = require("../domain/petsRepository")

router.get('/', async (req, res) => {

    const allPets = await getAllPets(req.query)

    res.json({
        pets: allPets
    })
})

router.post('/', (req,res) => {

    const {name, age, type, breed, microchip} = req.body

    if(!name || !age || !type || !breed || !microchip) {
        return res.status(400).json({error: "Missing fields in request body"})
    }

    postNewPet(req.body)

    const newPet = {...req.body, id: 0}
  
    res.status(201).json({"pet": newPet})
})

router.get('/:id', async (req, res) => {

    const pet = await getPetById(req.params)

    res.json({
        pet: pet
    })
})

router.put('/:id', async (req, res) => {

    const pet = await updatePetById(req.params, req.body)

    res.status(201).json({
        pet: pet
    })
})

router.delete('/:id', async (req, res) => {

    const pet = await deletePetById(req.params)

    res.status(201).json({
        pet: pet
    })
})

module.exports = router
