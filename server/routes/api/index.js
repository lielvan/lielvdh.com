const express  = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../../models/user');
      middleware = require('../../middleware');

//********************************
//* AUTH ROUTES
//*********************************

// Register
router.post('/register', async (req, res) => {
  const newUser = new User({username: req.body.username});
  await User.register(newUser, req.body.password, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.sendStatus(200);
      });
    }
  })
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      console.log(err);
      return next(err);
    }

    if(!user) {
      console.log(info);
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.logIn(user, err => {
      if(err) { return next(err); }
      console.log(user);
      res.status(200).send({user: user});
    });
  })(req, res, next);
});

// Logout
router.get('/logout', async (req, res) => {
  await req.logout();
  console.log("Logged out");
  return res.send();
});

module.exports = router;