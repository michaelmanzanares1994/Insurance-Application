// Step 8B: Create Passport Strategy. This will need jwt, mongoose, user model, and keys
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

// In server.js we passed in passport. Here, we are using it as a parameter
module.exports = passport => {
  // We get back jwt_payload and we're able to use the id to compare
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
