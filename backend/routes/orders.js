var express = require('express');
var router = express.Router();

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

/* Return all orders for a specific user */
router.post('/user', (req, res) => {

    // Check if token does not exist OR equal to the API token 
    if (!req.body.hasOwnProperty('token') || req.body.token != process.env.API_TOKEN) {
        return res.status(401).json( {message: "Unauthorized"} );
    }

    req.app.locals.db.collection('orders').find().toArray()
    .then(result => {
        let foundOrders = result.filter(obj => req.body.user == obj.user);
        
        if (foundOrders) {
            return res.json(foundOrders);
        }

        else {
            res.status(404).json({message: 'Orders not found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})



module.exports = router;