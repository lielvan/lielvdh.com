const express  = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../../models/user');
      middleware = require('../../middleware');

// Auth Routes      
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
      res.send("Logged In");
    });
  })(req, res, next);
});

router.get('/logout', async (req, res) => {
  await req.logout();
  console.log("Logged out");
  return res.send();
});



module.exports = router;