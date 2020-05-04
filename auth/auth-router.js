const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js')

const db = require('./model.js');

router.post('/register', (req, res) => {
  // implement registration
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash

  console.log(newUser)

  db.register(newUser)
  .then(info => res.status(201).json(info))
  .catch(err => res.status(500).json({errMessage: "Database Error"}))
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = secrets.jwt_secret;
  const options = {
    expiresIn: '10d'
  }
  return jwt.sign(payload, secret, options)
}


router.post('/login', (req, res) => {
  // implement login

  const {username, password} = req.body;

  db.login({ username })
  .first()
  .then(info => {
    if(info && bcrypt.compareSync(password, info.password)) {
      const token = generateToken(info)

      res.status(200).json({
        message: `welcome ${info.username}`,
        jwt_token: token
      });
    } else {
      res.status(401).json({message: 'invalid creds'})
    }
  })
  .catch(err => { 
    res.status(500).json({message: 'Oops... database issue', error: err})
  })

});

module.exports = router;
