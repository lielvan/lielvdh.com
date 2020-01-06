const express  = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../../models/user');
      middleware = require('../../middleware');
      aws = require('aws-sdk');

//********************************
//* AWS S3 CONFIG / ROUTES
//*********************************
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';

router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = decodeURIComponent(req.query['file-name']);
  console.log(`RAW: ${req.query['file-name']}. DECODED: ${fileName}`);
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log(returnData);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

//********************************
//* AUTH ROUTES
//*********************************

// Register
// router.post('/register', async (req, res) => {
//   const newUser = new User({username: req.body.username});
//   await User.register(newUser, req.body.password, (err, user) => {
//     if(err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, () => {
//         res.sendStatus(200);
//       });
//     }
//   })
// });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      console.log(`Error: ${err}`);
      return res.send(err);
      // return next(err);
    }

    if(!user) {
      console.log(`Info: ${info}`);
      return res.status(400).send(info);
      // return res.status(400).send([user, "Cannot log in", info]);
    }

    req.logIn(user, err => {
      if(err) { 
        console.log(`LogIn Error: ${err}`);
        return res.send(err); 
      }
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