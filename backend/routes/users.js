var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
  .then(users => {

    if (users) {
      let newUsers = users.map(user => {
        delete user.password;
        return user;
      })
      res.json(newUsers);
    }

    else {
      res.status(404).json({ message: 'Users not found'})
    }
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: "Internal Service Error"})
  })
});

/* Find and return user */
router.post('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
    .then(users => {
      let user = users.find(user => user._id == req.body.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/* Add a user to database */
router.post('/add', (req, res) => {
  req.app.locals.db.collection("users").findOne({email: req.body.email})
  .then(existingUser => {

    if (existingUser) {
      return res.status(409).json({message: 'User already exists'})
    }

    req.app.locals.db.collection("users").insertOne(req.body)
    .then(result => {
      console.log(result);
      res.status(201).json({ message: "User added successfully" });
    });

  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

});


router.post('/login', (req, res) => {
  let checkEmail = req.body.email;
  let checkPassword = req.body.password;

  req.app.locals.db.collection("users").find().toArray()
  .then(users => {
    let user = users.find(user => user.email == checkEmail && user.password == checkPassword);
    
    if (user) {
      res.json({userId: user._id.toString()})
    }

    else {
      res.status(401).json({message: 'Wrong email/password'});
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  })
})

module.exports = router;
