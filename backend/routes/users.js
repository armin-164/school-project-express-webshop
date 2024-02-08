var express = require('express');
var router = express.Router();
const crypto = require('crypto');

/* GET users listing. */
router.get('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
  .then(users => {

    // Check if users array has 1 or more users
    // else, send a 404.
    if (users.length >= 1) {
      let newUsers = users.map(user => {
        delete user.password;
        return user;
      })
      res.json(newUsers);
    }

    else {
      res.status(404).json({ message: 'Users not found'})
    }
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: "Internal Service Error"})
  })
});

/* Find and return user if they exist*/
router.post('/', (req, res) => {
  req.app.locals.db.collection("users").find().toArray()
    .then(users => {
      let user = users.find(user => user._id == req.body.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/* Add a user to database if they don't exist already */
router.post('/add', (req, res) => {

  let userEmail = req.body.email.toLowerCase();

  req.app.locals.db.collection("users").findOne({email: userEmail})
  .then(existingUser => {

    if (existingUser) {
      return res.status(409).json({message: 'User already exists'})
    }

    // Create a Buffer from a 32-byte env variable since Buffer is one of the few
    // acceptable data types for the key argument in createCipheriv
    const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

    // Create an initialization vector fit for the AES to provide more "security"
    const iv = crypto.randomBytes(16);

    // Create a cipher object which will use the AES-256-CBC encryption, the
    // secret key to control the encryption algorithm which makes decryption possible.
    // Also add the iv 
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);

    // Use the cipher object to encrypt the password sent in. The 2nd parameter
    // is the encoding of the password sent in and the 3rd is the encoding of the return value.
    let encryptedPassword = cipher.update(req.body.password, "utf-8", "hex");

    // Add output to variable to ensure all encrypted data is in it.
    encryptedPassword += cipher.final('hex');

    
    const user = {
      name: req.body.name,
      email: userEmail,
      password: iv.toString('hex') + encryptedPassword,
    };

    req.app.locals.db.collection("users").insertOne(user)
    .then(result => {
      res.status(201).json({ message: "User added successfully"});
    });

  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

});

/* Send back userId if user exists and login details are correct */
router.post('/login', (req, res) => {
  let checkEmail = req.body.email;
  let checkPassword = req.body.password;

  req.app.locals.db.collection("users").find().toArray()
  .then(users => {
    let user = users.find(user => user.email == checkEmail);
    
    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }

    // Retrieve secretKey again
    const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    
    // Splice the iv to use for the decryption process
    const iv = Buffer.from(user.password.slice(0, 32), 'hex');

    // The rest is the encryptedPassword which we want to slice
    const encryptedPassword = user.password.slice(32);

    // The decryption process
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');

    
    if (checkPassword == decryptedPassword) {
      res.json({userId: user._id.toString()})
    }

    else {
      res.status(401).json({message: 'Wrong password'});
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  })
})

module.exports = router;
