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


/* GET specific product based on id in URL params */
router.get('/:id', (req, res) => {
    let id = req.params.id;
    req.app.locals.db.collection('products').find().toArray()
    .then(products => {
        let product = products.find(product => product._id == id);
        if (product) {
            res.json(product)
        }
        else {
            res.status(404).json({message: 'Product not found'});
        }
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

router.post('/add', (req, res) => {
    req.app.locals.db.collection('products').insertOne(req.body)
    .then(result => {
        console.log(result)
        res.status(201).json({ message: "Product added successfully" });
    })
})

module.exports = router;