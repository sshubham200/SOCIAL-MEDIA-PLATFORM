const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controller/user_controller');
const User = require('../models/user');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession);

router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),usersController.createSession);

module.exports = router;