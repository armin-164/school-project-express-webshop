var express = require('express');
var router = express.Router();

/* POST method to create category. Key is needed */
router.post('/add', (req, res) => {
    let category = req.body;
    
    if (!category.hasOwnProperty('token')) {
        res.status(401).json( {message: "Key/token is missing"} );
    }

    else {
        req.app.locals.db.collection('categories').insertOne(category)
        .then(result => {
            console.log(result);
            res.status(201).json( {message: "Category added successfully"} )
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        })
    }
})

/* GET categories from 'categories' collection */
router.get('/', (req, res) => {
    req.app.locals.db.collection('categories').find().toArray()
    .then(data => {
        if (data.length >= 1) {
            res.json(data);
        }
        else {
            res.status(404).json( {message: "Categories not found"} )
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

module.exports = router;