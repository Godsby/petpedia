const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser, createUser, allPetsForSingleUser, updateUser, deleteUser} = require('../db/usersQueries.js');

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.get('/:id/pets', allPetsForSingleUser);
router.post('/',createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;