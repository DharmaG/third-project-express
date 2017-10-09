const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model');

const router = express.Router();


router.post('/process-signup', (req, res, next) => {
  if( !req.body.signupFullName ||
      !req.body.signupUserName ||
      !req.body.signupPassword) {

    res.status(400).json(
      { errorMessage: 'We need both username and password' }
        );
        return;
    }

    UserModel.findOne(
      { username: req.body.signupUsername },
      (err, userFromDb) => {
        if (err) {
          console.log('User find error', err);
          res.status(500).json({ errorMessage: 'Error finding username' });
          return;
        }
        if (userFromDb) {
          res.status(400).json({ errorMessage: 'Username was taken' });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(req.body.signupPassword, salt);

        const theUser = new UserModel({
          fullName: req.body.signupFullName,
          username: req.body.signupUserName,
          encryptedPassword: hashPass,
          // userImage: req.body.sigupUserImage
        });

          console.log(theUser.save());
        theUser.save((err) => {

          if(err) {
            console.log('User save error', err);
            res.status(500).json({ errorMessage: 'Error saving user. ' });
            return;
          }

          req.login(theUser, (err) => {
            if (err){
            console.log('User auto-login error', err);
            res.status(500).json({ errorMessage: 'Error loggin in user' });
            return;
          }
            // clear out the password before sending the user
            theUser.encryptedPassword = undefined;
            res.status(200).json(theUser);
          });
        });

      }
    );

});

router.post('/process-login', (req, res, next) => {
  const customAuthCallback =
  passport.authenticate('local', (err, theUser, extraInfo) => {
    if(err) {
      res.status(500).json({ errorMessage: 'Login failed. 😷' })
    }

    if (!theUser) {
      res.status(401).json({ errorMessage: extraInfo.message });
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ errorMessage: 'Login failed' });
        return;
      }

      theUser.encryptedPassword = undefined;
      res.status(200).json(theUser);
    });
  });// passportauthenticate('local')
  customAuthCallback(req, res, next);
});// POST /api/process-login

router.delete('/logout', (req, res, next) => {
  //"req.logout" is defined by Passport
    req.logout();
    res.status(200).json({ successMessage: 'Log out success! ' });
 });

 router.get('/checklogin', (req, res, next) => {
   let amILoggedIn = true;

   if (req.user) {
     req.user.encryptedPassword = undefined;
     amILoggedIn = true;
   }
   console.log('THE USER');
   console.log(req.user);
   res.status(200).json(
     {
       isLoggedIn: Boolean(req.user),
       userInfo: req.user
     }
   );
 });

module.exports = router;
