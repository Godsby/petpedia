const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pets = require('./routes/pets.js');
const users = require('./routes/users.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/pets', pets);
app.use('/users', users);


app.get('/', (req, res) => {
  res.send('This is the HOMEPAGE')
})

app.listen(3000, () => {
  console.log('Listening to PORT 3000');
})