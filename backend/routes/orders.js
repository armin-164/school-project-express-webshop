var express = require('express');
var router = express.Router();

router.post('/add', (req, res) => {
    req.app.locals.db.collection('orders').insertOne(req.body)
    .then(result => {
        console.log(result);
        res.json({message: 'Product added successfully'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

module.exports = router;