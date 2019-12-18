var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const firestoreUsers = require('../helpers/firestore-util/db-users');

router.post('/', createUserIfNotExist);

async function createUserIfNotExist(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const userExists = await firestoreUsers.checkUserExists(username);
  if (userExists) {
    res.status(409).send('username taken');
  } else {
    createUser(username, password).then(() => {
      res.status(200).send('created')
    });
  }
}

function createUser(username, password) {
  return bcrypt.hash(password, 10)
    .then((hash) => {
      return firestoreUsers.addUser(username, hash);
    })
}



module.exports = router;