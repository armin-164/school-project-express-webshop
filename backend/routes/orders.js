var express = require('express');
var router = express.Router();

/* POST method to add an order to 'orders' collection */
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


/* GET all orders. USE THE TOKEN BELOW TO TEST*/
router.get('/all/:token', (req, res) => {

    if (req.params.token != process.env.API_TOKEN) {
        return res.status(401).json( {message: "Unauthorized"} );
    }

    req.app.locals.db.collection('orders').find().toArray()
    .then(data => {

        // Check if empty
        if (data.length >= 1) {
            res.json(data)
        }
        else {
            res.status(404).json({ message: "Orders not found"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

module.exports = router;