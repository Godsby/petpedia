const express = require('express');
const router = express.Router();
const {getAllPets, getSinglePet, createPet, updatePet, deletePet} = require('../db/petsQueries.js')

router.get('/', getAllPets);
router.get('/:id', getSinglePet);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;