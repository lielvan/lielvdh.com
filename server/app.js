const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      mongoose      = require('mongoose'),
      MongoStore    = require('connect-mongo')(session),
      cors          = require('cors'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      middleware    = require('./middleware');

// Models
const User = require('./models/user');

// ROUTES
const indexRoutes    = require('./routes/api/index'),
      chaptersRoutes = require('./routes/api/chapters'),
      motosRoutes    = require('./routes/api/motos');

// MongoDB Connection
const url = process.env.DATABASE_URL || "mongodb+srv://lvdh:lvdH1856@lielvdh-cluster-8naqb.mongodb.net/lielvdh?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Connected to db");
}).catch(err => {
    console.log(`Error: ${err}`);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Passport
app.use(session({
  secret: "lvdhsession",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: url,
    touchAfter: 24 * 3600 // time period in seconds
  })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/api', indexRoutes);
app.get('/api/user', middleware.isLoggedIn, async (req, res) => {
  console.log("Current User: " + req.user);
  try {
    let currentUser = await User.findById(req.user._id);
    console.log([currentUser, req.session]);
    res.send({user: currentUser});
  } catch (error) {
    console.log(error);
  }
});
app.use('/api/chapters', chaptersRoutes);
app.use('/api/motos', motosRoutes);




// Handle Production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));