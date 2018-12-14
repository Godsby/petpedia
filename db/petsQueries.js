const {db} = require('./index.js');

const getAllPets = (req, res, next) => {
  db.any('SELECT * FROM pets')
  .then((data) => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Received All Pets'
    })
  })
  .catch((err) => {
    return next(err);
  })
}

const getSinglePet = (req, res, next) => {
  let petId = parseInt(req.params.id);
  db.one('SELECT * FROM pets WHERE id = $1', [petId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Received ONE PET!'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const createPet = (req, res, next) => {
  if (req.body.owner_id ) {
    req.body.owner_id = parseInt(req.body.owner_id);
  } else {
    req.body.owner_id = NULL;
  }
  req.body.age = req.body.age ? parseInt(req.body.age): NULL;

  db.none('INSERT INTO pets(owner_id, species, name, age) VALUES(${owner_id}, ${species}, ${name},${age})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'ADDED a PET'
    })
  })
  .catch(err => {
    return next(err);
  })

}

const updatePet = (req, res, next) => {
  db.none('UPDATE pets SET owner_id = ${owner_id}, species = ${species}, age = ${age}, name = ${name} WHERE id = ${id}', {
    owner_id: parseInt(req.body.owner_id),
    species: req.body.species,
    age: req.body.age,
    name: req.body.name,
    id: parseInt(req.params.id)
  })
  .then(()=> {
    res.status(200)
    .json({
      status: 'success',
      message: 'You updated a PET!'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const deletePet = (req, res, next) => {
  let petId = parseInt(req.params.id);
  db.result('DELETE FROM pets WHERE id = $1', petId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You kill the pet!!',
      result: result
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
  getAllPets, 
  getSinglePet, 
  createPet, 
  updatePet, 
  deletePet
 };