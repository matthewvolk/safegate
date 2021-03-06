const express = require('express');
const passport = require('passport');
const Guest = require('../../models/guest');

// Guest Index (Dashboard) Controller
function index(req, res) {
  res.render('pages/guest/dashboard', { 
    guestSignupMessage: req.flash('guestSignupSuccessMessage'),
    guestEmail: req.user.localStrategy.email,
    guestFirstName: req.user.firstName,
    guestLastName: req.user.lastName,
  });
}

// GET Guest Registration Page
function getSignup(req, res) {
  res.render('pages/guest/signup', { 
    guestSignupMessage: req.flash('guestSignupFailureMessage'),
  });
}

// Handle Guest Registration POST Request
function postSignup(req, res, next) {
  passport.authenticate('local-guest-signup', {
    successRedirect : '/guest/',
    failureRedirect : '/guest/signup',
    failureFlash : true
  })(req, res, next) // immediately invoke passport.authenticate
}

// GET Guest Login Page
function getLogin(req, res) {
  res.render('pages/guest/login', { 
    noGuestEmailFoundOnLogin: req.flash('noGuestEmailFoundOnLogin'),
    incorrectGuestPassword: req.flash('incorrectGuestPassword')
  });
}

// Handle Guest Login POST Request
function postLogin(req, res, next) {
  passport.authenticate('local-guest-login', {
    successRedirect: '/guest/',
    failureRedirect: '/guest/login',
    failureFlash: true
  })(req, res, next);
}

function getUser(req, res) {
  res.send(req.user);
}

// Export Guest Controllers
module.exports = {
  index: index,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogin: getLogin,
  postLogin: postLogin,
  getUser: getUser,
}
