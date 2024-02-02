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

module.exports = router;