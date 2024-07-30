const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('./models/User'); 
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => { 

      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        let user = await User.findOne({  googleId: id  });

        if (!user) {
          user = new User({
              googleId: id,
              firstName: displayName.split(' ')[0],
              lastName: displayName.split(' ')[1],
              email,
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err, false);
  }
});

module.exports = passport; 