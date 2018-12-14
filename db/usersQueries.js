const {db} = require('./index.js');

const getAllUsers = (req, res, next) => {
  db.any('SELECT * FROM users')
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Received All Users'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getSingleUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE id = $1', [userId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Received ONE User!'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const allPetsForSingleUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any('SELECT pets.* FROM users JOIN pets ON users.id = owner_id WHERE users.id = $1', [userId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'You get ALL PET for a SINGLE User'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const createUser = (req, res, next) => {

  db.none('INSERT INTO users(username, email) VALUES(${username}, ${email})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'ADDED a USER!'
    })
  })
  .catch(err => {
    return next(err);
  })

}

const updateUser = (req, res, next) => {
  db.none('UPDATE users SET username = ${username}, email = ${email} WHERE id = ${id}', {
    username: req.body.username,
    email: req.body.email,
    id: parseInt(req.params.id)
  })
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Your updated A USER!',
    })
  })
  .catch(err => {
    return next(err);
  })
}

const deleteUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result('DELETE FROM users WHERE id = $1', userId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You kill the User!!',
      result: result
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
  getAllUsers, 
  getSingleUser,
  allPetsForSingleUser,
  createUser,
  updateUser,
  deleteUser
 };