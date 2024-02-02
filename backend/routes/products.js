var express = require('express');
var router = express.Router();

/* GET all products */
router.get('/', (req, res) => {
    req.app.locals.db.collection('products').find().toArray()
    .then(products => {

        // Check if collection is empty
        if (products.length >= 1) {
            res.json(products);
        }
        else {
            res.status(404).json({message: 'Products not found'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})


module.exports = router;