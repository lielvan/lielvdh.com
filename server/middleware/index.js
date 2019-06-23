let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated');
  } else {
    return next()
  }
}

module.exports = middlewareObj;
