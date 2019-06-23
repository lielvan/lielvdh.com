let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  console.log(`isAuth: ${req.isAuthenticated()}`);
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated');
  } else {
    return next();
  }
}

module.exports = middlewareObj;
