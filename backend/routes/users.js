var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
  .then(users => res.json(users))
  .catch(err => {
    console.log(err);
    res.status(500).json({err: "Internal Service Error"})
  })
});

router.post('/add', (req, res) => {
  req.app.locals.db.collection("users").insertOne(req.body)
    .then(result => {
      console.log(result);
      res.status(201).json({ message: "User added successfully" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


module.exports = router;
