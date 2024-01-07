const express = require('express');
const router = express.Router();
const commentController = require('../controller/comments_controller');
const Passport = require('passport');

router.post('/create',Passport.checkAuthentication,commentController.create)
router.get('/destroy/:id',Passport.checkAuthentication,commentController.destroy);
module.exports = router;