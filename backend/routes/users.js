var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
  .then(users => res.json(users))
});

module.exports = router;
