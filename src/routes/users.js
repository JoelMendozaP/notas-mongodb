const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
  }));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(name.length <= 0){
        errors.push({text: 'Porfavor Ingresa tu nombre.'});
    }

    if(password != confirm_password) {
      errors.push({text: 'Las contraseñas no coinciden.'});
    }
    if(password.length < 4) {
      errors.push({text: 'La contraseña debe ser almenos de 4 caracteres.'})
    }
    if(errors.length > 0){
      res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
      // Look for email coincidence
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
        req.flash('error_msg', 'El Email ya esta en uso.');
        res.redirect('/users/signup');
      } else {
        // Saving a New User
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Te has registrado.');
        res.redirect('/users/signin');
      }
    }
  });

  router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
  });
module.exports = router;