const express = require('express');
const passport = require('passport');

function index(req, res) {
  res.send('Guest Dashboard')
}

function getSignup(req, res) {
  res.render('pages/guest/signup', { message: req.flash('signupMessage') })
}

function postSignup(req, res, next) {
  passport.authenticate('local-guest-signup', {
    successRedirect : '/guest/signup', // redirect to the secure profile section
    failureRedirect : '/guest/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  })(req, res, next)
}

module.exports = {
  index: index,
  getSignup: getSignup,
  postSignup: postSignup
}
