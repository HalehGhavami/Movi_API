const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('../helpers/passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //username you are encoding in JWT
    expiresIn: '7d',
    algorithm: 'HS256', //algorithm used to "sign" or encode value of JWT
  });
};

/* POST login */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
