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

/* GET products based on category */
router.get('/category/:id', (req, res) => {
    req.app.locals.db.collection('products').find().toArray()
    .then(products => {
        let newArray = products.filter(product => product.category == req.params.id);
        if (newArray.length >= 1) {
            res.json(newArray);
        }
        else {
            res.status(404).json({ message: "Category is empty or nonexistent" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

/* POST product to 'products' collection */
router.post('/add', (req, res) => {
    if (!req.body.hasOwnProperty('token')) {
        res.status(401).json({ message: "Token is missing"} );
    }
    else {
        req.app.locals.db.collection('products').insertOne(req.body)
         .then(result => {
            console.log(result)
            res.status(201).json({ message: "Product added successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        })
    }   
})

module.exports = router;